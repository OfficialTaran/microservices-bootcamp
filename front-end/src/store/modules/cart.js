const state = {
  cart: [],
  placing_order: false
}

const actions = {}

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