const {
  CATEGORY_TYPES,
  getTokenCategorySummary,
  determineTokenCategory,
} = require('../../tokens/category')
const { getVeevaTokens } = require('../../tokens/retrieve')
const { logInvalidTokenCategories, logUnsupportedTokens } = require('./logging')
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
 * @param {String} sourceCode source code of the HTML file to lint
 * @returns {Array<{TokenMessage}>} array of TokenMessages to output
 */
const lint = (sourceCode) => {
  const logs = []

  const veevaTokens = getVeevaTokens(sourceCode)
  determineTokenCategory(veevaTokens)

  logInvalidTokenCategories({
    fileType,
    veevaTokens,
    supportedCategories: SUPPORTED_TOKEN_CATEGORIES,
    logArray: logs,
  })

  logUnsupportedTokens({
    fileType,
    veevaTokens,
    unsupportedTokens: UNSUPPORTED_TOKENS,
    logArray: logs,
  })

  return logs
}

module.exports = {
  lint,
}
