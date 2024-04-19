const TYPES = {
  CONTENT: 'content',
  USER_INPUT: 'user-input',
  EMAIL_FRAGMENT: 'email-fragment',
  TEMPLATE_FRAGMENT: 'template-fragment',
  UNSUBSCRIBE: 'unsubscribe',
  VAULT: 'vault',
  UNKNOWN: 'unknown',
}

const isTokenContentType = (token) => {
  return (
    token.indexOf('{{acc') === 0 ||
    token.indexOf('{{user') === 0 ||
    token.indexOf('{{Account.') === 0 ||
    token.indexOf('{{User.') === 0
  )
}

const isTokenInputType = (token) => {
  return (
    token.indexOf('{{customText') === 0 ||
    token.indexOf('{{customRichText}}') === 0
  )
}

const isTokenEmailFragmentType = (token) => {
  return token.indexOf('{{insertEmailFragments') === 0
}

const isTokenTemplateFragmentType = (token) => {
  return token.indexOf('{{emailTemplateFragment}}') === 0
}

const isTokenVaultType = (token) => {
  return (
    token.indexOf('{{$') === 0 ||
    token.indexOf('{{engageLink}}') === 0 ||
    token.indexOf('{{ISILink}}') === 0 ||
    token.indexOf('{{PieceLink}}') === 0 ||
    token.indexOf('{{PILink}}') === 0 ||
    token.indexOf('{{surveyLink}}') === 0
  )
}

const isTokenFunctionalityType = (token) => {
  return (
    token.indexOf('{{addToCalendar}}') === 0 ||
    token.indexOf('{{schedulerLink}}') === 0
  )
}

const isTokenCitationType = (token) => {
  return token.indexOf('Footnote') >= 0 || token.indexOf('Citation') >= 0
}

const isTokenUnsubscribeType = (token) => {
  return token.indexOf('{{unsubscribe_product_link}}') >= 0
}

module.exports = {
  TYPES: TYPES,
  isTokenContentType: isTokenContentType,
  isTokenInputType: isTokenInputType,
  isTokenEmailFragmentType: isTokenEmailFragmentType,
  isTokenTemplateFragmentType: isTokenTemplateFragmentType,
  isTokenVaultType: isTokenVaultType,
  isTokenFunctionalityType: isTokenFunctionalityType,
  isTokenCitationType: isTokenCitationType,
  isTokenUnsubscribeType: isTokenUnsubscribeType,
}
