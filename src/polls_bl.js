import { PollItem, Answer } from './pollitem.js'

export var release = false
var fixedData = []
var fixedDataAnswer = []

function blphp (blobj, onreadystatechange) {
  var xhr = new XMLHttpRequest()
  xhr.open('POST', '/vue/vue_polls/static/bl/vuepolls.php', true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify(blobj))
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log('resulet', xhr.readyState, xhr.responseText, xhr.result_cat)
      if (onreadystatechange) {
        onreadystatechange.call(xhr)
      }
      this.$router.push('/')
    }
  }
}

function getDateStr (_date) {
  return `${_date.getDate()}.${(_date.getMonth() + 1)}.${String(_date.getFullYear()).slice(2)}`
}

function getNewId () {
  var lastId = 0
  for (var i = 0; i < fixedData.length; i++) {
    if (fixedData[i].id > lastId) {
      lastId = fixedData[i].id
    }
  }
  return (lastId + 1)
}

function generateFixtureData () {
  fixedData.push(new PollItem(1, 'What you would like to eat on daily basis?', '25.03.18', 5))
  fixedData.push(new PollItem(2, 'How to make company beter?', '01.03.18', 59))
  fixedData.push(new PollItem(3, 'What you choose better?', '28.04.17', 21))
  fixedData.push(new PollItem(4, 'Are you living healthy life?', '01.04.2018', 7))
  fixedDataAnswer = []
  fixedDataAnswer.push(new Answer(1, 'Lentils', 20, 1))
  fixedDataAnswer.push(new Answer(2, 'Rice', 10, 1))
  fixedDataAnswer.push(new Answer(3, 'Goji', 7, 1))
  fixedDataAnswer.push(new Answer(4, 'Buckwheat', 3, 1))
  fixedDataAnswer.push(new Answer(5, 'Pasta', 0, 1))
  fixedDataAnswer.push(new Answer(6, 'Chia', 4, 1))

  fixedDataAnswer.push(new Answer(11, 'Bonuses', 5, 2))
  fixedDataAnswer.push(new Answer(12, 'Flexible working time', 1, 2))
  fixedDataAnswer.push(new Answer(13, 'More paid vacation days', 3, 2))
  fixedDataAnswer.push(new Answer(14, 'Management', 2, 2))

  fixedDataAnswer.push(new Answer(23, 'Meat', 4, 3))
  fixedDataAnswer.push(new Answer(24, 'Soup', 1, 3))
  fixedDataAnswer.push(new Answer(25, 'Salat', 0, 3))
  fixedDataAnswer.push(new Answer(26, 'Fish', 0, 3))

  fixedDataAnswer.push(new Answer(27, 'Yes', 0, 4))
  fixedDataAnswer.push(new Answer(28, 'No', 0, 4))
}

function getAnswerList (_id) {
  var res = []
  for (var i = 0; i < fixedDataAnswer.length; i++) {
    if (fixedDataAnswer[i].question === _id) {
      res.push(fixedDataAnswer[i])
    }
  }
  return res
}

function getItem (_id, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].id === _id) {
      return array[i]
    }
  }
  return null
}

function blfixture (blobj, onreadystatechange) {
  var ans = null
  switch (blobj.cmd) {
    case 'question.list':
      if (fixedData.length < 1) {
        generateFixtureData()
      }
      ans = fixedData
      break
    case 'question.add':
      var _newId = getNewId()
      fixedData.push(new PollItem(_newId, blobj.text, getDateStr(new Date()), 0))
      ans = _newId
      break
    case 'answer.list':
      if (fixedDataAnswer.length < 1) {
        generateFixtureData()
      }
      ans = getAnswerList(blobj.question)
      break
    case 'answer.add':
      var answers = blobj.answers
      var qId = blobj.qid
      for (var i = 0; i < answers.length; i++) {
        var answText = answers[i]
        fixedDataAnswer.push(new Answer(40, answText, 0, qId))
      }
      ans = 'DONE'
      break
    case 'answer.check':
      // отметить пункт
      var answ = getItem(blobj.id, fixedDataAnswer)
      answ.count++
      answ.mark = true
      // обновить счетчик в вопросе
      var question = getItem(answ.question, fixedData)
      question.anscounter++
      ans = 'DONE'
      break
  }
  if (onreadystatechange) {
    onreadystatechange.call(this, {
      result: ans,
      error: null
    })
  }
  console.log('bl', blobj, ans)
}

export var blexec = function (blobj, onreadystatechange) {
  if (release === true) {
    blphp(blobj, onreadystatechange)
  } else {
    blfixture(blobj, onreadystatechange)
  }
}
