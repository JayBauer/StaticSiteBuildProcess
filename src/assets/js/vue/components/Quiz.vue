<template lang='pug'>
  div
    section#booking-header.booking-page
      h1 Book a Scan
      Button(v-if="selectedComponent > 3" id="save-booking-btn" text="Save Progress" @click.native="saveQuiz")
      quiz-header-nav(@clicked="navigate")

    section#booking-quiz.booking-page
      component(:is="components[selectedComponent]")

    section#booking-nav.booking-page
      nav-buttons(:next="next" :previous="previous" @clicked="navigate")
</template>

<script>
  import QuizHeaderNav from '@c/quiz/QuizHeaderNav'
  import NavButtons from '@c/quiz/NavButtons'
  import BookingFor from '@c/quiz/BookingFor'
  import Resident from '@c/quiz/Resident'
  import BodyParts from '@c/quiz/BodyParts'
  import Waiver from '@c/quiz/Waiver'
  import Referral from '@c/quiz/Referral'
  import Payment from '@c/quiz/Payment'

  import { GET_QUIZ } from '@r/queries'
  import { SAVE_QUIZ } from '@r/mutations'

  export default {
    data: () => ({
      components: [
        'BookingFor',
        'Resident',
        'BodyParts',
        'Waiver',
        'Referral',
        'Payment'
      ],
      selectedComponent: 0,
      quiz: {}
    }),
    computed: {
      currentStore() {
        return this.$store.getters.state
      },
      next() {
        return this.selectedComponent + 1;
      },
      previous() {
        return this.selectedComponent - 1;
      }
    },
    apollo: {
      quiz: {
        query: GET_QUIZ,
        loadingKey: 'loading',
        variables() {
          return {
            id: this.$route.params.id
          }
        },
        result(data) {
          this.initialValues(data)
        }
      }
    },
    methods: {
      navigate(value) {
        this.selectedComponent = value
      },
      initialValues(data) {
        const { bookingFor, ontarioRes, bodyParts, waiver, referral, payment } = data.data.quiz
        const newStore = {
          bookingFor: bookingFor,
          ontarioRes: ontarioRes,
          bodyParts: bodyParts,
          waiver: {
            party: waiver.party,
            otherParty: waiver.otherParty,
            agree: waiver.agree,
            firstName: waiver.firstName,
            lastName: waiver.lastName,
            date: waiver.date
          },
          referral: {
            maple: referral.maple,
            upload: referral.upload
          },
          payment
        }
        this.$store.dispatch('setStore', newStore)
      },
      saveQuiz() {
        const { bookingFor, ontarioRes, bodyParts, waiver, referral, payment } = this.currentStore
        this.$apollo.mutate({
          mutation: SAVE_QUIZ,
          variables: {
            id: this.$route.params.id,
            user: this.$root.$data.userId,
            bookingFor,
            ontarioRes,
            bodyParts,
            waiver: {
              party: { set: waiver.party },
              otherParty: waiver.otherParty,
              agree: waiver.agree,
              firstName: waiver.firstName,
              lastName: waiver.lastName,
              date: waiver.date
            },
            referral,
            payment
          }
        }).then(res => {
          console.log('Successful quiz save, ya done it')
        }).catch(err => {
          console.log(err)
        })
      }
    },
    components: {
      'quiz-header-nav': QuizHeaderNav,
      'nav-buttons': NavButtons,
      BookingFor,
      Resident,
      BodyParts,
      Waiver,
      Referral,
      Payment
    }
  }
</script>
