import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Project from './views/Project.vue'
import Task from './views/Task.vue'
import Note from './views/Note.vue'
import Prediction from './views/Prediction.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/project',
      name: 'project',
      component: Project
    },
    {
      path: '/task',
      name: 'task',
      component: Task
    },
    {
      path: '/note',
      name: 'note',
      component: Note
    },
    {
      path: '/prediction',
      name: 'prediction',
      component: Prediction
    }
  ]
})
