const { GRADE } = require('../../linting/grading')
const {
  CATEGORY_TYPES,
  getTokenCategorySummary,
} = require('../../tokens/category')
const { DuplicateMessage } = require('../message')

const UNIQUE_TOKEN_CATEGORIES = [
  CATEGORY_TYPES.EMAIL_FRAGMENT,
  CATEGORY_TYPES.TEMPLATE_FRAGMENT,
]

/**
 * Lints Veeva tokens found in email template files.
 *
 * @param {Array<{line:number, category:CATEGORY_TYPES, token:String}>} veevaTokens array of Veeva tokens found in the source code
 * @returns {Array<Message>} array of objects warnings/errors info about each token
 */
const lint = (veevaTokens) => {
  const logs = []

  // Check for unique tokens that should only appear once in email templates.
  const categorySummary = getTokenCategorySummary(veevaTokens)
  for (let i = 0; i < UNIQUE_TOKEN_CATEGORIES.length; i++) {
    // Correct number of tokens per category, exit.
    if (categorySummary[UNIQUE_TOKEN_CATEGORIES[i]] < 2) break

    // The number of times the token appears.
    const tokenCount = veevaTokens.filter(
      (veevaToken) => veevaToken.category === UNIQUE_TOKEN_CATEGORIES[i]
    ).length

    // Log message.
    logs.push(
      new DuplicateMessage({
        grade: GRADE.ERROR,
        message: `Can only have only one ${UNIQUE_TOKEN_CATEGORIES[i]} token in email templates but found ${tokenCount}`,
      })
    )
  }

  return logs
}

module.exports = {
  lint,
}
