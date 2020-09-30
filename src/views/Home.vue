<template>
  <div class="home-page" :style="'background-image: url('+$store.state.KALEIDOSCOPE_BACKGROUD_PICTURE || ''+')'">
    <div class="video-container">
      <video-player class="video-content" :src="$store.state.INDEX_VIDEO_FILE_URL" />
    </div>
    <div class="pdt-container">
       <section class="cylinder-container">
         <div class="row" v-for="(itemArr, index) of list" :key="index">
           <div class="span" v-for="(item, idx) of initRow(itemArr)" :key="idx">
             <img :src="item.picUrl">
           </div>
         </div>
       </section>
    </div>
    <div class="mask-container" @click.stop="jump">
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
      list: [],
      timmer: null
    }
  },
  created () {
    this.initTimmer()
    this.list = Object.freeze(this.$store.state.PRODUCT_LIST)
  },
  destroyed () {
    clearTimeout(this.timmer)
  },
  methods: {
    initRow (arr = []) {
      let list = []
      if (arr.length < 12) {
        while (list.length < 12) {
          list.push(...arr)
        }
      } else {
        list = arr
      }
      return list.slice(0, 12)
    },
    // initList (array = [], size = 6) {
    //   const length = array.length
    //   if (!length || !size || size < 1) {
    //     return []
    //   }
    //   let index = 0 // 用来表示切割元素的范围start
    //   let resIndex = 0 // 用来递增表示输出数组的下标

    //   // 根据length和size算出输出数组的长度，并且创建它。
    //   const result = new Array(Math.ceil(length / size))

    //   while (index < length) {
    //   // 循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
    //     result[resIndex++] = array.slice(index, (index += size))
    //   }
    //   return result
    // },
    jump () {
      this.$store.state.SHOW_VIDEO ? this.$router.replace({ name: 'List' }) : this.$router.push({ name: 'List' })
    },
    initTimmer () {
      clearTimeout(this.timmer)
      this.timmer = setTimeout(() => {
        this.$router.back()
      }, 1000 * (this.$store.state.TIME_DURATION || 30))
    }
  }
}
</script>
<style lang="scss">
.home-page {
  cursor: none;
  height: 100%;
  position: relative;;
  display: flex;
  flex-flow: column nowrap;
  background-size: cover;
  background-repeat: no-repeat;
  .video-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 56.25%;
    .video-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
  .pdt-container {
    overflow: hidden;
    flex: 1;
    &::after {
      content: '';
      display: inline-block;
      width: 0;
      height: 100%;
      vertical-align: middle;
    }
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
      // margin: 60px 0;
      display: inline-block;
      width: 100%;
      perspective: 200vw;
      vertical-align: middle;
      // transform-style: preserve-3d;
      // animation: infiniteRotate 4s infinite both;
      .row {
        position: relative;
        width: 10%;
        height: 0;
        padding-bottom: 10%;
        // perspective: 1000px;
        transform-style: preserve-3d;
        margin: 1vh auto;
        animation: infiniteRotate 36s linear infinite both;
      }
      .span {
        position: absolute;
        width: 100%;
        height: 100%;
        // backface-visibility: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: 1px solid rgba($color: #e8c664, $alpha: .6);
        }
      }
      $len: 12;
      $deg: 360 / $len;
      @for $i from 1 through $len {
        .row .span:nth-child(#{$i}) {
          transform: rotateY(#{$i * $deg}deg) translateZ(32vw);
        }
        .row:nth-child(even) .span:nth-child(#{$i}) {
          transform: rotateY(#{$i * $deg + 15}deg) translateZ(32vw);
        }
      }
    }
  }
  .mask-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
    .tip-touch {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 30vh;
      width: 15vw;
      height: 15vw;
      margin: auto;
      background: url('../assets/images/Touch.svg') no-repeat center;
      background-size: contain;
    }
  }
}
</style>
