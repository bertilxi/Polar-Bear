<template>
  <Page fullscreen>
    <div class="buttons has-text-right">
      <b-button type="is-primary" icon-left="plus" @click="add">
        Nuevo
      </b-button>
      <b-button icon-left="content-save-all" @click="saveAll">
        Guardar Todo
      </b-button>
    </div>

    <b-table
      :data="data"
      custom-row-key="id"
      striped
      narrowed
      hoverable
      mobile-cards
    >
      <template slot-scope="props">
        <b-table-column field="name" label="Nombre">
          <Editable v-model="props.row.name" />
        </b-table-column>
        <b-table-column field="email" label="Email">
          <Editable v-model="props.row.email" />
        </b-table-column>
        <b-table-column field="address" label="Dirección">
          <Editable v-model="props.row.address" />
        </b-table-column>
        <b-table-column field="tel" label="Teléfono">
          <Editable v-model="props.row.tel" />
        </b-table-column>

        <b-table-column field="facebook" label="Facebook">
          <Editable v-model="props.row.facebook" />
        </b-table-column>
        <b-table-column field="instagram" label="Instagram">
          <Editable v-model="props.row.instagram" />
        </b-table-column>
        <b-table-column field="twiter" label="Twiter">
          <Editable v-model="props.row.twiter" />
        </b-table-column>

        <b-table-column label="Acciones" width="250">
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
    db.collection("clients").onSnapshot(snapshot => {
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
      const ref = db.collection("clients");
      if (id) {
        return ref.doc(id).update(doc);
      } else {
        return ref.add(doc).catch(() => {
          Notification.error("Error creando cliente.");
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
      db.collection("clients")
        .doc(id)
        .delete();
    }
  }
});
</script>