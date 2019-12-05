/**
 * 异步并行事件钩子: 所有注册的时间钩子函数同时调用，调用完所有的事件钩子函数后，执行回调
 */

const { AsyncParallelHook } = require('tapable')

// tap | tapAsync | callAsync
class Work {
  constructor() {
    this.hooks = {
      plan: new AsyncParallelHook(['book', 'website']),
      working: new AsyncParallelHook(['working']),
      complete: new AsyncParallelHook(['complete'])
    }
  }

  tap() {
    this.hooks.plan.tap('planTs', (book, website) => {
      console.log('plan typescript')
      console.log(book, website)
    })

    this.hooks.plan.tapAsync('planDesignPattern', (book, website, callback) => {
      console.log('plan design pattern')
      console.log(book, website)
      callback('hello callAsync')
    })

    return this
  }

  run() {
    this.hooks.plan.callAsync('ts', 'mac', info => {
      console.log(info)
    })
  }
}

(new Work()).tap().run()

console.log('=====================================')

// 异步并行钩子
class Work1 {
  constructor() {
    this.hooks = {
      plan: new AsyncParallelHook(),
    }
  }

  tap() {
    console.time('parallel')
    this.hooks.plan.tapAsync('planTs', (callback) => {
      setTimeout(() => {
        console.log('plan typescript')
        callback()
      }, 2000);
    })

    this.hooks.plan.tapAsync('planDesignPattern', callback => {
      setTimeout(() => {
        console.log('plan design pattern')
        callback()
      }, 1000);
    })

    return this
  }

  run() {
    this.hooks.plan.callAsync(() => {
      console.log('implement callback')
      console.timeEnd('parallel')
    })
  }
}

(new Work1()).tap().run()