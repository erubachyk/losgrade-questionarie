import Vue from 'vue'
import Router from 'vue-router'
import PollList from '@/components/List'
import AddForm from '@/components/AddForm'
import AnswerList from '@/components/AnswerList'

Vue.use(Router)
// list, id, edit/id, add
export default new Router({
  routes: [
    {
      path: '/',
      name: 'PollList',
      component: PollList
    },
    {
      path: '/add',
      name: 'AddForm',
      component: AddForm
    },
    {
      path: '/edit/:id',
      name: 'AnswerList',
      component: AnswerList,
      props: {
        questionName: ''
      }
    }
  ]
})
