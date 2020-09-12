module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  productionSourceMap: false,
  devServer: {
    open: true
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true
    //   }
    // }
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
