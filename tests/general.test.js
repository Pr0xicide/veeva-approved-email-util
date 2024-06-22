const util = require('../src/general/main')
const { TYPES } = require('../src/linter/token/type')

test('Get veeva tokens', () => {
  const srcCode = '{{accLname}}'
  const invalidResults = util.getVeevaTokens(1)
  const validResults = util.getVeevaTokens(srcCode)

  expect(invalidResults).toBe(false)
  expect(validResults.length).toBe(1)
  expect(validResults[0].value).toBe(srcCode)
})

test('Get veeva token type', () => {
  const srcCode = '{{accLname}}'
  const res = util.getVeevaTokens(srcCode)
  util.determineTokenType(res)

  expect(res.length).toBe(1)
  expect(res[0].type).toBe(TYPES.CONTENT)
})

test('Build Veeva dropdown/picklist token', () => {
  const validOptions = ['1', '2', '3', '4']
  const expected = '{{customText[1|2|3|4]}}'

  expect(util.buildDropdownToken([])).toBe(false)
  expect(util.buildDropdownToken(123)).toBe(false)
  expect(util.buildDropdownToken(validOptions)).toBe(expected)
  expect(util.buildDropdownToken(['', ''])).toBe('{{customText[|]}}')
})

test('Retrieving dropdown options in a dropdown token', () => {
  const invalid = util.getDropdownOptions(1)
  const options = util.getDropdownOptions('{{customText[1|2|3]}}')

  expect(invalid).toBe(false)
  expect(options.length).toBe(3)
  expect(options[0]).toBe('1')
  expect(options[1]).toBe('2')
  expect(options[2]).toBe('3')
})
