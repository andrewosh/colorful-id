const async = require('async')
const WordPos = require('wordpos')

function isValidWord (word) {
  return (!/[.,\d'\-_()[\]{}*&^%$#@!]/.test(word)) &&
         (word.length < 9) &&
         (word.length > 5)
}

function getValidWord (opts, searchFunc) {
  return function (next) {
    async.doUntil(function (cb) {
      searchFunc(opts, function (words) {
        return cb(null, words)
      })
    }, function (words) {
      return words.every(isValidWord)
    }, next)
  }
}

/**
 * Generates a random identifier out of a noun and an optional number of adjectives.

 * @param {object} opts - options dictionary
 * @callback cb - callback(id)
 */
module.exports = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  const numAdjectives = opts.numAdjectives || 2
  const wordpos = new WordPos()
  async.parallel([
    getValidWord({count: 1}, wordpos.randNoun.bind(wordpos)),
    getValidWord({count: numAdjectives}, wordpos.randAdjective.bind(wordpos))
  ], function (_, results) {
    const noun = results[0]
    const adjectives = results[1]
    return cb(adjectives.concat(noun).join('-'))
  })
}
