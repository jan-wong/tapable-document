/**
 * 异步串行熔断事件钩子: 注册的钩子函数按照注册的顺序依次往下执行，但是当钩子函数内部调用的callback传入非undefined参数时，
 * 执行将直接进入回调函数并中断之后注册的钩子函数
 */

const { AsyncSeriesBailHook } = require('tapable')

class Work {
  constructor() {
    this.hooks = {
      plan: new AsyncSeriesBailHook(['arg1']),
      working: new AsyncSeriesBailHook(['arg1']),
      complete: new AsyncSeriesBailHook(['arg1'])
    }
  }

  tap() {
    this.hooks.plan.tapAsync('planTs', (arg1, callback) => {
      setTimeout(() => {
        console.log('plan typescript')
        console.log(arg1)
        callback('ts param')
      }, 2000)
    })

    this.hooks.plan.tapAsync('planDesignPattern', (arg1, callback) => {
      setTimeout(() => {
        console.log('plan design pattern')
        console.log(arg1)
        callback('dp param')
      }, 1000)
    })

    return this
  }

  run() {
    this.hooks.plan.callAsync('arg1', (param1) => {
      console.log('plan callback')
      console.log(param1)
    })
  }
}

(new Work()).tap().run()