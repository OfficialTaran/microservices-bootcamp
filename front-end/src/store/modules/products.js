import { makeAPICall } from "@utils/api.js"

const state = {
  product_list: [],
  loading: false,
  product: {},
  product_loading: false
}

// actions can be async but can't update state
const actions = {
  async listProducts ({ commit, state }) {
    if (JSON.stringify(state.product_list) !== '[]') return

    commit('setLoading', { loading: true })

    const products = await makeAPICall({ route: '/api/products' })
      .then(res => res.data)
      .catch(err => console.error(err))

    commit('setProductList', { products })
    commit('setLoading', { loading: false })
  },
  async getProduct ({ commit, state }, { id }) {
    if ((JSON.stringify(state.product) !== '{}') &&
      (state.product.id === id)) return


    commit('setProductLoading', {loading: true})

    const product = await makeAPICall({ route: `/api/products/${id}` })
      .then(res => res.data)
      .catch(err => console.error(err))

    commit('setProduct', { product })
    commit('setProductLoading', {loading: false})
  }
}

// mutations must be sync but can update state
const mutations = {
  setLoading (state, { loading }) {
    state.loading = loading
  },
  setProductList ( state, { products }) {
    state.product_list = products
  },
  setProduct ( state, { product}) {
    state.product = product
  },
  setProductLoading ( state, { loading }) {
    state.product_loading = loading
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}