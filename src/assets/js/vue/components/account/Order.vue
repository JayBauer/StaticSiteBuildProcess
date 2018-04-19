<template lang="pug">
  router-link(:to="{ name: 'Booking', params: { id } }")
    div.single-order.single-order--content
      h4 {{ convertDate(date) }}
      h4 {{ id }}
      h4 {{ status ? 'Scan Ordered' : 'In Progress' }}
</template>
<script>
export default {
  name: 'Order',
  props: ['id', 'date', 'status'],
  methods: {
    convertDate(date) {
      var newDate = new Date(date)
      return newDate.toLocaleDateString('en-US')
    }
  }
}
</script>
