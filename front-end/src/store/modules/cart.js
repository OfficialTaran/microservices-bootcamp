import { makeAPICall } from "@utils/api.js"

const state = {
  cart: [],
  placing_order: false
}

const actions = {
  async placeOrder({ commit, state }) {
    const order = {
      goods_ordered: state.cart.map(item => {
        return {
          quantity: item.quantity,
          product_id: item.id
        }
      })
    }

    console.log(order)

    commit('updatePlacingOrder', { placing_order: true })
    await makeAPICall({
      route: '/api/orders',
      verb: 'POST',
      data: order
    })
    commit('updatePlacingOrder', { placing_order: false })
    commit('emptyCart')
    commit('products/setProductList',{ products: [] }, { root: true })

  }
}

const mutations = {
  addToCart ( state, { id, quantity }) {
    const id_index = state.cart.findIndex( item => item.id === id)
    if (id_index === -1) {
      state.cart.push({ id, quantity: Number(quantity) })
    } else {
      state.cart[id_index].quantity += Number(quantity)
    }
  },
  removeFromCart ( state, { id }) {
    state.cart = state.cart.filter(item => item.id !== id)
  },
  updateQuantity ( state, { id, quantity }) {
    const id_index = state.cart.findIndex( item => item.id === id)
    state.cart[id_index].quantity = quantity
  },
  updatePlacingOrder ( state, { placing_order }) {
    state.placing_order = placing_order
  },
  emptyCart ( state ) {
    state.cart = []
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}