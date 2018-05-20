<template>
    <div class="poll-list">
    <router-link to="/add" type="button" class="btn btn-primary">Add questionnaire</router-link>
      <div class="list-group">
        <a class="list-group-item" v-for="poll in polllist" v-on:click="openPoll(poll)">
          <span class="item-text">{{poll.question}} (<span class="text-muted small">{{poll.createdate}}</span>)</span>
          <span class="badge">{{poll.anscounter}}</span>
        </a>
      </div>
    </div>
</template>

<script>
import { blexec } from '@/polls_bl.js'

export default {
  name: 'PollList',
  data () {
    return {
      polllist: []
    }
  },
  mounted: function () {
    this.getList()
  },
  methods: {
    getList: function () {
      var self = this
      blexec({
        'cmd': 'question.list'
      }, function (ans) {
        if (ans.result) {
          self.$data.polllist = ans.result
        }
      })
    },
    openPoll: function (_poll) {
      this.$router.push({
        name: 'AnswerList',
        params: {
          questionName: _poll.question,
          id: _poll.id
        }
      })
    }
  }
}
</script>

<style>
.poll-list .list-group {
  margin-top: 8px;
}
</style>
