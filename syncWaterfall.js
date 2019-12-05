/**
 * 同步瀑布流事件钩子: 按照注册事件钩子函数的顺序往下执行，但是上一个事件钩子函数的返回值作为参数传递给下一个事件钩子函数
 */

const { SyncWaterfallHook } = require('tapable')

class Work {
  constructor() {
    this.hooks = {
      plan: new SyncWaterfallHook(['plan']),
      working: new SyncWaterfallHook(['working']),
      complete: new SyncWaterfallHook(['complete'])
    }
  }

  tap() {
    this.hooks.plan.tap('planTs', args => {
      console.log('plan typescript')
      console.log(args)
      return 'return plan typescript'
    })

    this.hooks.plan.tap('planDesignPattern', args => {
      console.log('plan design pattern')
      console.log(args)
      return 'return plan design pattern'
    })

    return this
  }

  run() {
    this.hooks.plan.call()
  }
}

(new Work).tap().run()