// import { makeAPICall } from '@utils/api.js'
// import { cloneDeep } from 'lodash'

const state = {
  shipment_list: [],
  loading: false,
  shipment: {},
  shipment_loading: false,
  posting_new_shipment: false
}

const actions = {
  // async listShipments ({ commit, state }, reset_cache = false) {
  // },
  // async getShipment ({ commit, state }, { id }) {
  // },
  // async postNewShipment ({ commit, state, dispatch }) {
  // }
}

const mutations = {
  setLoading ( state, { loading }) {
    state.loading = loading
  },
  setPostingNewShipment ( state, { posting }) {
    state.posting_new_shipment = posting
  },
  setShipmentList ( state, { shipments }) {
    state.shipment_list = shipments
  },
  setShipment ( state, { shipment }) {
    state.shipment = shipment
  },
  setShipmentLoading ( state, { loading }) {
    state.shipment_loading = loading
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}