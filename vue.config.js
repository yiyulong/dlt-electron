module.exports = {
  productionSourceMap: false,
  devServer: {
    open: true
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
