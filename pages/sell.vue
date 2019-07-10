<template>
  <Page>
    <div class="has-text-right">
      <b-button type="is-primary" icon-left="plus" @click="add">
        Nuevo
      </b-button>
      <b-button icon-left="content-save-all" @click="save">
        Guardar
      </b-button>
    </div>

    <hr />

    <b-field>
      <b-taginput
        v-model="client"
        :data="filteredClients"
        maxtags="1"
        ellipsis
        autocomplete
        allow-new
        icon="label"
        placeholder="Elegi un cliente"
        field="name"
        @typing="getFilteredTags"
      />
    </b-field>

    <b-table
      :data="sales"
      custom-row-key="id"
      striped
      narrowed
      hoverable
      mobile-cards
    >
      <template slot-scope="props">
        <b-table-column label="Articulo">
          <b-select expanded @input="selectProduct($event, props.index)">
            <option
              v-for="option in data"
              :key="`${props.index}-${option.id}`"
              :value="option.id"
            >
              {{ displayName(option) }}
            </option>
          </b-select>
        </b-table-column>

        <b-table-column label="Cantidad" width="150">
          <Editable
            :value="props.row.sold"
            @input="setQuantity($event, props.index)"
          />
        </b-table-column>

        <b-table-column label="Acciones" width="125">
          <b-button
            type="is-danger"
            icon-left="delete"
            size="is-small"
            @click="remove(props.index)"
            >Borrar</b-button
          >
        </b-table-column>
      </template>
    </b-table>
  </Page>
</template>

<script lang="ts">
import Vue from "vue";
import Page from "@/components/Page.vue";
import Editable from "@/components/Editable.vue";
import { db, toArray } from "@/plugins/firebase";

export default Vue.extend({
  middleware: "seller",
  components: { Page, Editable },
  data() {
    return {
      data: [] as any[],
      clients: [] as any[],
      client: [] as any[],
      filteredClients: [] as any[],
      sales: [{}] as any[]
    };
  },
  mounted() {
    db.collection("products").onSnapshot(snapshot => {
      this.data = toArray(snapshot);
    });
    db.collection("clients").onSnapshot(snapshot => {
      this.clients = toArray(snapshot);
    });
  },
  methods: {
    displayName({ name = "", color = "", size = "" }) {
      return `${name} - ${color} - ${size}`;
    },
    add() {
      this.sales.push({});
    },
    remove(index: number) {
      if (!this.sales || !this.sales.length) {
        return;
      }

      this.sales.splice(index, 1);
    },
    selectProduct(productId: number, index: number) {
      this.sales[index].productId = productId;
    },
    setQuantity(value: string, index: number) {
      this.sales[index].sold = Number(value);
    },
    confirmSave() {
      const sales = this.sales.filter(sale => sale.productId && sale.sold > 0);
      const refs = sales.map(sale =>
        db.collection("products").doc(sale.productId)
      );
      const transactions: Promise<any>[] = refs.map((ref, index) => {
        return db.runTransaction(transaction =>
          transaction.get(ref).then(doc => {
            const data = doc.data() || {};
            const sold = Number(data.sold || 0) + sales[index].sold;
            const available = Number(data.available || 0) - sales[index].sold;
            transaction.update(ref, { sold, available });
          })
        );
      });

      const selectedClient = this.client[0];
      const client =
        typeof selectedClient === "string"
          ? { name: selectedClient }
          : selectedClient || "";

      const newSales = sales.map(sale =>
        db.collection("sales").add({
          ...sale,
          client,
          sellerId: this.$store.state.user.id || "",
          sellerName: this.$store.state.user.displayName || ""
        })
      );
      Promise.all([...transactions, ...newSales])
        .then(() => {
          this.$toast.open("Venta guardada");
          this.sales = [];
          this.client = [];
        })
        .catch(() => this.$toast.open("Error guardando la venta"));
    },
    save() {
      this.$dialog.confirm({
        message: "Guardar venta?",
        onConfirm: this.confirmSave
      });
    },
    getFilteredTags(text) {
      this.filteredClients = this.clients.filter(
        client =>
          client.name
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
      );
    }
  }
});
</script>
