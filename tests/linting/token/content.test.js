/**
 * Test suite for validating Veeva content tokens.
 */
const { GRADE } = require('../../../lib/linting/grading')
const { CATEGORY_TYPES } = require('../../../lib/tokens/category')
const { lint: validate } = require('../../../lib/linting/token/content')

const lint = (token) => {
  return validate({
    type: CATEGORY_TYPES.CONTENT,
    value: token,
  })
}

test('Short hand notation tokens', () => {
  expect(lint('{{accTitle}}').grade).toBe(GRADE.PASS)
  expect(lint('{{accFname}}').grade).toBe(GRADE.PASS)
  expect(lint('{{accLname}}').grade).toBe(GRADE.PASS)
  expect(lint('{{accCredentials}}').grade).toBe(GRADE.PASS)
  expect(lint('{{userEmailAddress}}').grade).toBe(GRADE.PASS)
  expect(lint('{{userName}}').grade).toBe(GRADE.PASS)
  expect(lint('{{userPhoto}}').grade).toBe(GRADE.PASS)
  expect(lint('{{parentCallDatetime}}').grade).toBe(GRADE.PASS)

  expect(lint('{{User.MobilePhone}}').grade).toBe(GRADE.PASS)
})
