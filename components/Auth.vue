<template>
  <div class="is-flex ">
    <template v-if="user">
      <b-dropdown position="is-bottom-left" aria-role="menu">
        <a slot="trigger" class="navbar-item" role="button">
          <span>{{ user.displayName }}</span>
          <b-icon icon="menu-down"></b-icon>
        </a>

        <b-dropdown-item v-if="hasRole('ADMIN')" has-link aria-role="menuitem">
          <nuxt-link to="/products" class="navbar-item">Productos</nuxt-link>
        </b-dropdown-item>
        <b-dropdown-item v-if="hasRole('ADMIN')" has-link aria-role="menuitem">
          <nuxt-link to="/sales" class="navbar-item">Ventas</nuxt-link>
        </b-dropdown-item>
        <b-dropdown-item v-if="hasRole('SELLER')" has-link aria-role="menuitem">
          <nuxt-link to="/sell" class="navbar-item">Vender</nuxt-link>
        </b-dropdown-item>

        <!-- <b-dropdown-item>
          Configuración
        </b-dropdown-item> -->
        <b-dropdown-item aria-role="menuitem" @click="signOut">
          Salir
        </b-dropdown-item>
      </b-dropdown>
    </template>
    <template v-else>
      <a class="navbar-item" @click="googleSignIn">Ingresar</a>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { firebase, auth, db } from "@/plugins/firebase";
import { Notification } from "@/plugins/notification";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  computed: { ...mapState(["user"]) },
  methods: {
    ...mapActions(["login", "logout"]),
    hasRole(roles: string[] = [], all = false) {
      const userRoles: string[] = this.user.roles || [];
      if (userRoles.includes("ADMIN")) {
        return true;
      }

      return userRoles.reduce(
        (auth, role) =>
          all ? auth && roles.includes(role) : auth || roles.includes(role),
        all
      );
    },
    googleSignIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth
        .signInWithPopup(provider)
        .then(result => {
          const isNew =
            result.additionalUserInfo && result.additionalUserInfo.isNewUser;

          if (isNew) {
            const user = result.user as firebase.User;

            db.collection("users")
              .add({
                uid: user.uid,
                roles: ["USER"]
              })
              .catch(() => {
                Notification.error("Error al crear Rol de usuario.");
              });
          }

          this.login(result.user);
          this.$router.push("/");
        })
        .catch(() => {
          Notification.error("Error iniciar sesión, verifique su información.");
        });
    },
    signOut() {
      auth
        .signOut()
        .then(() => {
          this.logout();
        })
        .finally(() => {
          this.$router.push("/");
        });
    }
  }
});
</script>
