const state = {
  bookingFor: '',
  ontarioRes: '',
  bodyParts: [],
  waiver: {},
  referral: '',
  payment: false
}

const getters = {
  state: state => {
    return state
  },
  bookingFor: state => {
    return state.bookingFor
  },
  ontarioRes: state => {
    return state.ontarioRes
  },
  bodyParts: state => {
    return state.bodyParts
  },
  waiver: state => {
    return state.waiver
  },
  referral: state => {
    return state.referral
  },
  payment: state => {
    return state.payment
  }
}

const mutations = {
  updateBooking(state, payload) {
    state.bookingFor = payload
  },
  updateResident(state, payload) {
    state.ontarioRes = payload
  },
  updateBodyParts(state, payload) {
    state.bodyParts = payload
  },
  updateWaiver(state, payload) {
    state.waiver = payload
  },
  updateReferral(state, payload) {
    state.referral = payload
  }
}

const actions = {
  updateBooking({ commit }, payload) {
    commit('updateBooking', payload)
  },
  updateResident({ commit }, payload) {
    commit('updateResident', payload)
  },
  updateBodyParts({ commit }, payload) {
    commit('updateBodyParts', payload)
  },
  updateWaiver({ commit }, payload) {
    commit('updateWaiver', payload)
  },
  updateReferral({ commit }, payload) {
    commit('updateReferral', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}
