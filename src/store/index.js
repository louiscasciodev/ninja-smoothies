import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';
// import firebase from 'firebase';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    feedback: null,
    smoothie: {
      title: null,
      ing: null,
      slug: null,
      ingredients: [],
    },
  },
  actions: {
    clear({ commit }) { commit('CLEAR'); },
    setValue({ commit }, object) { commit('SET_VALUE', object); },
    setSmoothie({ commit }, object) { commit('SET_SMOOTHIE', object); },
    addIngredient({ commit }, value) { commit('ADD_INGREDIENT', value); },
    deleteIngredient({ commit }, index) { commit('DELETE_INGREDIENT', index); },
  },
  mutations: {
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
    DELETE_INGREDIENT(state, index) {
      state.smoothie.ingredients.splice(index, 1);
    },
  },
  modules: {
  },
});

// smoothies: [
//   {
//     title: 'Ninja Brew',
//     slug: 'ninja-brew',
//     ingredients: ['bananas', 'coffee', 'milk'],
//     id: 1,
//   },
//   {
//     title: 'Morning Moon',
//     slug: 'morning-moon',
//     ingredients: ['mango', 'lime', 'juice'],
//     id: 2,
//   }],
