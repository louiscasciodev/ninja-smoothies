/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */

const state = {
  feedback: null,
  comment: {
    content: null,
    from: null,
    time: null,
    to: null,
  },
};

const getters = {};

const actions = {
  clear({ commit }) { commit('CLEAR'); },
  setComment({ commit }, object) { commit('SET_COMMENT', object); },
  setValue({ commit }, object) { commit('SET_VALUE', object); },
};

const mutations = {
  CLEAR(state) {
    Object.assign(state, {
      feedback: null,
      comment: {
        content: null,
        from: null,
        time: null,
        to: null,
      },
    });
  },
  SET_COMMENT(state, object) {
    Object.assign(state.comment, { ...object });
  },
  SET_VALUE(state, object) {
    const [key] = Object.keys(object);
    state[key] = object[key];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
