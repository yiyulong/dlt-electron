<template>
  <div class="marquee-component">
    <!-- @click.stop="tragetEven" -->
    <ul ref="marquee" class="marquee">
      <li v-for="n of 6" :key="n">
        <img :data-id="n" :src="`./images/${n}.png`" :class="randomNum === n && 'rotate'">
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
    direction: {
      type: String,
      default: 'left'
    }
  },
  data () {
    return {
      marquee: null,
      hammer: null,
      currentTranslateX: 0
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
  destroyed () {
    this.hammer.off()
  },
  computed: {
    randomNum () {
      return parseInt(Math.random() * 6)
    }
  },
  methods: {
    tragetEven (e) {
      console.log(e, e.target.tagName)
      const tagName = e.target.tagName
      if (tagName.toLowerCase() === 'img') {
        const { id } = e.target.dataset
        // console.log(id)
        this.$emit('itemClick', id)
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
    li {
      display: inline-block;
      height: 100%;
      margin-right: 30px;
      img {
        height: 100%;
        -webkit-user-drag: none;
        -webkit-user-select: none;
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
