<template lang='pug'>
  div#booking-for.booking-page
    h3 Who are you booking for?
    div.booking-for__form.form-group
      div.form-element.form-element--radio
        input(id="booking_patient" type="radio" v-model="bookingFor" value="PATIENT")
        label(for="booking_patient") A Patient
      div.form-element.form-element--radio
        input(id="booking_myself" type="radio" v-model="bookingFor" value="MYSELF")
        label(for="booking_myself") Myself or a Family Member
      div.form-element.form-element--radio
        input(id="booking_client" type="radio" v-model="bookingFor" value="CLIENT")
        label(for="booking_client") A Client
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
