const { GRADE } = require('../../../lib/linting/grading')
const { CATEGORY_TYPES } = require('../../../lib/tokens/category')
const { lint: validate } = require('../../../lib/linting/token/email-fragment')

const lint = (token) => {
  return validate({
    type: CATEGORY_TYPES.EMAIL_FRAGMENT,
    value: token,
  })
}

test('Standard Veeva email fragment token syntax', () => {
  expect(lint('{{insertEmailFragments}}').grade).toBe(GRADE.PASS)
})

test('Veeva fragment limits', () => {
  // Basic limit syntax errors.
  expect(lint('{{insertEmailFragments[]}}').grade).toBe(GRADE.ERROR)
  expect(lint('{{insertEmailFragments[}}').grade).toBe(GRADE.ERROR)
  expect(lint('{{insertEmailFragments]}}').grade).toBe(GRADE.ERROR)
  expect(lint('{{insertEmailFragments[1}}').grade).toBe(GRADE.ERROR)
  expect(lint('{{insertEmailFragments1]}}').grade).toBe(GRADE.ERROR)

  // Fragment limits.
  expect(lint('{{insertEmailFragments[10]}}').grade).toBe(GRADE.ERROR)
  expect(lint('{{insertEmailFragments[-1,0]}}').grade).toBe(GRADE.ERROR)
  expect(lint('{{insertEmailFragments[0,-1]}}').grade).toBe(GRADE.ERROR)
  expect(lint('{{insertEmailFragments[2,1]}}').grade).toBe(GRADE.ERROR)

  expect(lint('{{insertEmailFragments[1,6]}}').grade).toBe(GRADE.PASS)
})
