<template lang="pug">
  div#referral.booking-page
    template(v-if="!selectedComponent")
      div.referral__nav
        h3 Do you need a referral?
        h4 Click below to visit our referral partner Maple and see a doctor via video conference in 15 minutes or less!
        Button(id="upload-ref-btn" text="Upload Referral" @click.native="selectedComponent = 'upload-referral'")
        Button(id="maple-ref-btn" text="Pay for a Maple Referral" @click.native="selectedComponent = 'maple-referral'")
        
    component(:is="selectedComponent")
</template>

<script>
  import UploadReferral from '@c/quiz/UploadReferral'
  import MapleReferral from '@c/quiz/MapleReferral'

  export default {
    name: 'Referral',
    data: () => ({
      selectedComponent: ''
    }),
    components: {
      'upload-referral': UploadReferral,
      'maple-referral': MapleReferral
    }
  }
</script>
