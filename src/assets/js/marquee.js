export default class Marquee {
  constructor (el, direction) {
    this.container = el
    this.speed = direction === 'left' ? -2 : 2

    this.cancel = false

    this.container.style.transform = 'translate3d(0, 0, 0)'
    this.cloneItems()

    this.initEvents()

    this.play()
  }

  cloneItems () {
    const { clientWidth } = this.container.parentNode

    const childrensDom = [...this.container.children]

    const childrenStyle = getComputedStyle(childrensDom[0])
    const itemWidth = parseFloat(childrenStyle.width) + parseFloat(childrenStyle['margin-right'])

    const fitInNumber = Math.ceil(clientWidth / itemWidth)

    this.container.querySelectorAll('.clone').forEach(clone => this.container.removeChild(clone))

    let totalClones = 0

    while ((totalClones / fitInNumber) < 1) {
      childrensDom.forEach((target, index) => {
        if (index < fitInNumber) {
          // 深度克隆: 克隆节点以及所有子节点
          const clone = target.cloneNode(true)
          clone.classList.add('clone')
          this.container.appendChild(clone)
          ++totalClones
        }
      })
    }

    this.clonesWidth = totalClones * itemWidth

    this.containerWidth = parseFloat(getComputedStyle(this.container).width)
  }

  initEvents () {
    window.addEventListener('resize', () => this.resize())
  }

  resize () {
    this.cloneItems()
    this.play()
  }

  getCurrentTranslateX () {
    const transformStr = getComputedStyle(this.container).transform
    return parseFloat(transformStr.substring(6).split(',')[4])
  }

  moveMax () {
    let isMax = false
    if (this.getCurrentTranslateX() <= this.clonesWidth - this.containerWidth) {
      this.container.style.transform = 'translate3d(0, 0, 0)'
      isMax = true
    }

    if (this.getCurrentTranslateX() > 0) {
      this.container.style.transform = `translate3d(${this.clonesWidth - this.containerWidth}px, 0, 0)`
      isMax = true
    }
    return Promise.resolve(isMax)
  }

  render () {
    cancelAnimationFrame(this.cancelId)

    this.moveMax()

    this.container.style.transform = `translate3d(${this.getCurrentTranslateX() + this.speed}px, 0, 0)`

    if (!this.cancel) {
      this.cancelId = requestAnimationFrame(() => this.render())
    }
  }

  play () {
    // console.log('play')
    this.cancel = false
    this.render()
  }

  stop () {
    // console.log('stop')
    cancelAnimationFrame(this.cancelId)
    this.cancel = true
  }
}
