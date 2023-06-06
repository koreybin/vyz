import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import voucher from './modules/voucher'
import children from './modules/children'
import getters from './getters'
import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    voucher,
    children
  },
  getters,
  plugins: [
    createPersistedstate({
      key: 'children',
      paths: ['children'],
      storage: window.sessionStorage
    })
  ]
})

export default store
