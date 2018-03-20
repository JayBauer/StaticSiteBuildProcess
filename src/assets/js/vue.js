import Vue from 'vue';
import App from './vue/App.vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('USER_TOKEN') || null,
    }
  });
  return forward(operation);
});

// apollo client setup
const client = new ApolloClient({
  // link: httpLink,
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

// Install the vue plugin
Vue.use(VueApollo);

// Apollo provider init
const apolloProvider = new VueApollo({
  defaultClient: client
});

// Start the app
new Vue({
  el: '#quiz',
  provide: apolloProvider.provide(),
  render: h => h(App)
});
