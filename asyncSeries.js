/**
 * 异步串行事件钩子: 按照事件钩子注册顺序依次执行，执行完所有事件钩子函数进行回调
 */

const { AsyncSeriesHook } = require('tapable')

class Work {
  constructor() {
    this.hooks = {
      plan: new AsyncSeriesHook(),
    }
  }

  tap() {
    console.time('series')
    this.hooks.plan.tapAsync('planTs', callback => {
      setTimeout(() => {
        console.log('plan typescript')
        callback()
      }, 2000);
    })

    this.hooks.plan.tapAsync('planDesignPattern', callback => {
      setTimeout(() => {
        console.log('plan desing pattern')
        callback()
      }, 1000);
    })

    return this
  }

  run() {
    this.hooks.plan.callAsync(() => {
      console.timeEnd('series')
      console.log('implement callback')
    })
  }
}

(new Work()).tap().run()