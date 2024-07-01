const { GRADE } = require('./grading')

module.exports = {
  GRADE,
  token: {
    consent: require('./token/consent'),
    content: require('./token/content'),
    emailFragment: require('./token/email-fragment'),
    signature: require('./token/signature'),
    unsubscribe: require('./token/unsubscribe-link'),
    userInput: require('./token/user-input'),
    vault: require('./token/vault'),
  },
}
