/**
 * @author jokerfrankz@outlook.com
 * @description 进度条
 * @class ProgressBar
 * @constructor
 * @param {Object} config
 * @example {speed[100]速度,curve[1]速度曲线,textEl[h4]数字DOM元素,barEl[.bar]进度条DOM元素callback回调函数有hide api}
 */
class ProgressBar {
  'use strict'
  constructor(config) {
    this.config = {
      speed: 100, //速度
      curve: 1, // 速度曲线 数组越大越快，小则相反
      textEl: 'h4', // 数字DOM元素
      barEl: '.bar', // 进度条DOM元素
      callback: null, // 回调函数
      ...config,
    }
    this.speed = this.config.speed
    this.callback = this.config.callback || function () {}
    this.bar = document.querySelector(this.config.barEl)
    this.num = document.querySelector(this.config.textEl)
    this.curve = this.config.curve
    this.i = 0
  }
  // 因为需要使用this，所以用箭头函数
  loading = () => {
    let id = setTimeout(this.loading, this.speed)
    this.bar.style.width = ++this.i + '%'
    this.num.innerHTML = this.i + '%'
    this.num.style.left = this.i + '%'
    this.num.style.filter = `hue-rotate(${this.i * 3.6}deg)`
    this.bar.style.filter = `hue-rotate(${this.i * 3.6}deg)`
    if (this.i >= 100) {
      clearTimeout(id)
      // 回调函数中有一个隐藏进度条的接口hide
      this.callback(this.hide)
    }
    // 速度曲线
    this.speed /= this.curve
  }
  // 因为需要使用this，所以用箭头函数
  hide = () => {
    this.bar.parentElement.style.display = 'none'
    this.bar.style.display = 'none'
    this.num.style.display = 'none'
  }
  run() {
    this.loading()
  }
}
new ProgressBar({
  speed: 100,
  curve: 1.01,
}).run()
