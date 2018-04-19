<template lang='pug'>
  nav.quiz-nav
    button(@click="onClick(0)")
      img(src="/images/airplane.svg")
    button(@click="onClick(1)")
      img(src="/images/results-orange.svg")
    button(@click="onClick(2)")
      img(src="/images/results-orange.svg")
    button(@click="onClick(3)")
      img(src="/images/results-orange.svg")
    button(@click="onClick(4)")
      img(src="/images/results-orange.svg")
    button(@click="onClick(5)")
      img(src="/images/results-orange.svg")
</template>

<script>
  export default {
    name: 'QuizHeaderNav',
    methods: {
      onClick(e) {
        this.$emit('clicked', e)
      }
    }
  }
</script>
