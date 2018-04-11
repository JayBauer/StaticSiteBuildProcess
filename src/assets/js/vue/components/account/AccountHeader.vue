<template lang='pug'>
  section#account-head.account-page
    h1 Account
    nav.account-nav
      router-link(:to="{ name: 'OrderHistory' }"): h4 Order History
      router-link(:to="{ name: 'Profile' }"): h4 Profile
      a(@click="logout()"): h4 Sign-Out
</template>

<script>
  import { USER_ID, AUTH_TOKEN } from '@r/constants'
  import { USER_QUIZZES } from '@r/queries'

  export default {
    name: 'AccountHeader',

    computed: {
      userId() {
        return this.$root.$data.userId
      }
    },

    methods: {
      logout() {
        localStorage.removeItem(USER_ID)
        localStorage.removeItem(AUTH_TOKEN)
        this.$root.$data.userId = localStorage.getItem(USER_ID)
        this.$apolloProvider.defaultClient.resetStore()
        this.$router.push({ name: 'LogIn' })
      }
    }
  }
</script>
