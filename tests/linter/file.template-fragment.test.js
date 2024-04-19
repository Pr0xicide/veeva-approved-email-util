const templateFragment = require('../../src/linter/file/template-fragment')

test('template fragment source code', () => {
  const validCode = '{{accFname}} {{accLname}}'
  const invalidCode = '{{customText[1|2|3]}} {{customText}} {{PieceLink}}'

  expect(templateFragment.isValid(validCode)).toBe(true)
  expect(templateFragment.isValid(invalidCode).length).toBe(3)
})
