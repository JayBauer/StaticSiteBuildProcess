<template lang="pug">
  div#quote-box.quote-box(:class="scrolled" @scroll="handleScroll")
    div.quote-box__top
      h1 Quote:
      div.quote-box__cost
        h4 Cost: ${{ price }}
        h4 Discount: -${{ discount }}
        h4 Total: ${{ price - discount }}
      h4 Check multiple body parts if applicable, multiple body part discounts will apply.
    div.quote-box__bottom
      button: h4 Next
</template>

<script>
  export default {
    name: 'Quote',
    props: ['price', 'discount'],
    data: () => ({
      scrolled: ''
    }),
    methods: {
      handleScroll () {
        if(window.scrollY > 650) {
          this.scrolled = 'fixed'
        } else {
          this.scrolled = ''
        }
      }
    },
    beforeMount () {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
</script>
