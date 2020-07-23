<template>
  <div class="home-page">
    <div class="video-container">
      <video-player></video-player>
    </div>
    <div class="pdt-container">
       <section class="cylinder-container">
         <div class="row" v-for="m of 9" :key="m">
           <div class="span" v-for="n of 12" :key="n">
             <img :src="`./images/${n}.png`">
           </div>
         </div>
       </section>
    </div>
    <div class="mask-container" @click="jump">
      <i class="tip-touch animate__animated animate__infinite animate__heartBeat animate__slow" />
    </div>
  </div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer.vue'
export default {
  name: 'Home',
  components: {
    VideoPlayer
  },
  data () {
    return {
    }
  },
  methods: {
    jump () {
      this.$router.push({ name: 'List' })
    }
  }
}
</script>
<style lang="scss">
.home-page {
  height: 100%;
  position: relative;;
  .video-container {
    height: 29%;
  }
  .pdt-container {
    overflow: hidden;
    height: 71%;
    // perspective: 1000px;
    // transform-style: preserve-3d;
    @keyframes infiniteRotate {
      from {
        transform: rotateY(0deg);
      }
      to {
        transform: rotateY(360deg);
      }
    }
    .cylinder-container {
      margin: 60px 0;
      perspective: 1000px;
      // transform-style: preserve-3d;
      // animation: infiniteRotate 4s infinite both;
      .row {
        position: relative;
        width: 40px;
        height: 40px;
        // perspective: 1000px;
        transform-style: preserve-3d;
        margin: 10px auto;
        animation: infiniteRotate 12s linear infinite both;
      }
      .span {
        position: absolute;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      $len: 12;
      $deg: 360 / $len;
      @for $i from 1 through $len {
        .row .span:nth-child(#{$i}) {
          transform: rotateY(#{$i * $deg}deg) translateZ(150px);
        }
      }
    }
  }
  .mask-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    .tip-touch {
      width: 60px;
      height: 60px;
      background: url('../assets/images/Touch.svg') no-repeat center;
      background-size: contain;
    }
  }
}
</style>
