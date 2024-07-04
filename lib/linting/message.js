const { GRADE } = require('./grading')

/**
 *
 */
class Message {
  constructor(messageObj) {
    const { grade, message } = messageObj
    this.grade = grade
    this.message = message ? message : ''
  }

  /**
   * @returns {GRADE}
   */
  getGrade = () => {
    return this.grade
  }

  /**
   * @returns {String}
   */
  getMessage = () => {
    return this.message
  }
}

/**
 *
 */
class TokenMessage extends Message {
  constructor(messageObj) {
    super(messageObj)

    const { line, token } = messageObj
    this.line = line
    this.token = token
  }

  /**
   * @returns {String}
   */
  getMessage = () => {
    return `line: ${this.line}\t${this.token}\n\t ${this.message}\n`
  }
}

/**
 *
 */
class DuplicateMessage extends Message {
  constructor(messageObj) {
    super(messageObj)
  }
}

module.exports = {
  Message,
  TokenMessage,
  DuplicateMessage,
}
