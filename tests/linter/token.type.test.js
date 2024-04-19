/**
 * Testing Veeva token types based what is being inserted into the source code.
 *
 * This does NOT validate each token. So it's okay if an invalid token is being
 * reported as token type for now.
 *
 * Website: https://crmhelp.veeva.com/doc/Content/CRM_topics/Multichannel/ApprovedEmail/ManageCreateContent/CreatingContent/ConfigTokens.htm
 */
const type = require('../../src/linter/token/type')

/**
 * Veeva content tokens.
 *
 * TODO:
 * {{parentCallDatetime}}
 * {{parentCallDatetime(FORMAT)}}
 *
 */
test('Content token detection', () => {
  expect(type.isTokenContentType('{{accLname}}')).toBeTruthy()
  expect(type.isTokenContentType('{{userName}}')).toBeTruthy()

  expect(type.isTokenContentType('{accLname}}')).toBeFalsy()
  expect(type.isTokenContentType('{{ACCLname}}')).toBeFalsy()

  expect(type.isTokenContentType('{{User.Phone}}')).toBeTruthy()
  expect(type.isTokenContentType('{User.Phone}}')).toBeFalsy()
})

/**
 * Veeva user input token.
 */
test('Input token detection', () => {
  // Open text field
  expect(type.isTokenInputType('{{customText}}')).toBeTruthy()
  expect(type.isTokenInputType('{{customText(255)}}')).toBeTruthy()
  expect(type.isTokenInputType('{{customText:Required}}')).toBeTruthy()
  expect(type.isTokenInputType('{{customText(255|Lorem ipsum)}}')).toBeTruthy()

  // Rich text field
  expect(type.isTokenInputType('{{customRichText}}')).toBeTruthy()

  // Dropdowns
  expect(type.isTokenInputType('{{customText[1|2|3]}}')).toBeTruthy()
  expect(type.isTokenInputType('{customText[1|2|3]}}')).toBeFalsy()
  expect(type.isTokenInputType('{{CUSTOMText[1|2|3]}}')).toBeFalsy()
})

/**
 * Veeva email fragment.
 */
test('Email fragment token detection', () => {
  expect(type.isTokenEmailFragmentType('{{insertEmailFragments')).toBeTruthy()
  expect(type.isTokenEmailFragmentType('{insertEmailFragments')).toBeFalsy()
  expect(type.isTokenEmailFragmentType('{INSERTEmailFragments')).toBeFalsy()
  expect(type.isTokenEmailFragmentType('{{INSERTEmailFragments')).toBeFalsy()

  expect(
    type.isTokenEmailFragmentType('{{insertEmailFragments[0,1]')
  ).toBeTruthy()
  expect(
    type.isTokenEmailFragmentType('{INSERTEmailFragments[0,1]')
  ).toBeFalsy()
  expect(
    type.isTokenEmailFragmentType('{{INSERTEmailFragments[0,1]')
  ).toBeFalsy()
})

/**
 * Veeva template fragment.
 */
test('Template fragment token detection', () => {
  expect(
    type.isTokenTemplateFragmentType('{{emailTemplateFragment}}')
  ).toBeTruthy()

  expect(type.isTokenTemplateFragmentType('{emailTemplateFragment')).toBeFalsy()
  expect(
    type.isTokenTemplateFragmentType('{{emailTemplateFragment}')
  ).toBeFalsy()
  expect(
    type.isTokenTemplateFragmentType('{{EMAILTemplateFragment')
  ).toBeFalsy()
  expect(
    type.isTokenTemplateFragmentType('{{emailTemplateFragment[0,1]')
  ).toBeFalsy()
})

/**
 * Vault tokens
 */
test('Vault token detection', () => {
  expect(type.isTokenVaultType('{{$')).toBeTruthy()
  expect(type.isTokenVaultType('{{engageLink}}')).toBeTruthy()
  expect(type.isTokenVaultType('{{ISILink}}')).toBeTruthy()
  expect(type.isTokenVaultType('{{PieceLink}}')).toBeTruthy()
  expect(type.isTokenVaultType('{{PILink}}')).toBeTruthy()
  expect(type.isTokenVaultType('{{surveyLink}}')).toBeTruthy()

  expect(type.isTokenVaultType('{$')).toBeFalsy()
  expect(type.isTokenVaultType('{engageLink}}')).toBeFalsy()
  expect(type.isTokenVaultType('{ISILink}}')).toBeFalsy()
  expect(type.isTokenVaultType('{PieceLink}}')).toBeFalsy()
  expect(type.isTokenVaultType('{PILink}}')).toBeFalsy()
  expect(type.isTokenVaultType('{surveyLink}}')).toBeFalsy()
})

/**
 * Functionality tokens
 *
 * TODO:
 * {{approvedEmailAction}}
 * {{EventSession}}
 * {{EventSpeaker}}
 * {{insertEngageAndZoomJoinURL[Language Code]}}
 * {{insertZoomDialInNumbers[Language Code]}}
 *
 */
test('Vault token detection', () => {
  expect(type.isTokenFunctionalityType('{{addToCalendar}}')).toBeTruthy()
  expect(type.isTokenFunctionalityType('{{schedulerLink}}')).toBeTruthy()

  expect(type.isTokenFunctionalityType('{{addToCalendar')).toBeFalsy()
  expect(type.isTokenFunctionalityType('{{schedulerLink')).toBeFalsy()
})

/**
 * Unsubscribe token
 */
test('Unsubscribe token detection', () => {
  expect(
    type.isTokenUnsubscribeType('{{unsubscribe_product_link}}')
  ).toBeTruthy()
  expect(type.isTokenUnsubscribeType('{{unsubscribe_product_link}')).toBeFalsy()
})

/**
 * TODO
 * Database query - {{customContent}}
 * Citations/References + Footnotes
 * Signature Transaction Receipt Tokens
 * Consent Capture Tokens
 * Unsubscribe Page Tokens
 * Website Tokens
 */
