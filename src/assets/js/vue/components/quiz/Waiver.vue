<template lang='pug'>
  section#booking-quiz.booking-page
    h3 Third Party Payment Waiver
    div.form-group
      div(v-for="(options, index) in party")
        label
          input(type="checkbox" :value="options.name" :key="index" v-model="selectedParties")
          span {{ options.name }}

      div
        label
          input(type="checkbox" value="other" v-model="otherParty.selected")
          span Other:
          TextInput(v-model="otherParty.text" placeholder="Please Specify")

      div
        label
          input(type="checkbox" value="agree" v-model="agree")
          span I agree to the terms stated above
</template>

<script>
  export default {
    name: 'BodyParts',
    data: () => ({
      party: [
        { name: 'Auto-Insurer' },
        { name: 'Corporation' },
        { name: 'Employer' },
        { name: 'Law Firm' }
      ],
      selectedParties: [],
      otherParty: {
        selected: false,
        text: ''
      },
      agree: false,
      firstName: '',
      lastName: '',
      date: ''
    }),
    computed: {
      waiver() {
        return this.$store.getters.waiver
      },
      booking() {
        return this.$store.getters.bookingFor
      }
    },
    beforeDestroy() {
      this.$store.dispatch('updateWaiver', {
        party: this.selectedParties,
        otherParty: this.otherParty.text,
        agree: this.agree,
        first_name: this.firstName,
        last_name: this.lastName,
        date: this.date
      })
    }
  }
</script>
