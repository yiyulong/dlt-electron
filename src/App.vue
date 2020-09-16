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
    window.addEventListener('resize', setStyle, { passive: true })
  },
  beforeDestroy () {
    window.removeEventListener('resize', setStyle, { passive: true })
  }
}
</script>

<style lang="scss">
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
