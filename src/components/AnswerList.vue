<template>
    <div class="answer-list">  
      <router-link to="/" type="button" class="btn btn-default"><span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span> to poll list</router-link>  
      <h2>{{currentQuestion}}</h2>
      <div class="list-group">        
        <a class="list-group-item" v-for="answer in answerlist" @click.once="checkAnswer(answer)" :class="{'list-group-item-success': answer.mark, 'disabled': classDisable(answer)}"><span class="item-text">{{answer.text}}</span><span class="badge">{{answer.count}}</span></a>
      </div>          
    </div>
</template>

<script>
import { blexec } from '@/polls_bl.js'

export default {
  name: 'AnswerList',
  data () {
    return {
      answerlist: [],
      currentQuestion: '',
      userMark: false
    }
  },
  mounted: function () {
    this.getList()
  },
  methods: {
    getList: function () {
      var self = this
      self.$data.currentQuestion = self.$route.params.questionName
      blexec({
        'cmd': 'answer.list',
        'question': parseInt(self.$route.params.id, 10)
      }, function (ans) {
        if (ans.result) {
          // todo если есть хоть один замаркерный - заблокировать ввод
          for (var i = 0; i < ans.result.length; i++) {
            if (ans.result[i].mark) {
              self.$data.userMark = true
              break
            }
          }
          self.$data.answerlist = ans.result
        }
      })
    },
    checkAnswer: function (_answ) {
      var self = this
      if (self.$data.userMark) {
        return
      }
      blexec({
        'cmd': 'answer.check',
        'id': _answ.id
      }, function (ans) {
        if (!ans.error) {
          self.$data.userMark = true
          console.log('userMark', self.$data.userMark)
        }
      })
    },
    classDisable: function (_answ) {
      return (!_answ.mark && this.$data.userMark)
    }
  }
}
</script>
