/**
 * 同步循环事件钩子: 按照事件钩子函数注册的顺序往下执行，遇到未返回undefined的钩子函数，则重复执行此钩子函数
 */

const { SyncLoopHook } = require('tapable')

class Work {
  constructor() {
    this.hooks = {
      plan: new SyncLoopHook(['plan']),
      working: new SyncLoopHook(['working']),
      complete: new SyncLoopHook(['complete'])
    }

    this.count = 0
  }

  tap() {
    this.hooks.plan.tap('planTs', () => {
      console.log('plan typescript' + this.count++)
      if (this.count < 10) {
        return 'hello'
      } else {
        return undefined
      }
    })

    this.hooks.plan.tap('planDesignPattern', () => {
      console.log('plan design pattern')
    })

    return this
  }

  run() {
    this.hooks.plan.call()
  }
}

(new Work()).tap().run()