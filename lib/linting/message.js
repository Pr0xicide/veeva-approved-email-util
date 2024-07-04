class Message {
  constructor(messageObj) {
    const { grade, message } = messageObj
    this.grade = grade
    this.message = message ? message : ''
  }

  getGrade = () => {
    return this.grade
  }

  getMessage = () => {
    return this.message
  }
}

class TokenMessage extends Message {
  constructor(messageObj) {
    super(messageObj)

    const { line, token } = messageObj
    this.line = line
    this.token = token
  }

  getMessage = () => {
    return `line: ${this.line}\t${this.token}\n\t ${this.message}\n`
  }
}

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
