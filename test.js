const test = require('tape')
const InvertedPromise = require('.')

test('resolve', function (assert) {
  assert.plan(1)
  const p = new InvertedPromise()

  p.then(value => {
    assert.ok(value === 'ok')
  }).catch(err => {
    assert.error(err)
  })

  p.resolve('ok')
})

test('resolve', function (assert) {
  assert.plan(1)
  const p = new InvertedPromise()

  p.then(value => {
    assert.error(new Error())
  }).catch(err => {
    assert.ok(err === 'ok')
  })

  p.reject('ok')
})

test('resolve twice', function (assert) {
  assert.plan(1)
  const p = new InvertedPromise()

  p.then(value => {
    assert.ok(value === 'ok')
  }).catch(err => {
    assert.error(err)
  })

  p.resolve('ok')
  p.resolve('ok2')
})

test('resolve then reject', function (assert) {
  assert.plan(1)
  const p = new InvertedPromise()

  p.then(value => {
    assert.ok(value === 'ok')
  }).catch(err => {
    assert.error(err)
  })

  p.resolve('ok')
  p.reject('ok')
})

test('resolve in resolver', function (assert) {
  assert.plan(1)
  const p = new InvertedPromise((resolve) => {
    resolve(123)
  })

  p.then(value => {
    assert.ok(value === 123)
  }).catch(err => {
    assert.error(err)
  })

  p.resolve(456)
})

test('reject in resolver', function (assert) {
  assert.plan(1)
  const p = new InvertedPromise((resolve, reject) => {
    reject(new Error('oops'))
  })

  p.then(value => {
    // unreachable
    assert.notOk(value)
  }).catch(err => {
    assert.ok(err && err.message === 'oops')
  })

  p.reject(new Error('ouch'))
})
