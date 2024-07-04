const { GRADE } = require('../../linting/grading')
const { CATEGORY_TYPES } = require('../../tokens/category')
const { TokenMessage } = require('../message')
const { isCategorySupported, isTokenSupported } = require('./contains')

const VALID_TOKEN_CATEGORIES = [
  CATEGORY_TYPES.CONTENT,
  CATEGORY_TYPES.FUNCTIONALITY,
]
const INVALID_TOKENS = [
  '{{addToCalendar',
  '{{EventSession',
  '{{EventSpeaker',
  '{{requiresReview',
  '{{insertEngageAndZoomJoinURL',
  '{{insertZoomDialInNumbers',
]

/**
 * Lints Veeva tokens found in template fragment files.
 *
 * @param {Array<{line:number, category:CATEGORY_TYPES, token:String}>} veevaTokens array of Veeva tokens found in the source code
 * @returns {Array<{TokenMessage}>} array of TokenMessage logs to output
 */
const lint = (veevaTokens) => {
  const logs = []

  for (let i = 0; i < veevaTokens.length; i++) {
    const { category, token, line } = veevaTokens[i]

    // Category is not supported in template fragments.
    if (!isCategorySupported(category, VALID_TOKEN_CATEGORIES)) {
      logs.push(
        new TokenMessage({
          grade: GRADE.ERROR,
          line,
          token,
          message: `Veeva ${category} tokens are not supported in template fragments`,
        })
      )
    }

    // Veeva token is not supported in template fragments.
    else if (!isTokenSupported(token, INVALID_TOKENS)) {
      logs.push(
        new TokenMessage({
          grade: GRADE.ERROR,
          line,
          token,
          message: `Token "${token}" is not supported in template fragments`,
        })
      )
    }
  }

  return logs
}

module.exports = {
  lint,
}
