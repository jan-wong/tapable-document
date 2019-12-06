/**
 * 异步并行熔断钩子事件: 似乎有bug
 */

const { AsyncParallelBailHook } = require('tapable')

class Work {
  constructor() {
    this.hooks = {
      plan: new AsyncParallelBailHook(['arg1']),
      working: new AsyncParallelBailHook(['arg1']),
      complete: new AsyncParallelBailHook(['arg1'])
    }
  }

  tap() {
    this.hooks.plan.tapAsync('planTs', (arg1, callback) => {
      setTimeout(() => {
        console.log('plan typescript')
        console.log(arg1)
        callback('typescript param')
      }, 2000);

      // return 22
    })

    this.hooks.plan.tapAsync('planDesignPattern', (arg1, callback) => {
      setTimeout(() => {
        console.log('plan design pattern')
        console.log(arg1)
        callback('desing pattern param')
      }, 1000);

      // return 22
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

(new Work).tap().run()