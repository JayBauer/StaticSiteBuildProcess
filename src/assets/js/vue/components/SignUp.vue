<template lang='pug'>
  section#signup.login-page
    h1 Create Account
    h4 Create an account here to save your quote and continue along the booking process.
    form(@submit.prevent='signup')
      div.form-row
        TextInput(v-model="first_name" placeholder="First Name")
        TextInput(v-model="last_name" placeholder="Last Name")
      div.form-row
        TextInput(v-model="phone" placeholder="Phone Number")
        TextInput(v-model="email" placeholder="Email Address")
      div.form-row.form-row--single
        TextInput(v-model="address1" placeholder="Address")
      div.form-row.form-row--single
        TextInput(v-model="address2" placeholder="Address Line 2")
      div.form-row
        TextInput(v-model="city" placeholder="City")
        TextInput(v-model="province" placeholder="Province")
      div.form-row
        TextInput(v-model="postal" placeholder="Postal Code")
      div.form-row
        TextInput(v-model="password" placeholder="Password")
        TextInput(v-model="passwordConfirm" placeholder="Confirm Password")
      div.form-row
        Button(id="signup-btn" text="Create Account")
    h4 Already have an account? #[router-link(:to="{ name: 'LogIn' }") Log in here.]
</template>

<script>
  import { USER_ID, AUTH_TOKEN } from '@r/constants'
  import { LOGIN, SIGNUP } from '@r/mutations'

  export default {
    name: 'SignUp',

    data () {
      return {
        email: '',
        password: '',
        passwordConfirm: '',
        first_name: '',
        last_name: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        province: '',
        postal: ''
      }
    },

    methods: {
      validate() {

      },

      login() {
        const { email, password } = this.$data
        this.$apollo.mutate({
          mutation: LOGIN,
          variables: {
            email,
            password
          }
        }).then(res => {
          const token = res.data.login.token
          const id = res.data.login.user.id
          this.saveUserLogin(id, token)
        }).catch(err => {
          console.log(err)
        })
      },

      signup() {
        const { email, password, first_name, last_name, phone, address1, address2, city, province, postal } = this.$data
        this.$apollo.mutate({
          mutation: SIGNUP,
          variables: {
            email,
            password,
            first_name,
            last_name,
            phone,
            address1,
            address2,
            city,
            province,
            postal
          }
        }).then(res => {
          const token = res.data.signup.token
          const id = res.data.signup.user.id
          this.saveUserLogin(id, token)
          this.$router.push({ name: 'Login' })
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
