const { getVeevaTokens } = require('../../lib/tokens/retrieve')

test('Getting Veeva tokens from string', () => {
  const srcCode = '{{accLname}}'
  const validResults = getVeevaTokens(srcCode)
  expect(validResults.length).toBe(1)
  expect(validResults[0].line).toBeDefined()
  expect(validResults[0].token).toBeDefined()
  expect(validResults[0].token).toBe(srcCode)

  const invalidResults = getVeevaTokens(1)
  expect(invalidResults).toBe(false)
})
