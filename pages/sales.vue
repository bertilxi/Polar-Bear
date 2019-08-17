<template>
  <Page fullscreen>
    <b-field label="Filtrar">
      <b-input v-model="searchTerm" />
    </b-field>

    <b-table
      :data="filteredData"
      custom-row-key="id"
      striped
      narrowed
      hoverable
      mobile-cards
    >
      <template slot-scope="props">
        <b-table-column field="sellerName" label="Vendedor">
          {{ props.row.sellerName }}
        </b-table-column>
        <b-table-column label="Articulo">
          {{ getProduct(props.row) }}
        </b-table-column>
        <b-table-column field="client.name" label="Cliente">
          {{ props.row.client.name }}
        </b-table-column>
        <b-table-column field="sold" label="Unidades" numeric>
          {{ props.row.sold }}
        </b-table-column>
        <b-table-column field="date" label="Fecha" width="150" numeric>
          {{ getDate(props.row) }}
        </b-table-column>
      </template>
    </b-table>
  </Page>
</template>

<script>
import Vue from "vue";
import Page from "@/components/Page.vue";
import { db, toArray } from "@/plugins/firebase";
import dayjs from "@/plugins/day";

export default Vue.extend({
  middleware: "seller",
  components: { Page },
  data() {
    return {
      data: [],
      products: {},
      searchTerm: ""
    };
  },
  mounted() {
    db.collection("products").onSnapshot(snapshot => {
      const productList = toArray(snapshot);
      this.products = productList.reduce(
        (map, product) => ({ ...map, [product.id]: product }),
        {}
      );
    });

    db.collection("sales").onSnapshot(snapshot => {
      this.data = toArray(snapshot).sort((saleA, saleB) => {
        return new Date(saleB.date).getTime() - new Date(saleA.date).getTime();
      });
    });
  },
  computed: {
    filteredData() {
      return this.data.filter(item => {
        const product = this.products[item.productId] || {};
        const description = `${item.sellerName} ${product.name} ${this.getDate(
          item
        )}`;

        return description
          .toLowerCase()
          .includes(this.searchTerm.trim().toLowerCase());
      });
    }
  },
  methods: {
    getProduct(sale) {
      if (!sale || !Object.keys(this.products).length) {
        return "";
      }

      const product = this.products[sale.productId] || {};
      return `${product.name || ""}${" - " + (product.size || "")}`;
    },
    getDate(sale) {
      return typeof sale.date === "string"
        ? dayjs(sale.date).format("hh:mm DD/MM/YYYY")
        : "";
    }
  }
});
</script>
