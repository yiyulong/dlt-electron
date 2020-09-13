module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  productionSourceMap: false,
  devServer: {
    open: true,
    proxy: {
      '/': {
        target: 'http://120.24.29.201:8080',
        changeOrigin: true
      }
    }
    // proxy: process.env.NODE_ENV === 'production'
    //   ? {}
    //   : {
    //     '/': {
    //       target: 'http://120.24.29.201:8080',
    //       changeOrigin: true
    //     }
    //   }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/assets/styles/variable.scss";
          @import "~@/assets/styles/global.scss";
        `
      }
    }
  }
}
