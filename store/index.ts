import { ActionTree } from "vuex";

interface State {
  user?: firebase.User;
}

export const state = (): State => ({
  user: undefined
});

export const mutations = {
  setState(state, payload) {
    Object.assign(state, {
      ...state,
      ...payload
    });
  }
};

export const actions: ActionTree<State, State> = {
  login(ctx, user) {
    ctx.commit("setState", { user });
  },
  logout(ctx) {
    ctx.commit("setState", { user: undefined });
  }
};

export const strict = false;
