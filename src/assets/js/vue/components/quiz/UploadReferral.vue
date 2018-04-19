<template lang="pug">
  div.referral__upload-ref
    h3 Upload your referral
    h4 Attach a file from your computer below to continue to book your MRI scan
    div(v-if="!success")
      input(type="file" accept="image/*" @change="onFileChange")
    div(v-else)
      img(:src="image")
      button(@click="uploadFile") Confirm Upload
      button(@click="removeImage") Delete File
</template>

<script>
  import { UPLOAD } from '@r/mutations'

  export default {
    name: 'UploadReferral',
    data: () => ({
      success: false,
      image: ''
    }),
    methods: {
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        this.createImage(files[0])
        this.success = true
        this.$apollo.mutate({
          mutation: UPLOAD,
          variables: {
            file: files[0]
          }
        })
      },
      createImage(file) {
        var image = new Image()
        var reader = new FileReader()
        var vm = this

        reader.onload = (e) => {
          vm.image = e.target.result
        }
        reader.readAsDataURL(file)
        // this.$http.post('/uploads', { params: reader }, headers: { 'Content-Type': 'multipart/form-data' })
      },
      removeImage: function (e) {
        this.image = ''
      }
    }
  }
</script>
