const { GRADE } = require('../../linting/grading')
const {
  CATEGORY_TYPES,
  getTokenCategorySummary,
} = require('../../tokens/category')

const UNIQUE_TOKEN_CATEGORIES = [
  CATEGORY_TYPES.EMAIL_FRAGMENT,
  CATEGORY_TYPES.TEMPLATE_FRAGMENT,
]

/**
 * Lints Veeva tokens found in email template files.
 *
 * @param {Array<{line:number, category:CATEGORY_TYPES, token:String}>} veevaTokens array of Veeva tokens found in the source code
 * @returns {Array<{line:number, grade:GRADE, token:String, message:String}>} array of objects warnings/errors info about each token
 */
const lint = (veevaTokens) => {
  const logs = []

  // Check for unique tokens that should only appear once in email templates.
  const categorySummary = getTokenCategorySummary(veevaTokens)
  for (let i = 0; i < UNIQUE_TOKEN_CATEGORIES.length; i++) {
    // Correct number of tokens per unique category, exit.
    if (categorySummary[UNIQUE_TOKEN_CATEGORIES[i]] < 2) break

    // Log messages.
    const categoryTokens = veevaTokens.filter(
      (veevaToken) => veevaToken.category === UNIQUE_TOKEN_CATEGORIES[i]
    )
    categoryTokens.forEach((categoryToken) => {
      const { category, line, token } = categoryToken
      logs.push({
        grade: GRADE.ERROR,
        line,
        token,
        message: `Can only have only one ${category} token in email templates`,
      })
    })
  }

  return logs
}

module.exports = {
  lint,
}
