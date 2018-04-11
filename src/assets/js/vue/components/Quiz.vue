<template lang='pug'>
  div
    section#booking-header.booking-page
      h1 Book a Scan
      nav.quiz-nav
        button(@click="selectedComponent = 0")
          img(src="/images/airplane.svg")
        button(@click="selectedComponent = 1")
          img(src="/images/results-orange.svg")
        button(@click="selectedComponent = 2")
          img(src="/images/results-orange.svg")
        button(@click="selectedComponent = 3")
          img(src="/images/results-orange.svg")
        button(@click="selectedComponent = 4")
          img(src="/images/results-orange.svg")

    component(:is="componentList[selectedComponent].name")

    h2: button(@click="previousComponent") Back
    h2: button(@click="nextComponent") Next
    template(v-if="selectedComponent >= 3")
      button(@click="saveQuiz") Save Progress
    ul
      li(v-for="item in currentStore") {{ item }}
</template>

<script>
  import QuizHeader from '@c/quiz/QuizHeader'
  import BookingFor from '@c/quiz/BookingFor'
  import BodyParts from '@c/quiz/BodyParts'
  import Resident from '@c/quiz/Resident'
  import Waiver from '@c/quiz/Waiver'
  import Referral from '@c/quiz/Referral'

  import { SAVE_QUIZ } from '@r/mutations'

  export default {
    data: () => ({
      componentList: [
        { name: 'booking-for' },
        { name: 'ontario-res' },
        { name: 'body-parts' },
        { name: 'waiver' },
        { name: 'referral' },
      ],
      selectedComponent: 0
    }),
    computed: {
      currentStore() {
        return this.$store.getters.state
      }
    },
    methods: {
      nextComponent() {
        if(this.selectedComponent < this.componentList.length - 1)
          this.selectedComponent++
      },
      previousComponent() {
        if(this.selectedComponent > 0)
          this.selectedComponent--
      },
      saveQuiz() {
        this.$apollo.mutate({

        })
      }
    },
    components: {
      'quiz-header': QuizHeader,
      'booking-for': BookingFor,
      'body-parts': BodyParts,
      'ontario-res': Resident,
      'waiver': Waiver,
      'referral': Referral
    }
  }
</script>
