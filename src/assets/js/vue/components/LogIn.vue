<template lang="pug">
  section#login.login-page
    h1 Log In
    h4 Log in to your account and continue along the booking process.
    form.login-form(@submit.prevent="login")
      div.form-row.form-row--single
        TextInput(v-model="email" placeholder="Email Address")
      div.form-row.form-row--single
        TextInput(v-model="password" type="password" placeholder="Password")
      div.form-row
        Button(id="login-btn" text="Log In")
    h4 Don't have an account? #[router-link(:to="{ name: 'SignUp' }") Create one here.]
</template>

<script>
  import gql from 'graphql-tag'
  import { LOGIN } from '@r/mutations'
  import { USER_ID, AUTH_TOKEN } from '@r/constants'

  export default {
    name: 'LogIn',
    data: () => ({
      email: '',
      password: '',
      loggedIn: false
    }),

    methods: {
      login() {
        const { email, password } = this.$data;

        this.email = '';
        this.password = '';

        this.$apollo.mutate({
          mutation: LOGIN,
          variables: {
            email,
            password,
          }
        }).then(res => {
          const token = res.data.login.token
          const id = res.data.login.user.id
          this.loggedIn = true
          this.saveUserLogin(id, token)
          this.$router.push({ name: 'OrderHistory' })
        }).catch(err => {
          console.log(err)
        })
      },

      saveUserLogin(id, token) {
        localStorage.setItem(USER_ID, id)
        localStorage.setItem(AUTH_TOKEN, token)
        this.$root.$data.userId = localStorage.getItem(USER_ID)
      }
    }
  }
</script>
