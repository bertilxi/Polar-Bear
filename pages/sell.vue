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
      <b-autocomplete
        v-model="clientSearch"
        placeholder="Elegi un cliente"
        field="name"
        :data="filteredClients"
        open-on-focus
        @select="selectClient"
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
          <b-autocomplete
            v-model="productSearch"
            placeholder="Elegi un artículo"
            :data="filteredProducts"
            :custom-formatter="displayName"
            open-on-focus
            @select="selectProduct($event, props.index)"
          />
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

<script>
import Vue from "vue";
import Page from "@/components/Page.vue";
import Editable from "@/components/Editable.vue";
import { db, toArray } from "@/plugins/firebase";
import natsort from "natsort";

const sorter = natsort();
export default Vue.extend({
  middleware: "seller",
  components: { Page, Editable },
  data() {
    return {
      clientSearch: "",
      productSearch: "",
      client: undefined,
      products: [],
      clients: [],
      sales: [{}]
    };
  },

  computed: {
    filteredProducts() {
      return this.products
        .filter(
          option =>
            option.name
              .toString()
              .toLowerCase()
              .indexOf(this.productSearch.toLowerCase()) >= 0
        )
        .sort((a, b) => sorter(a.name, b.name));
    },
    filteredClients() {
      return this.clients
        .filter(
          option =>
            option.name
              .toString()
              .toLowerCase()
              .indexOf(this.clientSearch.toLowerCase()) >= 0
        )
        .sort((a, b) => sorter(a.name, b.name));
    }
  },

  mounted() {
    db.collection("products").onSnapshot(snapshot => {
      this.products = toArray(snapshot);
    });
    db.collection("clients").onSnapshot(snapshot => {
      this.clients = toArray(snapshot);
    });
  },
  methods: {
    displayName({ name = "", color = "", size = "" }) {
      return `${name} - ${size}`;
    },
    add() {
      this.sales.push({});
    },
    remove(index) {
      if (!this.sales || !this.sales.length) {
        return;
      }

      this.sales.splice(index, 1);
    },
    selectProduct(product, index) {
      this.productSearch = "";
      if (!product || !product.id) {
        this.sales[index].productId = undefined;
        return;
      }
      this.sales[index].productId = product.id;
    },
    selectClient(client) {
      this.clientSearch = "";
      if (!client) {
        this.client = undefined;
        return;
      }
      this.client = client;
    },
    setQuantity(value, index) {
      this.sales[index].sold = Number(value);
    },
    confirmSave() {
      const refs = this.sales.map(sale =>
        db.collection("products").doc(sale.productId)
      );
      const transactions = refs.map((ref, index) => {
        return db.runTransaction(transaction =>
          transaction.get(ref).then(doc => {
            const data = doc.data() || {};
            const sold = Number(data.sold || 0) + this.sales[index].sold;
            const available =
              Number(data.available || 0) - this.sales[index].sold;
            transaction.update(ref, { sold, available });
          })
        );
      });

      const selectedClient = this.client;
      const client =
        typeof selectedClient === "string"
          ? { name: selectedClient }
          : selectedClient || "";

      const newSales = this.sales.map(sale =>
        db.collection("sales").add({
          ...sale,
          client,
          date: new Date().toISOString(),
          sellerId: this.$store.state.user.id || "",
          sellerName: this.$store.state.user.displayName || ""
        })
      );
      Promise.all([...transactions, ...newSales])
        .then(() => {
          this.$toast.open("Venta guardada");
          this.sales = [];
          this.client = undefined;
        })
        .catch(() => this.$toast.open("Error guardando la venta"));
    },
    save() {
      console.log(
        JSON.parse(JSON.stringify({ sales: this.sales, client: this.client }))
      );
      this.sales = this.sales.filter(
        sale => sale.productId && Number(sale.sold) > 0
      );
      if (!this.sales.length) {
        return;
      }
      this.$dialog.confirm({
        message: "Guardar venta?",
        onConfirm: this.confirmSave
      });
    }
  }
});
</script>
