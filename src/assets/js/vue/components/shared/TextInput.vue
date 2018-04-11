<template lang='pug'>
  input(
    type="text"
    :value="value"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
    ref="input")
</template>

<script>
  export default {
    name: 'TextInput',
    props: [ 'value', 'placeholder' ],
  }
</script>
