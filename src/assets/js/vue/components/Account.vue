<template lang='pug'>
  div
    account-header
    router-view
</template>

<script>
  import AccountHeader from '@c/account/AccountHeader'
  export default {
    components: {
      'account-header': AccountHeader
    }
  }
</script>
