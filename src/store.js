class Store {
  constructor () {
    this.data = {
      SHOW_VIDEO: true,
      VIDEO_FILE_URL: '',
      INDEX_VIDEO_FILE_URL: '',
      KALEIDOSCOPE_BACKGROUD_PICTURE: '',
      PRODUCT_LIST_BACKGROUD_PICTURE: '',
      PRODUCT_LIST: []
    }
  }

  get state () {
    return this.data
  }

  setValue (target, value) {
    this.data[target] = value
  }
}

export default new Store()
