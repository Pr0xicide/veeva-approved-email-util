const {
  CATEGORY_TYPES,
  getTokenCategorySummary,
  determineTokenCategory,
} = require('../../tokens/category')
const { getVeevaTokens } = require('../../tokens/retrieve')
const {
  flagUnsupportedTokenCategories,
  flagUnsupportedTokens,
  flagVeevaTokens,
} = require('./flag')
const { FILE_TYPES } = require('./types')

const SUPPORTED_TOKEN_CATEGORIES = [
  CATEGORY_TYPES.CONTENT,
  CATEGORY_TYPES.CITATION,
  CATEGORY_TYPES.FOOTNOTE,
  CATEGORY_TYPES.FUNCTIONALITY,
  CATEGORY_TYPES.VAULT,
  CATEGORY_TYPES.UNSUBSCRIBE,
]
const UNSUPPORTED_TOKENS = [
  '{{EventSession',
  '{{EventSpeaker',
  '{{requiresReview',
  '{{insertEngageAndZoomJoinURL',
  '{{insertZoomDialInNumbers',
]
const fileType = FILE_TYPES.EMAIL_FRAGMENT

/**
 * Lints Veeva tokens found in email fragment files.
 *
 * @param {String} sourceCode HTML source code to read from fs.readFile
 * @returns {Array<{TokenMessage}>} array of TokenMessages to output
 */
const lint = (sourceCode) => {
  const logs = []

  const veevaTokens = getVeevaTokens(sourceCode)
  determineTokenCategory(veevaTokens)

  flagUnsupportedTokenCategories({
    fileType,
    veevaTokens,
    supportedCategories: SUPPORTED_TOKEN_CATEGORIES,
    logArray: logs,
  })

  flagUnsupportedTokens({
    fileType,
    veevaTokens,
    unsupportedTokens: UNSUPPORTED_TOKENS,
    logArray: logs,
  })

  flagVeevaTokens(veevaTokens, logs)

  return logs
}

module.exports = {
  lint,
}
