<template lang='pug'>
  section#booking-quiz.booking-page
    h3 Who are you booking for?
    div.form-group
      label
        input(type="radio" v-model="bookingFor" value="patient")
        span A Patient
      label
        input(type="radio" v-model="bookingFor" value="myself")
        span Myself or a Family Member
      label
        input(type="radio" v-model="bookingFor" value="client")
        span A Client
</template>

<script>
  export default {
    name: 'BookingFor',
    computed: {
      bookingFor: {
        get() {
          return this.$store.getters.bookingFor
        },
        set(value) {
          this.$store.dispatch('updateBooking', value)
        }
      }
    },
    beforeDestroy() {
      this.$store.dispatch('updateBooking', this.bookingFor)
    }
  }
</script>
