const { GRADE } = require('../../linting/grading')
const { CATEGORY_TYPES } = require('../../tokens/category')

const validTokenCategories = [
  CATEGORY_TYPES.CONTENT,
  CATEGORY_TYPES.FUNCTIONALITY,
  CATEGORY_TYPES.VAULT,
  CATEGORY_TYPES.UNSUBSCRIBE,
]

const invalidTokens = [
  '{{EventSession}}',
  '{{EventSpeaker}}',
  '{{requiresReview}}',
  // "{{insertEngageAndZoomJoinURL[Language Code]}}",
  // "{{insertZoomDialInNumbers[Language Code]}}",
]

const containsInvalidCategory = (category) => {
  return !validTokenCategories.includes(category)
}

const containsInvalidTokens = (token) => {
  return invalidTokens.includes(token)
}

/**
 * Validates Veeva tokens found in the email fragment HTML file.
 *
 * @param {Array<{line:number, category:CATEGORY_TYPES, token:String}>} tokens array of Veeva tokens found in the source code
 * @returns {Array<{line:number, grade:GRADE, token:String, message:String}>} array of objects containing info about each token
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
