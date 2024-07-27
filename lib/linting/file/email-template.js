const { GRADE } = require('../../linting/grading')
const {
  CATEGORY_TYPES,
  getTokenCategorySummary,
} = require('../../tokens/category')
const { DuplicateTokenMessage } = require('../message')

const UNIQUE_TOKEN_CATEGORIES = [
  CATEGORY_TYPES.EMAIL_FRAGMENT,
  CATEGORY_TYPES.TEMPLATE_FRAGMENT,
]

/**
 * Lints Veeva tokens found in email template files.
 *
 * @param {Array<{line:number, category:CATEGORY_TYPES, token:String}>} veevaTokens array of Veeva tokens found in the source code
 * @returns {Array<{DuplicateTokenMessage}>} array of DuplicateTokenMessage logs to output
 */
const lint = (veevaTokens) => {
  const logs = []

  // Check for unique tokens that should only appear once in email templates.
  const categorySummary = getTokenCategorySummary(veevaTokens)

  for (let i = 0; i < UNIQUE_TOKEN_CATEGORIES.length; i++) {
    // Correct number of tokens per category, exit.
    if (categorySummary[UNIQUE_TOKEN_CATEGORIES[i]] < 2) break

    // List of duplicate tokens found in the email template.
    const duplicateTokenList = veevaTokens.filter(
      (veevaToken) => veevaToken.category === UNIQUE_TOKEN_CATEGORIES[i]
    )

    // Generate new error msg.
    const errorMsg = new DuplicateTokenMessage({
      category: UNIQUE_TOKEN_CATEGORIES[i],
      duplicateTokens: duplicateTokenList,
    })

    // Log message.
    logs.push(errorMsg)
  }

  return logs
}

module.exports = {
  lint,
}
