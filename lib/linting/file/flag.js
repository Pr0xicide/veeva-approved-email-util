const {
  getTokenCategorySummary,
  CATEGORY_TYPES,
} = require('../../tokens/category')
const { GRADE } = require('../grading')
const {
  DuplicateTokenMessage,
  InvalidTokenMessage,
  UnknownTokenMessage,
} = require('../message')
const { VEEVA_TOKEN_LINTERS } = require('../token/lint')
const { isCategorySupported, isTokenSupported } = require('./contains')
const { FILE_TYPES } = require('./types')

/**
 * Flag any duplicate tokens found in the HTML source code that should be used once.
 *
 * @param {{veevaTokens: Array<>, uniqueTokenCategoryList: Array<>, logArray: Array<>}} params
 * @returns {void}
 */
const flagDuplicateTokens = (params) => {
  const { veevaTokens, uniqueTokenCategoryList, logArray } = params
  const categorySummary = getTokenCategorySummary(veevaTokens)

  for (let i = 0; i < uniqueTokenCategoryList.length; i++) {
    // Correct number of tokens per category, exit.
    if (categorySummary[uniqueTokenCategoryList[i]] < 2) break

    // List of duplicate tokens found in the file.
    const duplicateTokenList = veevaTokens.filter(
      (veevaToken) => veevaToken.category === uniqueTokenCategoryList[i]
    )

    duplicateTokenList.forEach((duplicateToken) => {
      duplicateToken.isTokenDuplicated = true
    })

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
 * Flag if there are any invalid tokens in an approved email file type.
 *
 * @param {{fileType:FILE_TYPES ,veevaTokens: Array<>, uniqueTokenCategoryList: Array<>, logArray: Array<>}} params
 * @returns {void}
 */
const flagUnsupportedTokenCategories = (params) => {
  const { fileType, veevaTokens, supportedCategories, logArray } = params

  for (let i = 0; i < veevaTokens.length; i++) {
    const { category, token, line } = veevaTokens[i]
    veevaTokens[i].isCategorySupported = true

    if (!isCategorySupported(category, supportedCategories)) {
      veevaTokens[i].isCategorySupported = false
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
 * Flag if there are any unsupported tokens in an approved email file type.
 *
 * @param {{fileType:FILE_TYPES ,veevaTokens: Array<>, invalidTokensList: Array<>, logArray: Array<>}} params
 * @returns {void}
 */
const flagUnsupportedTokens = (params) => {
  const { fileType, veevaTokens, unsupportedTokens, logArray } = params

  for (let i = 0; i < veevaTokens.length; i++) {
    const { token, line } = veevaTokens[i]
    veevaTokens[i].isTokenSupported = true

    // Veeva token is not supported in template fragments.
    if (!isTokenSupported(token, unsupportedTokens)) {
      veevaTokens[i].isTokenSupported = false
      logArray.push(
        new InvalidTokenMessage({
          grade: GRADE.ERROR,
          line,
          token,
          message: `Token "${token}" is not supported in ${fileType} file types`,
        })
      )
    }
  }
}

const flagVeevaTokens = (veevaTokens, logs) => {
  veevaTokens.forEach((veevaToken) => {
    const { category, line, token } = veevaToken

    // Report any unknown tokens.
    if (category === CATEGORY_TYPES.UNKNOWN) {
      const msg = new UnknownTokenMessage({
        line,
        token,
      })

      logs.push(msg)
    }

    // If token linter is defined.
    else if (VEEVA_TOKEN_LINTERS[category]) {
      // Lint Veeva token, and add to log if any issues were reported.
      const tokenLint = VEEVA_TOKEN_LINTERS[category](veevaToken)

      if (tokenLint.grade !== GRADE.PASS) {
        logs.push(tokenLint)
      }
    }
  })
}

module.exports = {
  flagDuplicateTokens,
  flagUnsupportedTokenCategories,
  flagUnsupportedTokens,
  flagVeevaTokens,
}
