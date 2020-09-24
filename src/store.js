const parseValue = (key) => {
  const value = localStorage.getItem(key)
  if (typeof value !== 'undefined') {
    return JSON.parse(value)
  }
  return undefined
}
class Store {
  constructor () {
    this.data = {
      SHOW_VIDEO: parseValue('SHOW_VIDEO') ?? true,
      VIDEO_FILE_URL: parseValue('VIDEO_FILE_URL') ?? '',
      INDEX_VIDEO_FILE_URL: parseValue('INDEX_VIDEO_FILE_URL') ?? '',
      KALEIDOSCOPE_BACKGROUD_PICTURE: parseValue('KALEIDOSCOPE_BACKGROUD_PICTURE') ?? '',
      PRODUCT_LIST_BACKGROUD_PICTURE: parseValue('PRODUCT_LIST_BACKGROUD_PICTURE') ?? '',
      PRODUCT_LIST: parseValue('PRODUCT_LIST') ?? []
    }
  }

  get state () {
    return this.data
  }

  setValue (target, value) {
    this.data[target] = value
    localStorage.setItem(target, JSON.stringify(value))
  }
}

export default new Store()
