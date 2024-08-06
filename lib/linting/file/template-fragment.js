const { CATEGORY_TYPES } = require('../../tokens/category')
const { logInvalidTokenCategories, logUnsupportedTokens } = require('./logging')
const { FILE_TYPES } = require('./types')

const VALID_TOKEN_CATEGORIES = [
  CATEGORY_TYPES.CONTENT,
  CATEGORY_TYPES.FUNCTIONALITY,
]
const INVALID_TOKENS = [
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
 * @param {Array<{line:number, category:CATEGORY_TYPES, token:String}>} veevaTokens array of Veeva tokens found in the source code
 * @returns {Array<{InvalidTokenMessage}>} array of InvalidTokenMessage logs to output
 */
const lint = (veevaTokens) => {
  const logs = []

  logInvalidTokenCategories({
    fileType,
    veevaTokens,
    validTokensList: VALID_TOKEN_CATEGORIES,
    logArray: logs,
  })

  logUnsupportedTokens({
    fileType,
    veevaTokens,
    invalidTokensList: INVALID_TOKENS,
    logArray: logs,
  })

  return logs
}

module.exports = {
  lint,
}
