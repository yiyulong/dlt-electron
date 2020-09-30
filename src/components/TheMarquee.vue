<template>
  <div class="marquee-component">
    <!-- @click.stop="tragetEven" -->
    <ul ref="marquee" class="marquee" @touchend.prevent>
      <li v-for="(item, index) of restlist" :key="index">
        <img :data-id="item.id" :src="item.picUrl" :class="randomNum === index && 'rotate'">
      </li>
    </ul>
  </div>
</template>
<script>
import Marquee from '@/assets/js/marquee'
import Hammer from 'hammerjs'
export default {
  name: 'TheMarquee',
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    direction: {
      type: String,
      default: 'left'
    }
  },
  data () {
    return {
      restlist: Object.freeze(this.list),
      marquee: null,
      hammer: null,
      currentTranslateX: 0,
      randomNum: parseInt(Math.random() * 5)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.marquee = new Marquee(this.$refs.marquee, this.direction)
      this.hammer = new Hammer(this.$refs.marquee)

      this.hammer.on('tap', this.tragetEven)
      // this.hammer.on('tap', (e) => {
      //   console.log(e)
      //   e.preventDefault()
      //   e.srcEvent.preventDefault()
      //   e.srcEvent.stopPropagation()
      // })
      this.hammer.on('panstart panmove panend pancancel', (e) => {
        // console.log(e)
        // e.preventDefault()
        // e.srcEvent.preventDefault()
        // e.srcEvent.stopPropagation()
        const { deltaX, type } = e
        if (type === 'panstart') {
          this.$emit('panstart')
          this.marquee.stop()
          this.currentTranslateX = this.marquee.getCurrentTranslateX()
        }
        if (type === 'panmove') {
          this.$emit('panmove')
          this.marquee.stop()
          let translateX = deltaX + this.currentTranslateX
          this.marquee.moveMax().then(res => {
            if (res) {
              this.currentTranslateX = this.marquee.getCurrentTranslateX()
              translateX = deltaX + this.currentTranslateX
              this.$refs.marquee.style.transform = `translate3d(${translateX}px, 0, 0)`
            } else {
              this.$refs.marquee.style.transform = `translate3d(${translateX}px, 0, 0)`
            }
          })
        } else {
          this.$emit('continueTimmer')
          this.marquee.play()
        }
      })
    })
  },
  // activated () {
  //   this.marquee && this.marquee.play()
  // },
  // deactivated () {
  //   this.marquee.stop()
  // },
  destroyed () {
    this.marquee.stop()
    this.hammer.off()
  },
  methods: {
    tragetEven (e) {
      // console.log(e, e.target.tagName)
      const tagName = e.target.tagName
      if (tagName.toLowerCase() === 'img') {
        const { id } = e.target.dataset
        // console.log(id)
        this.$emit('itemClick', JSON.parse(id))
      }
    }
  }
}
</script>
<style lang="scss">
.marquee-component {
  height: 100%;
  white-space: nowrap;
  ul {
    display: inline-block;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    white-space: nowrap;
    position: relative;
    box-sizing: border-box;
    li {
      display: inline-block;
      height: 100%;
      // margin-right: 5vw;
      box-sizing: border-box;
      width: 20vw;
      img {
        height: 100%;
        -webkit-user-drag: none;
        -moz-user-drag: none;
        -ms-user-drag: none;
        user-drag: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        vertical-align: middle;
        box-sizing: border-box;
        border: 2px solid rgba($color: #e8c664, $alpha: .6);
        // border: 1px solid hsla(45°, 74.2%, 65.1%, .6);
        &.rotate {
          animation: rotate 4s infinite;
        }
      }
      @keyframes rotate {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>
