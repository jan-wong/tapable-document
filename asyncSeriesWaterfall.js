/**
 * 异步串行瀑布流事件钩子： 跟熔断性未发现区别
 */

const { AsyncSeriesWaterfallHook } = require('tapable')

class Work {
  constructor() {
    this.hooks = {
      plan: new AsyncSeriesWaterfallHook(['arg1']),
      working: new AsyncSeriesWaterfallHook(['arg1']),
      complete: new AsyncSeriesWaterfallHook(['arg1'])
    }
  }

  tap() {
    this.hooks.plan.tapAsync('planTs', (arg1, callback) => {
      setTimeout(() => {
        console.log('plan ts')
        console.log(arg1)
        callback()
      }, 2000)
    })

    this.hooks.plan.tapAsync('planDp', (arg1, callback) => {
      setTimeout(() => {
        console.log('plan dp')
        console.log(arg1)
        callback('dp param')
      }, 1000)
    })

    return this
  }

  run() {
    this.hooks.plan.callAsync('arg1', (param) => {
      console.log('plan callback')
      console.log(param)
    })
  }
}

(new Work()).tap().run()