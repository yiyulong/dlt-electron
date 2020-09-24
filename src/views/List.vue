<template>
  <!-- @click="initTimmer" -->
  <div class="list-page" :style="'background-image: url('+$store.state.PRODUCT_LIST_BACKGROUD_PICTURE || ''+')'">
    <section v-for="(itemArr, index) of list" :key="index">
      <the-marquee :list="itemArr" :direction="index%2 ? 'left' : 'right'" @itemClick="getDetail" @panstart="cancelTimmer" @panmove="cancelTimmer" @continueTimmer="initTimmer" />
    </section>
    <aside v-if="toggle" @click.self="closeDetail">
      <div class="details animate__animated animate__zoomIn">
        <div class="img-box"><img :src="detailItem.detailPicUrl"></div>
        <!-- <div class="desc-box">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis cum quae culpa sequi laudantium beatae praesentium commodi vel nisi pariatur numquam, facere dolore corrupti magnam neque. Impedit iusto nostrum adipisci.
        </div> -->
      </div>
      <div class="relative animate__animated animate__fadeInUp">
        <the-marquee :list="bottomArr" direction="left" @itemClick="BottomgetDetail" @panstart="cancelTimmer" @panmove="cancelTimmer" @continueTimmer="initTimmer" />
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
      detailItem: null,
      toggle: false,
      list: [],
      bottomArr: []
    }
  },
  created () {
    this.initTimmer()
    this.list = Object.freeze(this.initList(this.$store.state.PRODUCT_LIST))
  },
  destroyed () {
    clearTimeout(this.timmer)
  },
  // activated () {
  //   // console.log('activated')
  //   this.initTimmer()
  // },
  // deactivated () {
  //   clearTimeout(this.timmer)
  //   // console.log('deactivated', this.timmer)
  // },
  methods: {
    initList (array = [], size = 5) {
      const length = array.length
      const maxLength = 8 * size
      if (!length || !size || size < 1) {
        return []
      }
      let index = 0 // 用来表示切割元素的范围start
      let resIndex = 0 // 用来递增表示输出数组的下标

      // 根据length和size算出输出数组的长度，并且创建它。
      const len = length <= maxLength ? length : maxLength
      const result = new Array(Math.ceil(len / size))

      while (index < len) {
      // 循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
        result[resIndex++] = array.slice(index, (index += size))
      }
      if (length > maxLength) {
        result.push(array.slice(maxLength))
      }
      return result
    },
    initTimmer () {
      // console.log('initTimmer', this.timmer)
      this.timmer && clearTimeout(this.timmer)
      this.timmer = setTimeout(() => {
        this.$router.back()
      }, 5000)
    },
    cancelTimmer () {
      this.timmer && clearTimeout(this.timmer)
    },
    getDetail (id) {
      // console.log('getDetail', id)
      for (let i = 0; i <= this.list.length; i++) {
        const currentItem = this.list[i].find((item) => item.id === id)
        if (currentItem) {
          this.bottomArr = this.list[i]
          this.detailItem = currentItem
          break
        }
      }
      this.toggle = true
      clearTimeout(this.timmer)
    },
    BottomgetDetail (id) {
      this.detailItem = this.bottomArr.find(item => item.id === id)
      clearTimeout(this.timmer)
    },
    closeDetail () {
      // console.log('closeDetail')
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
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  section {
    box-sizing: border-box;
    height: percentage(100/900);
    padding: 15px 0;
  }
  aside {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: .8);
    > .details {
      width: 70%;
      background: #fff;
      box-shadow: 0 10px 20px rgba($color: #000000, $alpha: .6);
      border-radius: 10px;
      padding: 5px;
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
          vertical-align: middle;
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
      height: 10vh;
    }
  }
}
</style>
