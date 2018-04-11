<template lang='pug'>
  section#booking-quiz.booking-page
    h3 Are you a resident on Ontario?
    div.form-group
      label
        input(type="radio" v-model="resident" value="yes")
        span Yes
      label
        input(type="radio" v-model="resident" value="no")
        span No
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Resident',
    computed: {
      resident: {
        get() {
          return this.$store.getters.ontarioRes
        },
        set(value) {
          this.$store.dispatch('updateResident', value)
        }
      }
    }
  }
</script>
