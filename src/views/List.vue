<template>
  <!-- @click="initTimmer" -->
  <div class="list-page">
    <section v-for="n of 9" :key="n">
      <the-marquee :direction="n%2 ? 'left' : 'right'" @itemClick="getDetail" @panstart="cancelTimmer" @panmove="cancelTimmer" @continueTimmer="initTimmer" />
    </section>
    <aside v-if="toggle" @click.self="closeDetail">
      <div class="details animate__animated animate__zoomIn">
        <div class="img-box"><img :src="`./images/${detailNum}.png`"></div>
        <div class="desc-box">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis cum quae culpa sequi laudantium beatae praesentium commodi vel nisi pariatur numquam, facere dolore corrupti magnam neque. Impedit iusto nostrum adipisci.
        </div>
      </div>
      <div class="relative">
        <the-marquee direction="left" @itemClick="getDetail" @panstart="cancelTimmer" @panmove="cancelTimmer" @continueTimmer="initTimmer" />
      </div>
    </aside>
  </div>
</template>
<script>
import TheMarquee from '@/components/TheMarquee.vue'
export default {
  name: 'List',
  components: { TheMarquee },
  data () {
    return {
      timmer: null,
      detailNum: null,
      toggle: false
    }
  },
  activated () {
    // console.log('activated')
    this.initTimmer()
  },
  deactivated () {
    clearTimeout(this.timmer)
    // console.log('deactivated', this.timmer)
  },
  methods: {
    initTimmer () {
      console.log('initTimmer', this.timmer)
      this.timmer && clearTimeout(this.timmer)
      this.timmer = setTimeout(() => {
        // console.log('router.back()')
        this.$router.back()
      }, 5000)
    },
    cancelTimmer () {
      this.timmer && clearTimeout(this.timmer)
    },
    getDetail (n) {
      // console.log('getDetail', n)
      this.detailNum = n
      this.toggle = true
      clearTimeout(this.timmer)
    },
    closeDetail () {
      this.toggle = false
      this.initTimmer()
    }
  }
}
</script>
<style lang="scss">
.list-page {
  height: 100vh;
  box-sizing: border-box;
  padding: 10px 0;
  overflow: hidden;
  section {
    box-sizing: border-box;
    height: percentage(100/900);
    box-sizing: border-box;
    padding: 0 0 30px;
  }
  aside {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    background: rgba($color: #000000, $alpha: .8);
    > .details {
      height: 50%;
      width: 60%;
      background: #fff;
      box-shadow: 0 10px 20px rgba($color: #000000, $alpha: .6);
      border-radius: 10px;
      margin: 25% auto 0;
      overflow: auto;
      &::-webkit-scrollbar {
        width:0px;
        height:0px;
      }
      .img-box {
        img {
          width: 100%;
          border: none;
        }
      }
      .desc-box {
        padding: 5px 10px;
      }
    }
    > .relative {
      position: absolute;
      bottom: 10%;
      left: 0;
      right: 0;
      width: 100%;
      height: 80px;
    }
  }
}
</style>
