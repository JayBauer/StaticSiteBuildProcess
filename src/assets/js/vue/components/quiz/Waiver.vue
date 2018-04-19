<template lang='pug'>
  div#third-party-waiver
    h3 Third Party Payment Waiver
    h4 In Ontario, the Ontario Health Insurance Act allows third parties, such as private Auto and Health Insurers, Law Firms, WSIB, and Individual Employers and Corporations to purchase an MRI scan for clients.
    h4 I agree that a third party listed below is paying in full for the MRI scan service in question and that I am not paying for this MRI scan service personally.

    div.third-party-waiver__form.form-group
      div.form-element.form-element--checkbox(v-for="(options, index) in party")
        input(type="checkbox" :id="options.id" :value="options.name" :key="options.id" v-model="selectedParties")
        label(:for="options.id"): h4 {{ options.name }}

      div.form-element.form-element--checkbox
        input(type="checkbox" id="other" value="other" v-model="otherParty.selected")
        label(for="other")
          h4 Other:
          TextInput.form-element.form-element--input(v-model="otherParty.text" placeholder="Please Specify" :disabled="!otherParty.selected")

    div.third-party-waiver__form.form-group
      div.form-element.form-element--checkbox
        input(type="checkbox" id="agree" value="agree" v-model="agree")
        label(for="agree") I agree to the terms stated above

    div.third-party-waiver__form.form-group
      TextInput.form-element.form-element--input(v-model="firstName" placeholder="First Name")
      TextInput.form-element.form-element--input(v-model="lastName" placeholder="Last Name")
      TextInput.form-element.form-element--input(v-model="date" placeholder="Date")
</template>

<script>
  export default {
    name: 'BodyParts',
    data: () => ({
      party: [
        { name: 'Auto-Insurer', id: 'auto-insurer' },
        { name: 'Corporation', id: 'corporation' },
        { name: 'Employer', id: 'employer' },
        { name: 'Law Firm', id: 'law-firm' }
      ],
      selectedParties: [],
      otherParty: { selected: false, text: '' },
      agree: false,
      firstName: '',
      lastName: '',
      date: ''
    }),
    mounted() {
      const { party, otherParty, agree, firstName, lastName, date } = this.$store.getters.waiver
      this.selectedParties = party
      this.otherParty = otherParty
      this.agree = agree
      this.firstName = firstName
      this.lastName = lastName
      this.date = date
    },
    beforeDestroy() {
      this.$store.dispatch('updateWaiver', {
        party: this.selectedParties,
        otherParty: this.otherParty,
        agree: this.agree,
        firstName: this.firstName,
        lastName: this.lastName,
        date: this.date
      })
    }
  }
</script>
