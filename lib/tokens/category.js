const CATEGORY_TYPES = Object.freeze({
  CONTENT: 'content',
  CONSENT: 'consent',
  CITATION: 'citation',
  FOOTNOTE: 'footnote',
  FUNCTIONALITY: 'functionality',
  USER_INPUT: 'user input',
  EMAIL_FRAGMENT: 'email fragment',
  TEMPLATE_FRAGMENT: 'template fragment',
  SIGNATURE: 'signature',
  UNSUBSCRIBE: 'unsubscribe',
  VAULT: 'vault',
  UNKNOWN: 'unknown',
})

const isTokenContentCategory = (token) => {
  return (
    token.indexOf('{{acc') === 0 ||
    token.indexOf('{{user') === 0 ||
    token.indexOf('{{Account.') === 0 ||
    token.indexOf('{{timeZone}}') === 0 ||
    token.indexOf('{{Approved_Document_vod.') === 0 ||
    token.indexOf('{{Call2_vod.') === 0 ||
    token.indexOf('{{User.') === 0 ||
    token.indexOf('{{User_Detail_vod.') === 0 ||
    token.indexOf('{{parentCallDatetime') === 0 ||
    token.indexOf('{{customContent') === 0
  )
}

const isTokenConsentCategory = (token) => {
  return (
    token.indexOf('{{insertConsentLines}}') === 0 ||
    token.indexOf('{{insertMCConsentLines') === 0
  )
}

const isTokenCitation = (token) => {
  return (
    token.indexOf('{{Citation') === 0 || token.indexOf('{{InsertCitation') === 0
  )
}

const isTokenFootnote = (token) => {
  return (
    token.indexOf('{{Footnote') === 0 ||
    token.indexOf('{{InsertFootnotes') === 0
  )
}

const isTokenFunctionallyCategory = (token) => {
  return (
    token.indexOf('{{addToCalendar}}') === 0 ||
    token.indexOf('{{approvedEmailAction') === 0 ||
    token.indexOf('{{EventSession}}') === 0 ||
    token.indexOf('{{EventSpeaker}}') === 0 ||
    token.indexOf('{{insertEngageAndZoomJoinURL') === 0 ||
    token.indexOf('{{insertZoomDialInNumbers') === 0 ||
    token.indexOf('{{requiresReview}}') === 0 ||
    token.indexOf('{{schedulerLink}}') === 0
  )
}

const isTokenEmailFragmentCategory = (token) => {
  return (
    token.indexOf('{{insertEmailFragments') === 0 ||
    token.indexOf('{{insertEmailBuilder}}') === 0
  )
}

const isTokenTemplateFragmentCategory = (token) => {
  return token.indexOf('{{emailTemplateFragment}}') === 0
}

const isTokenSignatureCategory = (token) => {
  return (
    token.indexOf('{{insertCallSample') === 0 ||
    token.indexOf('{{insertMedicalInquiry') === 0 ||
    token.indexOf('{{insertOrderLine}}') === 0 ||
    token.indexOf('{{insertSignature}}') === 0
  )
}

const isTokenUnsubscribeCategory = (token) => {
  return token.indexOf('{{unsubscribe_product_link') === 0
}

const isTokenVaultCategory = (token) => {
  return (
    token.indexOf('{{$') === 0 ||
    token.indexOf('{{DynamicContentLink}}') === 0 ||
    token.indexOf('{{ISILink}}') === 0 ||
    token.indexOf('{{PieceLink}}') === 0 ||
    token.indexOf('{{PILink}}') === 0 ||
    token.indexOf('{{surveyLink}}') === 0
  )
}

const isTokenUserInputCategory = (token) => {
  return (
    token.indexOf('{{customText') === 0 ||
    token.indexOf('{{customRichText}}') === 0
  )
}

/**
 * Loops through the tokens returned from "getVeevaTokens" and determines the category for each token.
 *
 * @param {Array<{line:number, token:String}>} veevaTokens Array of Veeva token objects from getVeevaTokens function
 * @returns {void} false if incorrect parameter type was provided
 */
const determineTokenCategory = (veevaTokens) => {
  // Parameter validation.
  if (veevaTokens instanceof Array === false) return false
  else if (veevaTokens.length === 0) return false

  // Determine the category for each Veeva token.
  veevaTokens.forEach((veevaToken) => {
    const { token } = veevaToken

    if (isTokenContentCategory(token))
      veevaToken.category = CATEGORY_TYPES.CONTENT
    else if (isTokenConsentCategory(token))
      veevaToken.category = CATEGORY_TYPES.CONSENT
    else if (isTokenCitation(token))
      veevaToken.category = CATEGORY_TYPES.CITATION
    else if (isTokenFootnote(token))
      veevaToken.category = CATEGORY_TYPES.FOOTNOTE
    else if (isTokenFunctionallyCategory(token))
      veevaToken.category = CATEGORY_TYPES.FUNCTIONALITY
    else if (isTokenEmailFragmentCategory(token))
      veevaToken.category = CATEGORY_TYPES.EMAIL_FRAGMENT
    else if (isTokenTemplateFragmentCategory(token))
      veevaToken.category = CATEGORY_TYPES.TEMPLATE_FRAGMENT
    else if (isTokenSignatureCategory(token))
      veevaToken.category = CATEGORY_TYPES.SIGNATURE
    else if (isTokenUnsubscribeCategory(token))
      veevaToken.category = CATEGORY_TYPES.UNSUBSCRIBE
    else if (isTokenVaultCategory(token))
      veevaToken.category = CATEGORY_TYPES.VAULT
    else if (isTokenUserInputCategory(token))
      veevaToken.category = CATEGORY_TYPES.USER_INPUT
    else veevaToken.category = CATEGORY_TYPES.UNKNOWN
  })
}

/**
 * Provides a summary on the number of tokens per each category from the "determineTokenCategory" function.
 *
 * @param {Array<{line:number, token:String}>} veevaTokens Array of Veeva tokens with categories defined from "determineTokenCategory"
 * @returns {{categoryName:Number}} object with all categories and count number for each category
 */
const getTokenCategorySummary = (veevaTokens) => {
  // Parameter validation.
  if (veevaTokens instanceof Array === false) return false
  else if (veevaTokens.length === 0) return false

  const summary = {}
  const veevaCategories = Object.keys(CATEGORY_TYPES)

  veevaCategories.forEach((categoryName) => {
    const count = veevaTokens.filter(
      (veevaToken) => veevaToken.category === CATEGORY_TYPES[categoryName]
    ).length
    summary[CATEGORY_TYPES[categoryName]] = count
  })

  return summary
}

module.exports = {
  CATEGORY_TYPES,
  determineTokenCategory,
  getTokenCategorySummary,
  isTokenContentCategory,
  isTokenConsentCategory,
  isTokenCitation,
  isTokenFootnote,
  isTokenFunctionallyCategory,
  isTokenEmailFragmentCategory,
  isTokenTemplateFragmentCategory,
  isTokenSignatureCategory,
  isTokenUnsubscribeCategory,
  isTokenVaultCategory,
  isTokenUserInputCategory,
}
