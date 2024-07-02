const { GRADE } = require('../../linting/grading')
const { CATEGORY_TYPES } = require('../../tokens/category')

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

const containsInvalidCategory = (category) => {
  return !VALID_TOKEN_CATEGORIES.includes(category)
}

const containsInvalidTokens = (token) => {
  let isInvalid = false

  for (let i = 0; i < INVALID_TOKENS.length; i++) {
    if (token.indexOf(INVALID_TOKENS[i]) >= 0) {
      isInvalid = true
      break
    }
  }

  return isInvalid
}

/**
 * Validates Veeva tokens found in the email fragment HTML file.
 *
 * @param {Array<{line:number, category:CATEGORY_TYPES, token:String}>} tokens array of Veeva tokens found in the source code
 * @returns {Array<{line:number, grade:GRADE, token:String, message:String}>} array of objects warnings/errors info about each token
 */
const lint = (tokens) => {
  const logs = []

  for (let i = 0; i < tokens.length; i++) {
    const { category, token, line } = tokens[i]

    // Determine if token category is supported in email fragments.
    if (containsInvalidCategory(category)) {
      logs.push({
        grade: GRADE.ERROR,
        line,
        token,
        message: `Veeva ${category} tokens are not supported in email fragments`,
      })
    }

    // Determine if token is supported in email fragments.
    else if (containsInvalidTokens(token)) {
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
