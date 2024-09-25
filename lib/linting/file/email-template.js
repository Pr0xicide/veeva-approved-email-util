const { FILE_TYPES } = require('./types')
const {
  CATEGORY_TYPES,
  determineTokenCategory,
} = require('../../tokens/category')
const { getVeevaTokens } = require('../../tokens/retrieve')
const {
  flagUnsupportedTokenCategories,
  flagDuplicateTokens,
  flagDuplicateCategories,
  flagUnsupportedTokens,
  flagVeevaTokens,
} = require('./flag')

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
const UNIQUE_TOKENS = [
  '{{InsertFootnotes}}',
  '{{InsertCitations}}',
  '{{InsertCitationSummaries}}',
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

  flagDuplicateCategories({
    fileType,
    veevaTokens,
    uniqueTokenCategoryList: UNIQUE_TOKEN_CATEGORIES,
    logArray: logs,
  })

  flagDuplicateTokens({
    fileType,
    veevaTokens,
    uniqueTokensList: UNIQUE_TOKENS,
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
