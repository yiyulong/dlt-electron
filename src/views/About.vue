<template>
  <div class="full-video-container" @click="jump">
    <video-player :src="$store.state.VIDEO_FILE_URL" />
  </div>
</template>
<script>
import VideoPlayer from '@/components/VideoPlayer.vue'
export default {
  name: 'About',
  components: {
    VideoPlayer
  },
  data () {
    return {
    }
  },
  methods: {
    jump () {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
<style lang="scss">
.full-video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
