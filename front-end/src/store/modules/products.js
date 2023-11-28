import { makeAPICall } from "@utils/api.js"

const state = {
  product_list: [],
  loading: false
}

// actions can be async but can't update state
const actions = {
  async listProducts ({ commit }) {

    commit('setLoading', { loading: true })

    const products = await makeAPICall({ route: '/api/products' })
      .then(res => res.data)
      .catch(err => console.error(err))

    commit('setProductList', { products })
    commit('setLoading', { loading: false })
  }
}

// mutations must be sync but can update state
const mutations = {
  setLoading (state, { loading }) {
    state.loading = loading
  },
  setProductList ( state, { products }) {
    state.product_list = products
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}