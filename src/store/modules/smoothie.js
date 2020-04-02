/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */

const state = {
  feedback: null,
  smoothie: {
    title: null,
    ing: null,
    slug: null,
    ingredients: [],
  },
};

const getters = {};

const actions = {
  clear({ commit }) { commit('CLEAR'); },
  setValue({ commit }, object) { commit('SET_VALUE', object); },
  setSmoothie({ commit }, object) { commit('SET_SMOOTHIE', object); },
  addIngredient({ commit }, value) { commit('ADD_INGREDIENT', value); },
  deleteIngredient({ commit }, value) { commit('DELETE_INGREDIENT', value); },
};

const mutations = {
  CLEAR(state) {
    Object.assign(state, {
      feedback: null,
      smoothie: {
        title: null,
        ing: null,
        slug: null,
        ingredients: [],
      },
    });
  },
  SET_VALUE(state, object) {
    const [key] = Object.keys(object);
    state[key] = object[key];
  },
  SET_SMOOTHIE(state, object) {
    Object.assign(state.smoothie, { ...object });
  },
  ADD_INGREDIENT(state, value) {
    state.smoothie.ingredients.push(value);
  },
  DELETE_INGREDIENT(state, value) {
    state.smoothie.ingredients.splice(value, 1);
    console.log(value);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
