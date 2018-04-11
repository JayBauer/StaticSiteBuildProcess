<template lang="pug">
  div#quiz
    h1
      router-link(to="/login") Go to Login
    h2
      button(@click='signup') Sign Up
      br
      button(v-if='me.id' @click='logout') Logout
      br
      form(@submit.prevent='addPost')
        input(v-model='title' placeholder='Title')
        input(v-model='text' placeholder='Text')
        br
        button(type='submit') AddPost
    template(v-if='loading > 0')
      div Loading...
    h1(v-for='post in feed')
      button(@click='deletePost(post.id)') {{ post.title }}
    br
    h1(v-for='post in drafts')
      button(@click='deletePost(post.id)') {{ post.title }}
</template>

<script>
  import gql from 'graphql-tag'
  import { ME, DRAFTS, FEED } from '@r/queries'
  import { SIGNUP, LOGIN, NEW_POST, PUBLISH_POST, DELETE_POST } from '@r/mutations'

  export default {
    name: 'Main',
    data: () => ({
      me: {},
      feed: {},
      drafts: {},
      title: '',
      text: '',
      loading: 0
    }),

    apollo: {
      me: {
        query: ME,
        loadingKey: 'loading',
        error(error) {
          console.error('We\'ve got an error!', error)
          this.error = error
        }
      },
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
        const email = this.email
        const password = this.password
        const name = this.name

        this.email = ''
        this.password = ''
        this.name = ''

        this.$apollo.mutate({
          mutation: SIGNUP,
          variables: {
            email,
            password,
            name
          }
        })
      },

      logout() {
        localStorage.removeItem('USER_TOKEN')
        location.reload()
      },

      getCurrentUser() {
        this.$apollo.queries.me.refetch()
      },

      addPost() {
        const title = this.title
        const text = this.text

        this.title = ''
        this.text = ''

        this.$apollo.mutate({
          mutation: NEW_POST,
          variables: {
            title,
            text,
          }
        }).then(res => {
          this.publishPost(res.data.createDraft.id)
          console.log(res)
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
