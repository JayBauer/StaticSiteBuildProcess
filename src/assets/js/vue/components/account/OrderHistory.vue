<template lang="pug">
  section#order-history.account-page
    template(v-if="loading > 0")
      h4 Loading...
    template(v-if="quizzes.length == 0")
      h4 You haven't booked a scan yet! #[router-link(:to="{ name: 'Booking' }") Click here] to begin.
    template(v-else)
      div.single-order.single-order--headers
        h4 Date Created
        h4 Booking Number
        h4 Status
      div(v-for="quiz in quizzes")
        Order(:id="quiz.id" :date="quiz.updatedAt" :status="quiz.payment" :key="quiz.id")
</template>

<script>
  import Order from '@c/account/Order'
  import { ME, USER_QUIZZES } from '@r/queries'

  export default {
    name: 'Profile',
    data: () => ({
      quizzes: {},
      loading: 0
    }),
    apollo: {
      quizzes: {
        query: USER_QUIZZES,
        loadingKey: 'loading',
        variables() {
          return {
            user: {
              id: this.$root.$data.userId
            }
          }
        }
      }
    },
    components: {
      Order
    }
  }
</script>
