<template lang="pug">
  div#quiz
    h2
      button(@click='signup') Sign Up
      br
      br
      button(@click='login("test2@test.com", "test")') Log In
      br
      br
      button(@click='addPost("And anotha one", "dun matter")') AddPost
      br
      br
      button(@click='logout') Logout
    template(v-if='loading > 0')
      div Loading...
    h1(v-for='post in feed')
      button(@click='deletePost(post.id)') {{ post.title }}
    br
    br
    h1(v-for='post in drafts')
      button(@click='deletePost(post.id)') {{ post.title }}
</template>

<script>
  import gql from 'graphql-tag'
  import { ME, DRAFTS, FEED } from './mutations/Queries'
  import { SIGNUP, LOGIN, NEW_POST, PUBLISH_POST, DELETE_POST } from './mutations/Mutations'

  export default {
    name: 'quiz',

    data: () => ({
      drafts: {},
      feed: {},
      loading: 0
    }),

    apollo: {
      feed: {
        query: FEED,
        loadingKey: 'loading',
        error(error) {
          console.error('We\'ve got an error!', error)
          this.error = error
        }
      },
      drafts: {
        query: DRAFTS,
        loadingKey: 'loading',
        error(error) {
          console.error('We\'ve got an error!', error)
          this.error = error
        }
      },
    },

    methods: {
      signup() {
        const email = this.email;
        const password = this.password;
        const name = this.name;

        this.email = '';
        this.password = '';
        this.name = '';

        this.$apollo.mutate({
          mutation: SIGNUP,
          variables: {
            email,
            password,
            name
          }
        })
      },

      login(email, password) {
        this.$apollo.mutate({
          mutation: LOGIN,
          variables: {
            email,
            password,
          }
        }).then(res => {
          localStorage.setItem('USER_TOKEN', res.data.login.token)
          return this.getCurrentUser()
        }).then(res => {
          this.user = res.data
        }).catch(err => {
          console.log(err)
        })
      },

      logout() {
        localStorage.removeItem('USER_TOKEN')
      },

      getCurrentUser () {
        console.log('login ran')
        return this.$apollo.query({
          query: ME
        })
      },

      addPost(title, text) {
        this.$apollo.mutate({
          mutation: NEW_POST,
          variables: {
            title,
            text,
          }
        }).then(res => {
          this.publishPost(res.data.createDraft.id);
          console.log(res);
        });
      },

      publishPost(id) {
        this.$apollo.mutate({
          mutation: PUBLISH_POST,
          variables: {
            id
          }
        }).then(res => {
          this.$apollo.queries.feed.refetch()
        })
      },

      deletePost(id) {
        this.$apollo.mutate({
          mutation: DELETE_POST,
          variables: {
            id
          }
        }).then(res => {
            this.$apollo.queries.feed.refetch()
            this.$apollo.queries.drafts.refetch()
        })
      },
    },
  }
</script>
