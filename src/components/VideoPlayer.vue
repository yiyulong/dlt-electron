<template>
  <vue-video-player
    class="videoPlayer"
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
    @canplay="onPlayerCanplay($event)"
    @ready="playerReadied"
  />
  <!-- @play="onPlayerPlay($event)" -->
  <!-- @pause="onPlayerPause($event)" -->
  <!-- @ended="onPlayerEnded($event)" -->
  <!-- @waiting="onPlayerWaiting($event)" -->
  <!-- @playing="onPlayerPlaying($event)" -->
  <!-- @loadeddata="onPlayerLoadeddata($event)" -->
  <!-- @timeupdate="onPlayerTimeupdate($event)" -->
  <!-- @canplay="onPlayerCanplay($event)" -->
  <!-- @canplaythrough="onPlayerCanplaythrough($event)" -->

  <!-- @statechanged="playerStateChanged($event)" -->
  <!-- @ready="playerReadied" -->
</template>
<script>
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    vueVideoPlayer: videoPlayer
  },
  props: {
    src: String,
    poster: String
  },
  data () {
    return {
      playerOptions: {
        autoplay: true,
        muted: false,
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        // aspectRatio: '4:3',
        fluid: false,
        preload: 'auto',
        loop: true,
        sources: [{
          type: 'video/mp4',
          // mp4
          // src: 'http://vjs.zencdn.net/v/oceans.mp4'
          // webm
          // src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
          // src: 'https://cloud.video.taobao.com/play/u/839895996/p/1/e/6/t/1/270847207202.mp4'
          // src: 'http://bsy.izuiyou.com/zyvd/b1/eb/19fd-9d8f-11e9-9746-00163e042306'
          src: this.src
        }],
        // poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
        poster: this.poster,
        controlBar: false
      }
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  mounted () {
    // console.log(this.player, this.player.paused())
    // this.player.paused() && this.player.play()
  },
  // activated () {
  //   if (this.player) {
  //     this.player.paused() && this.player.play()
  //   }
  // },
  // deactivated () {
  //   console.log(this.player)
  //   this.player.pause()
  // },
  methods: {
    // onPlayerTimeupdate (e) {
    //   console.log('timeupdate', e)
    // },
    onPlayerCanplay (e) {
      // console.log('onPlayerCanplay', e, this.player)
      // e.paused() && e.play()
      // e.paused() && e.volume(2)
    },
    // playerStateChanged (e) {
    //   console.log('statechanged', e)
    // },
    playerReadied (e) {
      // console.log('playerReadied', e, this.player)
      e.paused() && e.play()
      e.volume(0.5)
    }
  }
}
</script>
<style lang="scss">
.videoPlayer {
  height: 100%;
  overflow: hidden;
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
