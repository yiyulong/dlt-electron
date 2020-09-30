<template>
  <div id="app">
    <transition
      enter-active-class="animate__animated animate__zoomIn animate__fadeIn"
      leave-active-class="animate__animated animate__zoomOut animate__fadeOut"
    >
      <router-view class="router-container" />
    </transition>
  </div>
</template>
<script>
import { setStyle } from './assets/js/bodyStyle'
export default {
  beforeMount () {
    document.oncontextmenu = function (event) {
      event.preventDefault()
    }
    // 阻止双击放大
    let lastTouchEnd = 0
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    })
    document.addEventListener('touchend', function (event) {
      const now = (new Date()).getTime()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    }, false)
    // 阻止双指缩放
    document.addEventListener('gesturestart', function (event) {
      event.preventDefault()
    })
    // document.addEventListener('touchstart', this.touchstertFn)
    // document.addEventListener('gesturestart', this.gesturestartFn)
    window.addEventListener('resize', setStyle, { passive: true })
  },
  beforeDestroy () {
    // document.removeEventListener('touchstart', this.touchstertFn)
    // document.removeEventListener('gesturestart', this.gesturestartFn)
    window.removeEventListener('resize', setStyle, { passive: true })
  },
  methods: {
    // gesturestartFn (event) {
    //   if (typeof event.preventDefault !== 'undefined') { // w3c
    //     event.preventDefault()
    //   } else {
    //     event.returnValue = false // ie
    //   }
    // },
    // touchstertFn (event) {
    //   if (event.touches.length > 1) {
    //     event.preventDefault()
    //   }
    // }
  }
}
</script>

<style lang="scss">
html {
  touch-action: none;
}
* {
  outline: none;
}

body {
  overflow: hidden;
  background: #eee;
  margin: 0 auto;
}

// img {
//   border: 1px solid rgba($color: #e8c664, $alpha: .6);
// }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 100%;
  margin: auto;
  background: #000;

  position: relative;

  .router-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
