/*
 * @Author: yyl
 * @Date: 2020-09-12 10:29:42
 * @LastEditors: yyl
 * @LastEditTime: 2020-09-16 23:26:29
 * @FilePath: /dlt-electron/src/assets/js/bodyStyle.js
 * @Description: 初始化窗口大小
 */
/**
 * @description: 函数防抖
 * @param {type}
 */
const debounce = function (fn, delay) {
  // 维护一个 timer
  let timer = null
  return function () {
    // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
const setStyle = function () {
  //  页面可视区域高度
  const clientHeight = document.documentElement.clientHeight
  // 页面可视区域宽度
  const clientWidth = document.documentElement.clientWidth
  // 宽高比
  const aspectRatio = 9 / 16

  let width = ''
  if (clientWidth >= clientHeight * aspectRatio) {
    width = clientHeight * aspectRatio + 'px'
  } else {
    width = '100%'
  }

  document.body.style.height = clientHeight + 'px'
  document.body.style.width = width
}

export {
  debounce,
  setStyle
}
