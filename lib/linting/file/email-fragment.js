const { GRADE } = require('../../linting/grading')
const { CATEGORY_TYPES } = require('../../tokens/category')
const { isCategorySupported, isTokenSupported } = require('./contains')

const VALID_TOKEN_CATEGORIES = [
  CATEGORY_TYPES.CONTENT,
  CATEGORY_TYPES.FUNCTIONALITY,
  CATEGORY_TYPES.VAULT,
  CATEGORY_TYPES.UNSUBSCRIBE,
]
const INVALID_TOKENS = [
  '{{EventSession',
  '{{EventSpeaker',
  '{{requiresReview',
  '{{insertEngageAndZoomJoinURL',
  '{{insertZoomDialInNumbers',
]

/**
 * Lints Veeva tokens found in email fragment files.
 *
 * @param {Array<{line:number, category:CATEGORY_TYPES, token:String}>} veevaTokens array of Veeva tokens found in the source code
 * @returns {Array<{line:number, grade:GRADE, token:String, message:String}>} array of objects warnings/errors info about each token
 */
const lint = (veevaTokens) => {
  const logs = []

  for (let i = 0; i < veevaTokens.length; i++) {
    const { category, token, line } = veevaTokens[i]

    // Category is not supported in email fragments.
    if (!isCategorySupported(category, VALID_TOKEN_CATEGORIES)) {
      logs.push({
        grade: GRADE.ERROR,
        line,
        token,
        message: `Veeva ${category} tokens are not supported in email fragments`,
      })
    }

    // Veeva token is not supported in email fragments.
    else if (!isTokenSupported(token, INVALID_TOKENS)) {
      logs.push({
        grade: GRADE.ERROR,
        line,
        token,
        message: `Token "${token}" is not supported in email fragments`,
      })
    }
  }

  return logs
}

module.exports = {
  lint,
}
