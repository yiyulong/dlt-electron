<template>
  <div class="list-page" @click="initTimmer">
    <section v-for="n of 9" :key="n">
      <the-marquee :direction="n%2 ? 'left' : 'right'" @itemClick="getDetail" />
    </section>
    <aside v-show="toggle" @click="closeDetail">
      <div class="details animate__animated animate__zoomIn">
        <div class="img-box"><img :src="`./images/${detailNum}.png`"></div>
        <div class="desc-box">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis cum quae culpa sequi laudantium beatae praesentium commodi vel nisi pariatur numquam, facere dolore corrupti magnam neque. Impedit iusto nostrum adipisci.
        </div>
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
    getDetail (n) {
      console.log('getDetail', n)
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
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background: rgba($color: #000000, $alpha: .6);
    > div {
      height: 50%;
      width: 60%;
      background: #fff;
      box-shadow: 0 10px 20px rgba($color: #000000, $alpha: .6);
      border-radius: 10px;
      overflow: auto;
      &::-webkit-scrollbar {
        width:0px;
        height:0px;
      }
      .img-box {
        img {
          width: 100%;
        }
      }
      .desc-box {
        padding: 5px 10px;
      }
    }
  }
}
</style>
