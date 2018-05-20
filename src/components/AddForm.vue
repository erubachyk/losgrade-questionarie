<template>
    <div class="add-form">
        <h3>Add new poll <small>You need fill question and two or more answers.</small></h3>
        <form>
            <div class="form-group" v-bind:class="{ 'has-error': q_text_error, 'has-feedback': q_text_error }">
                <label for="exampleInputPoll">Question</label>
                <input type="text" v-model="add_q_text" @keyup="qInputKeyUp()" class="form-control" id="exampleInputPoll" placeholder="enter your question" required>
                <span v-if="q_text_error" class="glyphicon glyphicon-warning-sign form-control-feedback" aria-hidden="true"></span>
                <span v-if="q_text_error" id="inputWarning2Status" class="sr-only">(warning)</span>
            </div>
            <div class="form-group">
                <label for="exampleInputAnswer">Answers</label>
                <input v-for="(ai, index) in answerInputs" v-on:keyup="inputAnswerKeyUp(ai, index)" type="text" v-model="answerInputs[index]" class="form-control" id="exampleInputAnswer" placeholder="answer">                
            </div>
            <button type="submit" class="btn btn-primary" v-on:click.stop.prevent="addNewPoll" v-bind:disabled="checkForm()">Add new poll</button>
            <button class="btn btn-default" v-on:click.stop.prevent="goBack">Cancel</button>
        </form>    
    </div>
</template>

<script>
import { blexec } from '@/polls_bl.js'

export default {
  name: 'AddForm',
  data () {
    return {
      inputCount: 1,
      add_q_text: '',
      q_text_error: false,
      answerInputs: []
    }
  },
  mounted: function () {
    this.$data.answerInputs.push('')
    this.$data.answerInputs.push('')
  },
  methods: {
    addNewPoll: function () {
      var self = this
      if (self.$data.add_q_text) {
        blexec({
          'cmd': 'question.add',
          'text': self.$data.add_q_text
        }, function (addans) {
          if (!addans.error && addans.result) {
            blexec({
              'cmd': 'answer.add',
              'answers': self.getGoodAnswers(),
              'qid': parseInt(addans.result, 10)
            }, function (ans) {
              if (!ans.error && ans.result) {
                self.goBack()
              }
            })
          }
        })
      }
    },
    goBack: function () {
      this.$router.push('/')
    },
    getGoodAnswers: function () {
      var goodAnswers = []
      for (var i = 0; i < this.$data.answerInputs.length; i++) {
        if (this.$data.answerInputs[i]) {
          goodAnswers.push(this.$data.answerInputs[i])
        }
      }
      return goodAnswers
    },
    checkForm: function () {
      return !(!!this.$data.add_q_text && this.getGoodAnswers().length > 1)
    },
    qInputKeyUp: function () {
      this.$data.q_text_error = !this.$data.add_q_text
    },
    inputAnswerKeyUp: function (_ai, index) {
      if (!this.$data.q_text_error && !this.$data.add_q_text) {
        this.$data.q_text_error = true
      }
      if (_ai && (index === (this.$data.answerInputs.length - 1))) {
        this.$data.answerInputs.push('')
      }
    }
  }
}
</script>

<style>
#exampleInputAnswer {
  margin-bottom: 8px;
}
</style>
