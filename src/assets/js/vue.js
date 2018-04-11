import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloLink, concat } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import router from '@r/routes'
import store from '@r/store'

import App from '@r/App.vue'
import TextInput from '@c/shared/TextInput'
import Button from '@c/shared/Button'
import RadioButton from '@c/shared/Radio'

import { USER_ID, AUTH_TOKEN } from '@r/constants'

///////////////////////
// Apollo and Router //
///////////////////////
Vue.use(VueRouter)
Vue.use(VueApollo)

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: client
})

////////////////////////////////
// Register Global Components //
////////////////////////////////
Vue.component('TextInput', TextInput)
Vue.component('Button', Button)
Vue.component('RadioButton', RadioButton)

///////////////////
// Start the app //
///////////////////
let userId = localStorage.getItem(USER_ID)

new Vue({
  el: '#quiz',
  provide: apolloProvider.provide(),
  router,
  store,
  data: {
    userId
  },
  render: h => h(App)
})
