<template lang='pug'>
  section#booking-quiz.booking-page
    h3 What body part or parts need to be scanned?
    div.form-group
      div(v-for="(options, index) in brain")
        label
          input(type="checkbox" :value="options.name" :key="index" v-model="selectedBrain")
          span {{ options.name }}

      div(v-for="(options, index) in spine")
        label
          input(type="checkbox" :value="options.name" :key="index" v-model="selectedSpine")
          span {{ options.name }}

      div(v-for="(options, index) in body")
        label
          input(type="checkbox" :value="options.name" :key="index" v-model="selectedBody")
          span {{ options.name }}

      div(v-for="(options, index) in extremities")
        label
          input(type="checkbox" :value="options.name" :key="index" v-model="selectedExtremities")
          span {{ options.name }}
</template>

<script>
  export default {
    name: 'BodyParts',
    data: () => ({
      brain: [
        { name: 'Routine Brain' },
        { name: 'Facial Bones' },
        { name: 'Brain with Susceptibility Weighted Imaging (SWI)' },
        { name: 'Temporomandibular Joints (no brain included) - (Jaw)' },
      ],
      selectedBrain: [],
      spine: [
        { name: 'Cervical (neck)' },
        { name: 'Thoracic (midback)' },
        { name: 'Lumbar (lowerback)' },
        { name: 'Sacrum' },
        { name: 'Sacroiliac Joints' },
        { name: 'Coccyx (tailbone)' },
        { name: 'Lumbar Spine Sacrum Combination' },
        { name: 'Lumbar Spine Sacroiliac Joints Combination' }
      ],
      selectedSpine: [],
      body: [
        { name: 'Thorax' },
        { name: 'Abdomen' },
        { name: 'Pelvis' },
        { name: 'Prostate' },
        { name: 'Liver' },
        { name: 'Chest' },
      ],
      selectedBody: [],
      extremities: [
        { name: 'Right Shoulder' },
        { name: 'Left Shoulder' },
        { name: 'Right Elbow' },
        { name: 'Left Elbow' },
        { name: 'Right Wrist' },
        { name: 'Left Wrist' },
        { name: 'Right Hip' },
        { name: 'Left Hip' },
        { name: 'Right Knee' },
        { name: 'Left Knee' },
        { name: 'Right Ankle' },
        { name: 'Left Ankle' },
        { name: 'Right Foot' },
        { name: 'Left Foot' },
      ],
      selectedExtremities: []
    }),
    beforeDestroy() {
      this.$store.dispatch('updateBodyParts', [
        { brain: this.selectedBrain },
        { spine: this.selectedSpine },
        { body: this.selectedBody },
        { extremities: this.selectedExtremities }
      ])
    }
  }
</script>
