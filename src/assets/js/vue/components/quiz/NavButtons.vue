<template lang="pug">
  nav
    button(v-if="previous >= 0" @click="onClick(previous)")
      img(src="/images/back-btn.svg")
      h4 Back
    button(v-if="next <= 5" @click="onClick(next)")
      img(src="/images/next-btn.svg")
      h4 Next
</template>
<script>
export default {
  name: 'NavButtons',
  props: ['next', 'previous'],
  methods: {
    onClick(e) {
      this.$emit('clicked', e)
    }
  }
}
</script>
