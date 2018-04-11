<template lang="pug">
  label
    input(type="radio" :name="name" :value="val" @change="updateInput")
    span {{ label }}
</template>

<script>
  export default {
    name: 'RadioButton',
    props: ['name', 'val', 'label'],
    // computed: {
    //   radioValue: {
    //     get() {
    //       return this.value
    //     },
    //     set() {
    //       this.$emit('change', this.label)
    //     }
    //   }
    // },
    methods: {
      updateInput(event) {
        this.$emit('input', event.target.value)
      }
    }
  }
</script>
