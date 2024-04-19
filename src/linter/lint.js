const fileEmailFragment = require('./file/email-fragment')
const fileTemplateFragment = require('./file/template-fragment')
const tokenEmailFragment = require('./token/email-fragment')
const tokenInput = require('./token/input')
const {TYPES} = require('./token/type')

module.exports = {
  file: {
    emailFragment: fileEmailFragment,
    templateFragment: fileTemplateFragment,
  },
  token: {
    type: TYPES,
    emailFragment: tokenEmailFragment,
    input: tokenInput,
  },
}
