const { FILE_TYPES } = require('./types')
const { CATEGORY_TYPES } = require('../../tokens/category')
const { logInvalidTokenCategories, logDuplicateTokens } = require('./logging')

const VALID_TOKEN_CATEGORIES = [
  CATEGORY_TYPES.CONTENT,
  CATEGORY_TYPES.CONSENT,
  CATEGORY_TYPES.FUNCTIONALITY,
  CATEGORY_TYPES.USER_INPUT,
  CATEGORY_TYPES.EMAIL_FRAGMENT,
  CATEGORY_TYPES.TEMPLATE_FRAGMENT,
  CATEGORY_TYPES.SIGNATURE,
  CATEGORY_TYPES.UNSUBSCRIBE,
  CATEGORY_TYPES.VAULT,
]
const UNIQUE_TOKEN_CATEGORIES = [
  CATEGORY_TYPES.EMAIL_FRAGMENT,
  CATEGORY_TYPES.TEMPLATE_FRAGMENT,
]
const fileType = FILE_TYPES.EMAIL_TEMPLATE

/**
 * Lints Veeva tokens found in email template files.
 *
 * @param {Array<{line:number, category:CATEGORY_TYPES, token:String}>} veevaTokens array of Veeva tokens found in the source code
 * @returns {Array<{DuplicateTokenMessage}>} array of DuplicateTokenMessage logs to output
 */
const lint = (veevaTokens) => {
  const logs = []

  logInvalidTokenCategories({
    fileType,
    veevaTokens,
    validTokensList: VALID_TOKEN_CATEGORIES,
    logArray: logs,
  })

  logDuplicateTokens({
    fileType,
    veevaTokens,
    uniqueTokenCategoryList: UNIQUE_TOKEN_CATEGORIES,
    logArray: logs,
  })

  return logs
}

module.exports = {
  lint,
}
