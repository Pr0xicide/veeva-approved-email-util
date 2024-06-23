const { getVeevaTokens, determineTokenType } = require('../src/main')
const { TYPES } = require('../src/token-types')

test('Get veeva tokens', () => {
  const srcCode = '{{accLname}}'
  const invalidResults = getVeevaTokens(1)
  const validResults = getVeevaTokens(srcCode)

  expect(invalidResults).toBe(false)
  expect(validResults.length).toBe(1)
  expect(validResults[0].value).toBe(srcCode)
})

test('Get veeva token type', () => {
  const srcCode = '{{accLname}}'
  const res = getVeevaTokens(srcCode)
  determineTokenType(res)

  expect(res.length).toBe(1)
  expect(res[0].type).toBe(TYPES.CONTENT)
})
