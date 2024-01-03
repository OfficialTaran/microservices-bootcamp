import { makeAPICall } from '@utils/api.js'
// import { cloneDeep } from 'lodash'

const state = {
  product_list: [],
  loading: false,
  product: {},
  product_original: {},
  product_loading: false,
  updating_product: false
}

const actions = {
  async listProducts ({ commit, state }, reset_cache = true) {
    //ignore if cashed
    if (JSON.stringify(state.product_list) !== '[]'
      && !reset_cache) return

    commit('setLoading', { loading: true })

    const products = await makeAPICall({ route: '/api/inventory/products' })
      .then(res => res.data)
      .catch(err => console.error(err))

    commit('setProductList', { products })
    commit('setLoading', { loading: false })
  },
  async getProduct ({ commit, state }, { id }) {
    //ignore if cashed
    if ((JSON.stringify(state.product) !== '{}')
      && (state.product.id === id)) return

    commit('setProductLoading', { loading: true })
    const product = await makeAPICall({ route: `/api/inventory/products/${id}` })
      .then(res => res.data)
      .catch(err => console.error(err))

    commit('setProduct', { product })
    commit('setProductLoading', { loading: false })
  },
  // async updateProduct ({ commit, state, dispatch }) {
  // },
  // startNewProduct ({ commit }) {
  // },
  // async postNewProduct ({ commit, state, dispatch }) {
  // }
}

const mutations = {
  setLoading ( state, { loading }) {
    state.loading = loading
  },
  setProductList ( state, { products }) {
    state.product_list = products
  },
  setProduct ( state, { product }) {
    state.product = product
  },
  setProductLoading ( state, { loading }) {
    state.product_loading = loading
  },
  // updateProductDimension ( state, { dimension, value }) {
  // },
  // updateProductProperty ( state, { property, value }) {
  // },
  setUpdatingProduct ( state, { updating }) {
    state.updating_product = updating
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
