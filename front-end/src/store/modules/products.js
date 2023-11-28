import { makeAPICall } from "@utils/api.js"

const state = {
  product_list: []
}

// actions can be async but can't update state
const actions = {
  async listProducts ({ commit }) {
    const products = await makeAPICall({ route: '/api/products' })
      .then(res => res.data)
      .catch(err => console.error(err))

    commit('setProductList', { products })
  }
}

// mutations must be sync but can update state
const mutations = {
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