import Common from './Common'
import Yue from '../acotr/game1/Yue'
import Yun from '../acotr/game1/Yun'
import Bear from '../acotr/game1/Bear'

export default class Game1 extends Common {
  constructor () {
    super()
    this.index = 0
    // 题目的位置
    this.optionPos = 1
    this.choiced = false
  }

  // 进场
  enter (subject, that) {
    // 关键
    this.that = that
    const group = new this.$group('game1')
    // 云
    const yun = Yun.getInstance().enter()
    group.append(yun)
    // 月亮
    const yue = Yue.getInstance().enter()
    group.append(yue)
    // 题目
    const subjectGroup = this.initSubject(subject[ this.index ])
    group.append(subjectGroup)
    this.group = group
    this._initGroupAnimte()
    this.that.game.append(group)
  }

  // 处理事件
  dealEvent (index, type) {
    if (type === 'direction') {
      this._out()
      this.that.goto(index)
      return
    }
    if (this.choiced === index) {
      return
    }
    if (type === 'option') {
      this.choiced = index
      switch (index) {
        case 0:
          Yue.getInstance().min()
          const bear = Bear.getInstance().healthSleepEnter()
          this.bear = bear
          this.that.game.append(bear)
          break
      }
    }
  }

  _initGroupAnimte (type = 'enter') {
    if (type === 'enter') {
      this.group.attr({
        translate: [ this.clientWidth, 0 ]
      })
      this.group.animate([
        {
          translate: [ 0, 0 ]
        }
      ], {
        duration: 300,
        fill: 'forwards'
      })
    } else {
      this.group.animate([
        {
          translate: [ -this.clientWidth, 0 ]
        }
      ], {
        duration: 300,
        fill: 'forwards'
      })
    }
  }

  // 退场动画
  _out () {
    if (this.bear) {
      Bear.getInstance().healthSleepOut()
    }
    this._initGroupAnimte('out')
  }

  // 统一销毁元素
  _destorySprite () {

  }

  static getInstance () {
    if (!Game1.instance) {
      Game1.instance = new Game1()
    }
    return Game1.instance
  }
}
