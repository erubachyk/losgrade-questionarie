/**
 * Вопрос
 * @class
 */
export var PollItem = (function () {
  /**
   * @constructor
   * @param {number} _id
   * @param {string} _question текст вопроса
   * @param {string} _createdate дата создания
   * @param {number} _anscounter число ответов
   * @param {boolean} _fixed нельзя удалять
   */
  function PollItem (_id, _question, _createdate, _anscounter, _fixed) {
    if (_fixed === void 0) { _fixed = false }
    this.id = _id
    this.question = _question
    this.createdate = _createdate
    this.anscounter = _anscounter
    this.fixed = _fixed
    this.ansArray = []
  }
  return PollItem
}())

/**
 * Ответ
 * @class
 */
export var Answer = (function () {
  /**
   * @constructor
   * @param {number} _id
   * @param {string} _text текст ответа
   * @param {number} _count число кликов
   */
  function Answer (_id, _text, _count, _question) {
    this.id = _id
    this.text = _text
    this.count = _count
    this.question = _question
    this.mark = false
  }
  return Answer
}())
