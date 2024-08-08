const {
  CATEGORY_TYPES,
  determineTokenCategory,
} = require('../../tokens/category')
const { getVeevaTokens } = require('../../tokens/retrieve')
const { logInvalidTokenCategories, logUnsupportedTokens } = require('./logging')
const { FILE_TYPES } = require('./types')

const SUPPORTED_TOKEN_CATEGORIES = [
  CATEGORY_TYPES.CONTENT,
  CATEGORY_TYPES.FUNCTIONALITY,
]
const UNSUPPORTED_TOKENS = [
  '{{addToCalendar',
  '{{EventSession',
  '{{EventSpeaker',
  '{{requiresReview',
  '{{insertEngageAndZoomJoinURL',
  '{{insertZoomDialInNumbers',
]
const fileType = FILE_TYPES.TEMPLATE_FRAGMENT

/**
 * Lints Veeva tokens found in template fragment files.
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
