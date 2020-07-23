<template>
  <vue-video-player
    class="videoPlayer"
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
  />
</template>
<script>
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    vueVideoPlayer: videoPlayer
  },
  data () {
    return {
      playerOptions: {
        height: '360',
        autoplay: true,
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        // aspectRatio: '4:3',
        preload: 'auto',
        sources: [{
          type: 'video/mp4',
          // mp4
          // src: 'http://vjs.zencdn.net/v/oceans.mp4'
          // webm
          src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
        }],
        poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
        controlBar: false
      }
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  }
}
</script>
<style lang="scss">
.videoPlayer {
  height: 100%;
  .video-js {
    width: 100%;
    height: 100%;
    .vjs-big-play-button {
      top: 50%;
      left: 50%;
      margin-left: -1.5em;
      margin-top: -1em;
      font-size: 3.5em;
      height: 1.5em!important;
      line-height: 1.5em!important;
      margin-top: -1em!important;
      z-index: 1;
    }
  }
}
</style>
