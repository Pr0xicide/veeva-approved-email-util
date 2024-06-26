const CATEGORY_TYPES = Object.freeze({
  CONTENT: 'content',
  CONSENT: 'consent',
  FUNCTIONALITY: 'functionality',
  USER_INPUT: 'user-input',
  EMAIL_FRAGMENT: 'email-fragment',
  TEMPLATE_FRAGMENT: 'template-fragment',
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
    token.indexOf('{{User.') === 0 ||
    token.indexOf('{{parentCallDatetime') === 0 ||
    token.indexOf('{{timeZone}}') === 0 ||
    token.indexOf('{{customContent') === 0
  )
}

const isTokenConsentCategory = (token) => {
  return (
    token.indexOf('{{insertConsentLines}}') === 0 ||
    token.indexOf('{{insertMCConsentLines') === 0
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
 * Determines Veeva approved email token category and stores the value in the 'category' field.
 *
 * @param {Array<{line:number, token:String}>} veevaTokens Array of Veeva token objects from getVeevaTokens function
 * @returns {void}
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

module.exports = {
  CATEGORY_TYPES,
  determineTokenCategory,
  isTokenContentCategory,
  isTokenConsentCategory,
  isTokenFunctionallyCategory,
  isTokenEmailFragmentCategory,
  isTokenTemplateFragmentCategory,
  isTokenSignatureCategory,
  isTokenUnsubscribeCategory,
  isTokenVaultCategory,
  isTokenUserInputCategory,
}
