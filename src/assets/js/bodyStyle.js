/* 初始化窗口大小 */
//  页面可视区域高度
const clientHeight = document.documentElement.clientHeight
// 页面可视区域宽度
const clientWidth = document.documentElement.clientWidth
document.body.style.height = clientHeight + 'px'
// 宽高比
const aspectRatio = 9 / 16

let width = ''
if (clientWidth >= clientHeight * aspectRatio) {
  width = clientHeight * aspectRatio + 'px'
} else {
  width = '100%'
}
document.body.style.width = width
