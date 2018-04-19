<template lang='pug'>
  div#body-parts
    h3 What body part or parts need to be scanned?
    h4 Check multiple body parts if applicable, multiple body part discounts will apply.
    div.body-parts__form

      div.body-parts__brain.form-group
        h5 Brain
        div.form-element.form-element--checkbox(v-for="(options, index) in brain")
          input(type="checkbox" :id="options.id" :value="options" :key="options.id" v-model="selectedBrain")
          label(:for="options.id") {{ options.name }}

      div.body-parts__brain.form-group
        h5 Spine
        div.form-element.form-element--checkbox(v-for="(options, index) in spine")
          input(type="checkbox" :id="options.id" :value="options" :key="options.id" v-model="selectedSpine")
          label(:for="options.id") {{ options.name }}

      div.body-parts__body.form-group
        h5 Body
        div.form-element.form-element--checkbox(v-for="(options, index) in body")
          input(type="checkbox" :id="options.id" :value="options" :key="options.id" v-model="selectedBody")
          label(:for="options.id") {{ options.name }}

      div.body-parts__extremities.form-group
        h5 Extremities or Joints
        div.form-element.form-element--checkbox(v-for="(options, index) in extremities")
          input(type="checkbox" :id="options.id" :value="options" :key="options.id" v-model="selectedExtremities")
          label(:for="options.id") {{ options.name }}

      quote-box(:price="price" :discount="0")
</template>

<script>
  import Quote from '@c/quiz/Quote'

  export default {
    name: 'BodyParts',
    components: {
      'quote-box': Quote
    },
    data: () => ({
      brain: [
        { name: 'Routine Brain', id: 'brain_routine', price: 800 },
        { name: 'Facial Bones', id: 'brain_facial', price: 1300 },
        { name: 'Brain with Susceptibility Weighted Imaging (SWI)', id: 'brain_swi', price: 800 },
        { name: 'Temporomandibular Joints (no brain included) - (Jaw)', id: 'brain_jaw', price: 800 },
      ],
      selectedBrain: [],
      spine: [
        { name: 'Cervical (neck)', id: 'spine_cervical', price: 800 },
        { name: 'Thoracic (midback)', id: 'spine_thoracic', price: 800 },
        { name: 'Lumbar (lowerback)', id: 'spine_lumbar', price: 800 },
        { name: 'Sacrum', id: 'spine_sacrum', price: 800 },
        { name: 'Sacroiliac Joints', id: 'spine_sacroiliac', price: 800 },
        { name: 'Coccyx (tailbone)', id: 'spine_coccyx', price: 800 },
        { name: 'Lumbar Spine Sacrum Combination', id: 'spine_lumbar-sacrum', price: 1300 },
        { name: 'Lumbar Spine Sacroiliac Joints Combination', id: 'spine_lumbar-sacroiliac', price: 1300 }
      ],
      selectedSpine: [],
      body: [
        { name: 'Thorax', id: 'body_thorax', price: 800 },
        { name: 'Abdomen', id: 'body_abdomen', price: 800 },
        { name: 'Pelvis', id: 'body_pelvis', price: 800 },
        { name: 'Prostate', id: 'body_prostate', price: 1000 },
        { name: 'Liver', id: 'body_liver', price: 800 },
        { name: 'Chest', id: 'body_chest', price: 800 },
      ],
      selectedBody: [],
      extremities: [
        { name: 'Left Shoulder', id: 'extrem_l-shoulder', price: 800 },
        { name: 'Right Shoulder', id: 'extrem_r-shoulder', price: 800 },
        { name: 'Left Elbow', id: 'extrem_l-elbow', price: 800 },
        { name: 'Right Elbow', id: 'extrem_r-elbow', price: 800 },
        { name: 'Left Wrist', id: 'extrem_l-wrist', price: 800 },
        { name: 'Right Wrist', id: 'extrem_r-wrist', price: 800 },
        { name: 'Left Hip', id: 'extrem_l-hip', price: 800 },
        { name: 'Right Hip', id: 'extrem_r-hip', price: 800 },
        { name: 'Left Knee', id: 'extrem_l-knee', price: 800 },
        { name: 'Right Knee', id: 'extrem_r-knee', price: 800 },
        { name: 'Left Ankle', id: 'extrem_l-ankle', price: 800 },
        { name: 'Right Ankle', id: 'extrem_r-ankle', price: 800 },
        { name: 'Left Foot', id: 'extrem_l-foot', price: 800 },
        { name: 'Right Foot', id: 'extrem_r-foot', price: 800 }
      ],
      selectedExtremities: [],
    }),
    computed: {
      price() {
        var price = 0;
        for(let i of [this.selectedBrain, this.selectedSpine, this.selectedBody, this.selectedExtremities]) {
          for(let j of i) {
            price += j.price
          }
        }
        return price;
      }
    },
    mounted() {
      this.selectedBrain = this.$store.getters.bodyParts.brain
      this.selectedSpine = this.$store.getters.bodyParts.spine
      this.selectedBody = this.$store.getters.bodyParts.body
      this.selectedExtremities = this.$store.getters.bodyParts.extremities
    },
    beforeDestroy() {
      this.$store.dispatch('updateBodyParts', {
        brain: this.selectedBrain,
        spine: this.selectedSpine,
        body: this.selectedBody,
        extremities: this.selectedExtremities
      })
    },
  }
</script>
