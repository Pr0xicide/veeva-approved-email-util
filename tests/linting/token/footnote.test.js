const { GRADE } = require('../../../lib/linting/grading')
const { CATEGORY_TYPES } = require('../../../lib/tokens/category')
const { lint: validate } = require('../../../lib/linting/token/footnote')

const lint = (token) => {
  return validate({
    category: CATEGORY_TYPES.FOOTNOTE,
    token: token,
  })
}

test('Standard footnote tokens syntax', () => {
  expect(lint('{{FootnoteStart}}').getGrade()).toBe(GRADE.PASS)
  expect(lint('{{FootnoteEnd}}').getGrade()).toBe(GRADE.PASS)
  expect(lint('{{InsertFootnotes}}').getGrade()).toBe(GRADE.PASS)
})
