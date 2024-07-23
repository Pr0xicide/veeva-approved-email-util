const { getVeevaTokens } = require('../../lib/tokens/retrieve')

test('Invalid function parameters', () => {
  const invalidResults = getVeevaTokens(1)
  expect(invalidResults).toBe(false)
})

test('Getting Veeva tokens from a string', () => {
  const srcCode = '{{accLname}}'
  const tokenArray = getVeevaTokens(srcCode)
  expect(tokenArray.length).toBe(1)
  expect(tokenArray[0].line).toBeDefined()
  expect(tokenArray[0].token).toBeDefined()
  expect(tokenArray[0].token).toBe(srcCode)
})

test('Getting Veeva tokens from a multi-lined string', () => {
  const srcCode = '{{1}}\n{{2}}\n\n{{4}}'
  const tokenArray = getVeevaTokens(srcCode)
  expect(tokenArray.length).toBe(3)
  expect(tokenArray[0].line).toBe(1)
  expect(tokenArray[1].line).toBe(2)
  expect(tokenArray[2].line).toBe(4)
})
