const { GRADE } = require('../../../lib/linting/grading')
const { CATEGORY_TYPES } = require('../../../lib/tokens/category')
const { lint: validate } = require('../../../lib/linting/token/citation')

const lint = (token) => {
  return validate({
    category: CATEGORY_TYPES.CITATION,
    token: token,
  })
}

test('Standard footnote tokens syntax', () => {
  expect(lint('{{CitationStart}}').getGrade()).toBe(GRADE.PASS)
  expect(lint('{{CitationEnd}}').getGrade()).toBe(GRADE.PASS)
  expect(lint('{{CitationSummaryStart}}').getGrade()).toBe(GRADE.PASS)
  expect(lint('{{CitationSummaryEnd}}').getGrade()).toBe(GRADE.PASS)
  expect(lint('{{InsertCitationSummaries}}').getGrade()).toBe(GRADE.PASS)
  expect(lint('{{InsertCitations}}').getGrade()).toBe(GRADE.PASS)
})
