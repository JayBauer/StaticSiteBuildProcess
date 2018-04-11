<template lang='pug'>
  button.btn-big(:id="id" type="submit")
    svg(height="60" width="100%" xmlns="http://www.w3.org/2000/svg")
      rect.shape(height="60" width="100%")
    button {{ text }}
</template>

<script>
  export default {
    name: 'Button',
    props: [ 'id', 'text' ],
  }
</script>
