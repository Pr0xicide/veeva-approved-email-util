const { GRADE } = require('../../../lib/linting/grading')
const { UnknownTokenMessage } = require('../../../lib/linting/message')
const { CATEGORY_TYPES } = require('../../../lib/tokens/category')

test('Unknown Veeva token message', () => {
  const unknownToken = {
    line: 1,
    category: CATEGORY_TYPES.UNKNOWN,
    token: '{{fakeToken}}',
  }
  const msg = new UnknownTokenMessage(unknownToken)
  expect(msg.getGrade()).toBe(GRADE.ERROR)
  expect(msg.getMessage()).toBeDefined()
})
