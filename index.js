module.exports = function InvertedPromise (resolver) {
  var res
  var rej

  var p = new Promise((resolve, reject) => {
    res = resolve
    rej = reject

    if (typeof resolver === 'function') {
      resolver(resolve, reject)
    }
  })

  p.resolve = res
  p.reject = rej

  return p
}
