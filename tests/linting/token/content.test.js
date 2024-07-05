const { GRADE } = require('../../../lib/linting/grading')
const { CATEGORY_TYPES } = require('../../../lib/tokens/category')
const { lint: validate } = require('../../../lib/linting/token/content')

const lint = (token) => {
  return validate({
    category: CATEGORY_TYPES.CONTENT,
    token: token,
  })
}

test('Short hand notation tokens', () => {
  expect(lint('{{accTitle}}').getGrade()).toBe(GRADE.PASS)
  expect(lint('{{accFname}}').getGrade()).toBe(GRADE.PASS)
  expect(lint('{{accLname}}').getGrade()).toBe(GRADE.PASS)
  expect(lint('{{accCredentials}}').getGrade()).toBe(GRADE.PASS)
  expect(lint('{{userEmailAddress}}').getGrade()).toBe(GRADE.PASS)
  expect(lint('{{userName}}').getGrade()).toBe(GRADE.PASS)
  expect(lint('{{userPhoto}}').getGrade()).toBe(GRADE.PASS)
  expect(lint('{{parentCallDatetime}}').getGrade()).toBe(GRADE.PASS)

  expect(lint('{{User.MobilePhone}}').getGrade()).toBe(GRADE.PASS)
})
