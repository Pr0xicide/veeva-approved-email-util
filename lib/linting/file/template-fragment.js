const { GRADE } = require('../../linting/grading')
const { CATEGORY_TYPES } = require('../../tokens/category')

const validTokenCategories = [CATEGORY_TYPES.CONTENT]

const invalidTokens = [
  '{{addToCalendar}}',
  '{{EventSession}}',
  '{{EventSpeaker}}',
  '{{requiresReview}}',
  // "{{insertEngageAndZoomJoinURL[Language Code]}}", // Functionality
  // "{{insertZoomDialInNumbers[Language Code]}}", // Functionality
]

/**
 * Validates tokens found in the template fragment.
 * @param {Array<object>} tokens array of Veeva tokens found in the source code
 * @returns {Array<object>} array of reported warnings/errors found
 */
const lint = (tokens) => {
  const logs = []

  for (let i = 0; i < tokens.length; i++) {
    const { category, token, line } = tokens[i]

    if (!validTokenCategories.includes(category)) {
      logs.push({
        grade: GRADE.ERROR,
        line,
        token,
        message: `Token "${token}" is not supported in template fragments`,
      })
    }
  }

  return logs
}

module.exports = {
  lint,
}
