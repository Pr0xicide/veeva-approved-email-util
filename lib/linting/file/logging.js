const { getTokenCategorySummary } = require('../../tokens/category')
const { GRADE } = require('../grading')
const { DuplicateTokenMessage, InvalidTokenMessage } = require('../message')
const { isCategorySupported, isTokenSupported } = require('./contains')
const { FILE_TYPES } = require('./types')

/**
 * Detects and log any duplicate tokens found in the HTML file.
 *
 * @param {{veevaTokens: Array<>, uniqueTokenCategoryList: Array<>, logArray: Array<>}} params
 * @returns {void}
 */
const logDuplicateTokens = (params) => {
  const { veevaTokens, uniqueTokenCategoryList, logArray } = params
  const categorySummary = getTokenCategorySummary(veevaTokens)

  for (let i = 0; i < uniqueTokenCategoryList.length; i++) {
    // Correct number of tokens per category, exit.
    if (categorySummary[uniqueTokenCategoryList[i]] < 2) break

    // List of duplicate tokens found in the email template.
    const duplicateTokenList = veevaTokens.filter(
      (veevaToken) => veevaToken.category === uniqueTokenCategoryList[i]
    )

    // Generate new error msg.
    const errorMsg = new DuplicateTokenMessage({
      category: uniqueTokenCategoryList[i],
      duplicateTokens: duplicateTokenList,
    })

    // Log message.
    logArray.push(errorMsg)
  }
}

/**
 * Detect and log if there are any invalid tokens in an approved email file type.
 *
 * @param {{fileType:FILE_TYPES ,veevaTokens: Array<>, uniqueTokenCategoryList: Array<>, logArray: Array<>}} params
 * @returns {void}
 */
const logInvalidTokenCategories = (params) => {
  const { fileType, veevaTokens, validTokensList, logArray } = params

  for (let i = 0; i < veevaTokens.length; i++) {
    const { category, token, line } = veevaTokens[i]

    if (!isCategorySupported(category, validTokensList)) {
      logArray.push(
        new InvalidTokenMessage({
          grade: GRADE.ERROR,
          line,
          token,
          message: `Veeva ${category} tokens are not supported in ${fileType}`,
        })
      )
    }
  }
}

/**
 * Detect and log if there are any unsupported tokens in an approved email file type.
 *
 * @param {{fileType:FILE_TYPES ,veevaTokens: Array<>, invalidTokensList: Array<>, logArray: Array<>}} params
 * @returns {void}
 */
const logUnsupportedTokens = (params) => {
  const { fileType, veevaTokens, invalidTokensList, logArray } = params

  for (let i = 0; i < veevaTokens.length; i++) {
    const { token, line } = veevaTokens[i]

    // Veeva token is not supported in template fragments.
    if (!isTokenSupported(token, invalidTokensList)) {
      logArray.push(
        new InvalidTokenMessage({
          grade: GRADE.ERROR,
          line,
          token,
          message: `Token "${token}" is not supported in ${fileType}`,
        })
      )
    }
  }
}

module.exports = {
  logDuplicateTokens,
  logInvalidTokenCategories,
  logUnsupportedTokens,
}
