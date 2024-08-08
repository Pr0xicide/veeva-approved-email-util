const { FILE_TYPES } = require('./types')
const {
  CATEGORY_TYPES,
  determineTokenCategory,
} = require('../../tokens/category')
const { getVeevaTokens } = require('../../tokens/retrieve')
const {
  logInvalidTokenCategories,
  logDuplicateTokens,
  logUnsupportedTokens,
} = require('./logging')

const SUPPORTED_TOKEN_CATEGORIES = [
  CATEGORY_TYPES.CONTENT,
  CATEGORY_TYPES.CONSENT,
  CATEGORY_TYPES.CITATION,
  CATEGORY_TYPES.FOOTNOTE,
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
const UNSUPPORTED_TOKENS = [
  '{{FootnoteSymbol',
  '{{CitationNumber',
  '{{CitationSummaryStart}}',
  '{{CitationSummaryEnd}}',
]

const fileType = FILE_TYPES.EMAIL_TEMPLATE

/**
 * Lints Veeva tokens found in email template files.
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

  logDuplicateTokens({
    fileType,
    veevaTokens,
    uniqueTokenCategoryList: UNIQUE_TOKEN_CATEGORIES,
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
