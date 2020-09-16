<template>
  <div class="login-page">
    <div class="content">
      <van-cell-group>
        <van-field v-model="userName" label="账号" placeholder="请输入账号" right-icon="friends" />
        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" right-icon="closed-eye" />
      </van-cell-group>
      <p><van-button type="default" block :loading="loading" loading-type="spinner" loading-text="正在登录" @click="login">登录系统</van-button></p>
    </div>
    <div class="overlay" v-if="showLoading">
      <div class="wrapper" @click.stop>
        <van-circle v-model="currentProgress" :text="loadText" size="120" :color="{ '0%': '#3fecff', '100%': '#6149f6' }" />
      </div>
    </div>
  </div>
</template>

<script>
import 'yuki-createjs/lib/preloadjs-0.6.2.combined'
export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      password: '',
      loading: false,
      showLoading: false,
      currentProgress: 0
    }
  },
  computed: {
    loadText () {
      return '资源加载中... ' + this.currentProgress + '%'
    }
  },
  created () {
    // console.log(this.$store.state)
  },
  methods: {
    async login () {
      if (this.loading) return
      try {
        this.loading = true
        const loginRes = await this.$api.post('/mgp/api/doLogin', {
          userName: this.userName,
          password: this.password
        })

        const productRes = await this.$api.get('/mgp/api/product/getProductInfoList', { headers: { 'session-token': loginRes.data.sessionToken } })

        const resObj = { PRODUCT_LIST: productRes.resultList, ...loginRes.data }
        for (const key in resObj) {
          this.$store.setValue(key, resObj[key])
        }

        // eslint-disable-next-line no-undef
        const queue = new createjs.LoadQueue(false)
        queue.on('loadstart', this.queueLoadstart)
        queue.on('fileload', this.queueFileload)
        queue.on('progress', this.queueProgress)
        queue.on('complete', this.queueComplete)
        queue.on('error', this.queueError)

        const productImgs = []
        for (let i = 0; i < resObj.PRODUCT_LIST.length; i++) {
          const currentItem = resObj.PRODUCT_LIST[i]
          productImgs.push(...[
            // eslint-disable-next-line no-undef
            { src: currentItem.picUrl, type: createjs.AbstractLoader.IMAGE },
            // eslint-disable-next-line no-undef
            { src: currentItem.detailPicUrl, type: createjs.AbstractLoader.IMAGE }
          ])
        }
        const manifest = [
          // eslint-disable-next-line no-undef
          { src: resObj.VIDEO_FILE_URL, type: createjs.AbstractLoader.VIDEO },
          // eslint-disable-next-line no-undef
          { src: resObj.KALEIDOSCOPE_BACKGROUD_PICTURE, type: createjs.AbstractLoader.IMAGE },
          // eslint-disable-next-line no-undef
          { src: resObj.PRODUCT_LIST_BACKGROUD_PICTURE, type: createjs.AbstractLoader.IMAGE },
          ...productImgs
        ]
        if (resObj.SHOW_VIDEO) {
          // eslint-disable-next-line no-undef
          manifest.push({ src: resObj.INDEX_VIDEO_FILE_URL, type: createjs.AbstractLoader.VIDEO })
        }
        queue.loadManifest(manifest)
      } catch (err) {
      }
      this.loading = false
    },
    // 资源加载
    queueLoadstart (event) {
      // console.log('loadstart', event)
      this.showLoading = true
    },
    // 处理单个文件加载
    queueFileload (event) {
      // console.log('fileload', event)
    },
    // 已加载进度
    queueProgress (event) {
      // console.log('progress', event)
      this.currentProgress = Math.ceil(event.loaded * 100)
    },
    // 全度资源加载完毕
    queueComplete (event) {
      // console.log('complete', event)
      // this.showLoading = false
      setTimeout(() => {
        this.$router.replace({ name: this.$store.state.SHOW_VIDEO ? 'About' : 'Home' })
      }, 300)
    },
    // 处理加载错误：大家可以修改成错误的文件地址，可在控制台看到此方法调用
    queueError (event) {
      console.log('error', event)
    }
  }
}
</script>

<style lang="scss">
.login-page {
  background: #f3f3f3;
  text-align: center;
  .content {
    display: inline-block;
    margin-top: 20%;
    width: 80%;
    .van-field__label {
      width: auto;
    }
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    background: rgba($color: #fff, $alpha: 1);
    overflow: hidden;
    box-sizing: border-box;
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
    }
  }
}
</style>
