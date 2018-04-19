<template lang="pug">
  div.referral__get-ref
    h3 Get a Referral
    h4 A referral can be provided through our partner Maple for a $100 fee. By clicking below you acknowledge that this will be added to your final total cost.
    Button(id="pay-maple-btn" text="Pay For a Maple Referral" @click.native="payMaple")
</template>

<script>
  export default {
    name: 'MapleReferral',
    computed: {
      referral() {
        return this.$store.getters.referral
      }
    },
    methods: {
      payMaple() {
        this.$store.dispatch('updateReferral', { maple: true, upload: '' })
      }
    }
  }
</script>
