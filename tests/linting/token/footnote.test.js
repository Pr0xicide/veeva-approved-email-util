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

test('Invalid syntax for defining footnotes ', () => {
  expect(lint('{{FootnoteSymbol}}').getGrade()).toBe(GRADE.ERROR)
  expect(lint('{{FootnoteSymbol[}}').getGrade()).toBe(GRADE.ERROR)
  expect(lint('{{FootnoteSymbol]}}').getGrade()).toBe(GRADE.ERROR)
})

test('Defining footnotes symbols', () => {
  expect(lint('{{FootnoteSymbol[*]}}').getGrade()).toBe(GRADE.ERROR)
  expect(lint('{{FootnoteSymbol[†]}}').getGrade()).toBe(GRADE.ERROR)
  expect(lint('{{FootnoteSymbol[&dagger;]}}').getGrade()).toBe(GRADE.ERROR)
  expect(lint('{{FootnoteSymbol[[*]]}}').getGrade()).toBe(GRADE.ERROR)
  expect(lint('{{FootnoteSymbol[[*][†]]}}').getGrade()).toBe(GRADE.ERROR)
  expect(lint('{{FootnoteSymbol[a]}}').getGrade()).toBe(GRADE.ERROR)

  expect(lint('{{FootnoteSymbol[1]}}').getGrade()).toBe(GRADE.PASS)
  expect(lint('{{FootnoteSymbol[122]}}').getGrade()).toBe(GRADE.PASS)
})
