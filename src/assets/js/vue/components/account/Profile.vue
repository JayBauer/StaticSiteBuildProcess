<template lang="pug">
  section#profile.account-page
    h4 This is your profile, you can change your information here if it is inaccurate.
    template(v-if="loading > 0")
      h4 Loading...
    template(v-else)
      form.account-form.profile-form
        div.form-row
          TextInput(v-model="firstName" type="text" placeholder="First Name")
          TextInput(v-model="lastName" type="text" placeholder="Last Name")
        div.form-row
          TextInput(v-model="phone" type="text" placeholder="Phone Number")
          TextInput(v-model="email" type="text" placeholder="Email Address")
        div.form-row.form-row--single
          TextInput(v-model="address1" type="text" placeholder="Address")
        div.form-row.form-row--single
          TextInput(v-model="address2" type="text" placeholder="Address Line 2")
        div.form-row
          TextInput(v-model="city" type="text" placeholder="City")
          TextInput(v-model="province" type="text" placeholder="Province")
        div.form-row
          TextInput(v-model="postal" type="text" placeholder="Postal Code")
        div.form-row
          Button(id="save-profile-btn" text="Save" @click="saveUser")

      h4 Change Password
      form.account-form.password-form
        div.form-row
          TextInput(v-model="oldPassword" type="password" placeholder="Old Password")
          TextInput(v-model="newPassword" type="password" placeholder="New Password")
          TextInput(v-model="confirmPassword" type="password" placeholder="Confirm Password")
        div.form-row
          Button(id="update-pass-btn" text="update" @click="updatePassword")
</template>

<script>
  import bcrypt from 'bcryptjs'
  import { ME } from '@r/queries'
  import { UPDATE_USER, UPDATE_PASSWORD } from '@r/mutations'

  export default {
    name: 'Profile',
    data: () => ({
      me: {},
      loading: 0,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      province: '',
      postal: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }),

    apollo: {
      me: {
        query: ME,
        loadingKey: 'loading',
        result(data) {
          return this.setUserData()
        }
      }
    },

    methods: {
      setUserData() {
        this.firstName = this.me.firstName
        this.lastName = this.me.lastName
        this.phone = this.me.phone
        this.email = this.me.email
        this.address1 = this.me.address1
        this.address2 = this.me.address2
        this.city = this.me.city
        this.province = this.me.province
        this.postal = this.me.postal
      },
      
      saveUser() {
        const { firstName, lastName, phone, email, address1, address2, city, province, postal } = this.$data

        this.$apollo.mutate({
          mutation: UPDATE_USER,
          variables: {
            id: this.me.id,
            firstName,
            lastName,
            phone,
            email,
            address1,
            address2,
            city,
            province,
            postal
          }
        }).then(res => {
          this.$apollo.queries.me.refetch()
        }).catch(err => {
          console.log(err)
        })
      },

      async updatePassword() {
        const { oldPassword, newPassword, confirmPassword } = this.$data
        const oldPassCheck = await bcrypt.compareSync(oldPassword, this.me.password)

        if(oldPassCheck && newPassword == confirmPassword) {
          this.$apollo.mutate({
            mutation: UPDATE_PASSWORD,
            variables: {
              id: this.me.id,
              password: newPassword
            }
          }).then(res => {
            this.$apollo.queries.me.refetch()
          }).catch(err => {
            console.log(err)
          })
        }
      }
    }
  }
</script>
