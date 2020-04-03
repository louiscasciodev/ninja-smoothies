/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */

const state = {
  signUpForm: false,
  loginForm: false,
  feedback: null,
  infos: {
    pseudo: null,
    slug: null,
    email: null,
    password: null,
  },
};

const getters = {};

const actions = {
  clear({ commit }) { commit('CLEAR'); },
  setValue({ commit }, object) { commit('SET_VALUE', object); },
  setInfos({ commit }, object) { commit('SET_INFOS', object); },
};

const mutations = {
  CLEAR(state) {
    Object.assign(state, {
      feedback: null,
      infos: {
        pseudo: null,
        slug: null,
        email: null,
        password: null,
      },
    });
  },
  SET_VALUE(state, object) {
    const [key] = Object.keys(object);
    state[key] = object[key];
  },
  SET_INFOS(state, object) {
    Object.assign(state.infos, { ...object });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
