<template>
  <Page fullscreen>
    <div class="toolbar">
      <div class="toolbar-title">
        Productos
      </div>
      <div class="toolbar-buttons">
        <div class="file button-file">
          <label class="file-label">
            <input class="file-input" type="file" @change="uploadCSV" />
            <span class="button is-small">
              <span class="file-icon">
                <i class="mdi mdi-upload" />
              </span>
              <span class="file-label">
                CSV
              </span>
            </span>
          </label>
        </div>
        <b-button
          type="is-primary"
          size="is-small"
          icon-left="plus"
          @click="add"
        >
          Nuevo
        </b-button>
        <b-button icon-left="content-save-all" size="is-small" @click="saveAll">
          Guardar
        </b-button>
      </div>
    </div>
    <hr />

    <b-table
      class="editable-table"
      :data="data"
      custom-row-key="id"
      striped
      narrowed
      hoverable
      mobile-cards
      paginated
      pagination-simple
    >
      <template slot-scope="props">
        <b-table-column field="name" label="Nombre" width="300" sortable>
          <Editable v-model="props.row.name" />
        </b-table-column>
        <b-table-column field="size" label="Talle" width="100" sortable>
          <Editable v-model="props.row.size" />
        </b-table-column>
        <b-table-column
          field="sold"
          label="Vendidos"
          width="120"
          numeric
          sortable
        >
          <Editable v-model="props.row.sold" />
        </b-table-column>
        <b-table-column
          field="manufactured"
          label="Fabricados"
          width="120"
          numeric
          sortable
        >
          <Editable v-model="props.row.manufactured" />
        </b-table-column>
        <b-table-column
          field="available"
          label="Disponibles"
          width="120"
          numeric
          sortable
        >
          <Editable v-model="props.row.available" />
        </b-table-column>
        <b-table-column field="description" label="Descripción">
          <Editable v-model="props.row.description" />
        </b-table-column>
        <b-table-column label="Acciones" width="210">
          <b-button
            type="is-primary"
            icon-left="content-save"
            size="is-small"
            @click="save(props.row)"
            >Guardar</b-button
          >
          <b-button
            type="is-danger"
            icon-left="delete"
            size="is-small"
            @click="remove(props.row.id)"
            >Borrar</b-button
          >
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>Nada por aquí.</p>
          </div>
        </section>
      </template>
    </b-table>
  </Page>
</template>

<script lang="ts">
import Vue from "vue";
import Page from "@/components/Page.vue";
import Editable from "@/components/Editable.vue";
import { db, toArray } from "@/plugins/firebase";
import { Notification } from "@/plugins/notification";
import papa from "@/plugins/papaparse";

export default Vue.extend({
  middleware: "admin",
  components: { Page, Editable },
  data() {
    const data: any[] = [];

    return {
      data
    };
  },
  mounted() {
    db.collection("products").onSnapshot(snapshot => {
      this.data = [];
      this.$nextTick(() => {
        this.data = toArray(snapshot);
      });
    });
  },
  methods: {
    add() {
      this.data.unshift({});
    },
    save(data) {
      const { id, ...doc } = data;
      const ref = db.collection("products");
      if (id) {
        return ref.doc(id).update(doc);
      } else {
        return ref.add(doc).catch(() => {
          Notification.error("Error creando producto.");
        });
      }
    },
    saveAll() {
      Promise.all(this.data.map(item => this.save(item)));
    },
    remove(id: string) {
      if (!id) {
        this.data = this.data.filter(item => Object.keys(item).length);
        return;
      }
      db.collection("products")
        .doc(id)
        .delete();
    },
    uploadCSV(event) {
      const file = [...event.target.files][0];
      if (!file) {
        return;
      }
      const products: any[] = [];

      return new Promise(resolve => {
        papa.parse(file, {
          worker: true,
          header: true,
          dynamicTyping: true,
          step: (row: any) => {
            if (!row.data.NOMBRE) {
              return;
            }

            const product = {
              name: row.data.NOMBRE || "",
              description: row.data.DESCRIPCION || "",
              size: row.data.TALLE || "",
              available: row.data.DISPONIBLE || "",
              manufactured: row.data.FABRICADOS || "",
              sold: row.data.VENDIDOS || ""
            };
            products.push(product);
          },
          complete: () => {
            resolve(products);

            const batch = db.batch();
            products.forEach(product => {
              const ref = db.collection("products").doc();
              batch.set(ref, product);
            });
            batch.commit();
          }
        });
      });
    }
  }
});
</script>
