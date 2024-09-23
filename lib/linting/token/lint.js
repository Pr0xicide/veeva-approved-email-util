const { lint: lintContentTokens } = require('./content')
const { lint: lintEmailFragmentTokens } = require('./email-fragment')
const { lint: lintUserInputTokens } = require('./user-input')
const { lint: lintVaultTokens } = require('./vault')

const VEEVA_TOKEN_LINTERS = Object.freeze({
  content: lintContentTokens,
  'email fragment': lintEmailFragmentTokens,
  'user input': lintUserInputTokens,
  vault: lintVaultTokens,
})

module.exports = {
  VEEVA_TOKEN_LINTERS,
}
