/**
 * Test suite for validating Veeva content tokens.
 */
const { GRADE } = require('../../../lib/linting/grading')
const { CATEGORY_TYPES } = require('../../../lib/tokens/category')
const { lint: validate } = require('../../../lib/linting/token/vault')

const lint = (token) => {
  return validate({
    category: CATEGORY_TYPES.VAULT,
    line: 1,
    token: token,
  })
}

test('Standard vault tokens', () => {
  expect(lint('{{engageLink}}').grade).toBe(GRADE.PASS)
  expect(lint('{{ISILink}}').grade).toBe(GRADE.PASS)
  expect(lint('{{PieceLink}}').grade).toBe(GRADE.PASS)
  expect(lint('{{PILink}}').grade).toBe(GRADE.PASS)
  expect(lint('{{surveyLink}}').grade).toBe(GRADE.PASS)
})

test('Vault document tokens with IDs', () => {
  expect(lint('{{$20}}').grade).toBe(GRADE.PASS)
  expect(lint('{{$sdf}}').grade).toBe(GRADE.ERROR)
  expect(lint('{{$s23df}}').grade).toBe(GRADE.ERROR)
  expect(lint('{{$ten}}').grade).toBe(GRADE.ERROR)
})
