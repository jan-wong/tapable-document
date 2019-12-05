/**
 * 基本的同步sync事件钩子：按照注册事件的顺序往下执行
 */
const { SyncHook } = require('tapable')

class Work {
  constructor() {
    this.hooks = {
      plan: new SyncHook(),
      working: new SyncHook(),
      complete: new SyncHook()
    }
  }

  tap() {
    this.hooks.plan.tap('planTs', () => {
      console.log('plan typescript')
    })

    this.hooks.plan.tap('planDesignPattern', () => {
      console.log('plan design pattern')
    })

    this.hooks.working.tap('workTs', () => {
      console.log('work typescript')
    })

    this.hooks.working.tap('workDesignPattern', () => {
      console.log('work desing pattern')
    })

    this.hooks.complete.tap('completeTs', () => {
      console.log('complete typescript')
    })

    this.hooks.complete.tap('completeDesignPattern', () => {
      console.log('complete design pattern')
    })

    return this
  }

  run() {
    this.hooks.plan.call()
    this.hooks.working.call()
    this.hooks.complete.call()
  }
}

(new Work()).tap().run()