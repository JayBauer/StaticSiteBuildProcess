<template lang="pug">
  div
    h1 Order History
    template(v-if="loading > 0")
      h4 Loading...
    div(v-for="quiz in quizzes")
      h4 {{ quiz }}
</template>

<script>
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
    }
  }
</script>
