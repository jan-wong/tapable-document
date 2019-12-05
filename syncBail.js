/**
 * 同步熔断事件钩子: 按照事件钩子函数注册的顺序往下执行下去，但是其中一个钩子函数返回非undefined，则在此处中断执行
 */

const { SyncBailHook } = require('tapable')

class Work {
  constructor() {
    this.hooks = {
      plan: new SyncBailHook(['plan']),
      working: new SyncBailHook(['working']),
      complete: new SyncBailHook(['complete'])
    }
  }

  tap() {
    this.hooks.plan.tap('planTs', () => {
      console.log('plan typescript')
      return null
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