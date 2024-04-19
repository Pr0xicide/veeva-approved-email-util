const emailFragment = require('../../src/linter/file/email-fragment')

test('email fragment source code', () => {
  const validCode = '{{accFname}} {{accLname}} {{PieceLink}}'
  const invalidCode = '{{customText[1|2|3]}} {{customText}}'

  expect(emailFragment.isValid(validCode)).toBe(true)
  expect(emailFragment.isValid(invalidCode).length).toBe(2)
})
