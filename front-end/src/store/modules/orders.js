// import { makeAPICall } from '@utils/api.js'

const state = {
  order_list: [],
  loading_orders: false,
  order: {},
  order_loading: false
}

const actions = {
  // async listOrders ({ commit, state }, reset_cache = false) {
  // },
  // async getOrder ({ commit, state }, { id }) {
  // },
  // async cancelOrder({ commit, dispatch }, { id }) {
  // }
}

const mutations = {
  setOrderList ( state, { orders }) {
    state.order_list = orders
  },
  setLoading ( state, { loading }) {
    state.loading_orders = loading
  },
  setOrder ( state, { order }) {
    state.order = order
  },
  setOrderLoading ( state, { loading }) {
    state.order_loading = loading
  },
  setCancellingOrder ( state, { cancelling }) {
    state.cancelling = cancelling
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}