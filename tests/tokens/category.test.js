const {
  CATEGORY_TYPES,
  determineTokenCategory,
  getTokenCategorySummary,
} = require('../../lib/tokens/category')

test('Invalid parameters for determining token category', () => {
  expect(determineTokenCategory(true)).toBe(false)
  expect(determineTokenCategory(1232)).toBe(false)
  expect(determineTokenCategory('sdfsdf')).toBe(false)
  expect(determineTokenCategory([])).toBe(false)
})

test('Detecting content tokens', () => {
  const tokensArray = [
    { token: '{{accTitle}}' },
    { token: '{{accFname}}' },
    { token: '{{accLname}}' },
    { token: '{{accCredentials}}' },
    { token: '{{userEmailAddress}}' },
    { token: '{{userName}}' },
    { token: '{{userPhoto}}' },
    { token: '{{parentCallDatetime}}' },
    { token: '{{customContent}}' },
    { token: '{{Account.Title}}' },
    { token: '{{User.Phone}}' },
    { token: '{{User.Phone1}}' },
  ]
  determineTokenCategory(tokensArray)

  tokensArray.forEach((token) => {
    const { category } = token
    expect(category).toBeDefined()
    expect(category).toBe(CATEGORY_TYPES.CONTENT)
  })
})

test('Detecting consent tokens', () => {
  const tokensArray = [
    { token: '{{insertConsentLines}}' },
    { token: '{{insertMCConsentLines}}' },
    { token: '{{insertMCConsentLines[Subscribed, Unsubscribed]}}' },
  ]
  determineTokenCategory(tokensArray)

  tokensArray.forEach((token) => {
    const { category } = token
    expect(category).toBeDefined()
    expect(category).toBe(CATEGORY_TYPES.CONSENT)
  })
})

test('Detecting functionally tokens', () => {
  const tokensArray = [
    { token: '{{addToCalendar}}' },
    { token: '{{approvedEmailAction}}' },
    { token: '{{approvedEmailAction[Subscribed, Unsubscribed]}}' },
    { token: '{{EventSession}}' },
    { token: '{{EventSpeaker}}' },
    { token: '{{insertEngageAndZoomJoinURL}}' },
    { token: '{{insertEngageAndZoomJoinURL[eng]}}' },
    { token: '{{insertZoomDialInNumbers}}' },
    { token: '{{insertZoomDialInNumbers[eng]}}' },
    { token: '{{requiresReview}}' },
    { token: '{{schedulerLink}}' },
  ]
  determineTokenCategory(tokensArray)

  tokensArray.forEach((token) => {
    const { category } = token
    expect(category).toBeDefined()
    expect(category).toBe(CATEGORY_TYPES.FUNCTIONALITY)
  })
})

test('Detecting email fragment tokens', () => {
  const tokensArray = [
    { token: '{{insertEmailFragments}}' },
    { token: '{{insertEmailFragments[1,2]}}' },
    { token: '{{insertEmailFragments[1][2]}}' },
    { token: '{{insertEmailFragmentssdfsd}}' },
    { token: '{{insertEmailBuilder}}' },
  ]
  determineTokenCategory(tokensArray)

  tokensArray.forEach((token) => {
    const { category } = token
    expect(category).toBeDefined()
    expect(category).toBe(CATEGORY_TYPES.EMAIL_FRAGMENT)
  })

  const invalidFragmentTokens = [{ token: '{{insertEmailBuilder[]}}' }]
  determineTokenCategory(invalidFragmentTokens)
  expect(invalidFragmentTokens[0].category).toBeDefined()
  expect(invalidFragmentTokens[0].category).toBe(CATEGORY_TYPES.UNKNOWN)
})

test('Detecting template fragment tokens', () => {
  const tokensArray = [{ token: '{{emailTemplateFragment}}' }]
  determineTokenCategory(tokensArray)

  tokensArray.forEach((token) => {
    const { category } = token
    expect(category).toBeDefined()
    expect(category).toBe(CATEGORY_TYPES.TEMPLATE_FRAGMENT)
  })

  const fakeTokens = [{ token: '{{emailTemplateFragment[]}}' }]
  determineTokenCategory(fakeTokens)
  expect(fakeTokens[0].category).toBeDefined()
  expect(fakeTokens[0].category).toBe(CATEGORY_TYPES.UNKNOWN)
})

test('Detecting signature transaction receipt tokens', () => {
  const tokensArray = [
    { token: '{{insertCallSample}}' },
    { token: '{{insertCallSample[]}}' },
    { token: '{{insertOrderLine}}' },
    { token: '{{insertSignature}}' },
  ]
  determineTokenCategory(tokensArray)

  tokensArray.forEach((token) => {
    const { category } = token
    expect(category).toBeDefined()
    expect(category).toBe(CATEGORY_TYPES.SIGNATURE)
  })
})

test('Detecting unsubscribe link tokens', () => {
  const tokensArray = [
    { token: '{{unsubscribe_product_link}}' },
    { token: '{{unsubscribe_product_link[]}}' },
  ]
  determineTokenCategory(tokensArray)

  tokensArray.forEach((token) => {
    const { category } = token
    expect(category).toBeDefined()
    expect(category).toBe(CATEGORY_TYPES.UNSUBSCRIBE)
  })
})

test('Detecting Vault tokens', () => {
  const tokensArray = [
    { token: '{{$}}' },
    { token: '{{$23}}' },
    { token: '{{DynamicContentLink}}' },
    { token: '{{ISILink}}' },
    { token: '{{PieceLink}}' },
    { token: '{{PILink}}' },
    { token: '{{surveyLink}}' },
  ]
  determineTokenCategory(tokensArray)

  tokensArray.forEach((token) => {
    const { category } = token
    expect(category).toBeDefined()
    expect(category).toBe(CATEGORY_TYPES.VAULT)
  })
})

test('Detecting user input tokens', () => {
  const tokensArray = [
    { token: '{{customText}}' },
    { token: '{{customText()}}' },
    { token: '{{customText(1)}}' },
    { token: '{{customText(dsf)}}' },
    { token: '{{customText(1,2)}}' },
    { token: '{{customText[]}}' },
    { token: '{{customText[1|2|3]}}' },
    { token: '{{customText[Mr|Mrs|Ms|Miss|Dr|]}}' },
    { token: '{{customRichText}}' },
  ]
  determineTokenCategory(tokensArray)

  tokensArray.forEach((token) => {
    const { category } = token
    expect(category).toBeDefined()
    expect(category).toBe(CATEGORY_TYPES.USER_INPUT)
  })
})

test('Token category summary count', () => {
  const veevaTokens = [
    {
      line: 1,
      category: CATEGORY_TYPES.EMAIL_FRAGMENT,
      token: '{{insertEmailFragments}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.EMAIL_FRAGMENT,
      token: '{{insertEmailFragments}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.VAULT,
      token: '{{$20}}',
    },
    {
      line: 1,
      category: CATEGORY_TYPES.UNSUBSCRIBE,
      token: '{{unsubscribe_product_link}}',
    },
  ]

  const categorySummary = getTokenCategorySummary(veevaTokens)
  expect(categorySummary[CATEGORY_TYPES.EMAIL_FRAGMENT]).toBe(2)
  expect(categorySummary[CATEGORY_TYPES.VAULT]).toBe(1)
  expect(categorySummary[CATEGORY_TYPES.UNSUBSCRIBE]).toBe(1)
  expect(categorySummary[CATEGORY_TYPES.SIGNATURE]).toBe(0)
})
