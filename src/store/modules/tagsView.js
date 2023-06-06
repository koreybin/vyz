const tagsView = {
  state: {
    majorVisitedViews: [{
      name: "dashboard",
      path: "/dashboard",
      title: "dashboard",
    }],
    minorVisitedViews: [{
      name: "dashboardacc",
      path: "/dashboardacc/dashboardacc",
      title: "dashboardacc",
    }],
    majorCachedViews: [
      {
        name: "dashboard",
        path: "/dashboard",
        title: "dashboard",
      }
    ],
    minorCachedViews: [
      {
        name: "dashboardacc",
        path: "/dashboardacc/dashboardacc",
        title: "dashboardacc",
      }
    ]
  },
  mutations: {
    ADD_MAJORVISITED_VIEWS: (state, view) => {
      if (state.majorVisitedViews.some(v => v.path === view.path)) return
      state.majorVisitedViews.push({
        name: view.name,
        path: view.path,
        title: view.meta.title || 'no-name'
      })
      if (!view.meta.noCache) {
        state.majorCachedViews.push(view.name)
      }
    },
    DEL_MAJORVISITED_VIEWS: (state, view) => {
      if (view.name == 'dashboard') return
      for (const [i, v] of state.majorVisitedViews.entries()) {
        if (v.path === view.path) {
          state.majorVisitedViews.splice(i, 1)
          break
        }
      }
      for (const i of state.majorCachedViews) {
        if (i === view.name) {
          const index = state.majorCachedViews.indexOf(i)
          state.majorCachedViews.splice(index, 1)
          break
        }
      }
    },
    DEL_MAJOROTHERS_VIEWS: (state, view) => {
      for (const [i, v] of state.majorVisitedViews.entries()) {
        if (v.path === view.path) {
          state.majorVisitedViews = state.majorVisitedViews.slice(i, i + 1)
          break
        }
      }
      for (const i of state.majorCachedViews) {
        if (i === view.name) {
          const index = state.majorCachedViews.indexOf(i)
          state.majorCachedViews = state.majorCachedViews.slice(index, i + 1)
          break
        }
      }
    },
    DEL_MAJORALL_VIEWS: (state) => {
      state.majorVisitedViews = [{
        name: "dashboard",
        path: "/dashboard",
        title: "dashboard",
      }]
      state.majorCachedViews = [{
        name: "dashboard",
        path: "/dashboard",
        title: "dashboard",
      }]
    },
    ADD_MINORVISITED_VIEWS: (state, view) => {
      if (state.minorVisitedViews.some(v => v.path === view.path)) return
      state.minorVisitedViews.push({
        name: view.name,
        path: view.path,
        title: view.meta.title || 'no-name'
      })
      if (!view.meta.noCache) {
        state.minorCachedViews.push(view.name)
      }
    },
    DEL_MINORVISITED_VIEWS: (state, view) => {
      if (view.name == 'dashboardacc') return
      for (const [i, v] of state.minorVisitedViews.entries()) {
        if (v.path === view.path) {
          state.minorVisitedViews.splice(i, 1)
          break
        }
      }
      for (const i of state.minorCachedViews) {
        if (i === view.name) {
          const index = state.minorCachedViews.indexOf(i)
          state.minorCachedViews.splice(index, 1)
          break
        }
      }
    },
    DEL_MINOROTHERS_VIEWS: (state, view) => {
      for (const [i, v] of state.minorVisitedViews.entries()) {
        if (v.path === view.path) {
          state.minorVisitedViews = state.minorVisitedViews.slice(i, i + 1)
          break
        }
      }
      for (const i of state.minorCachedViews) {
        if (i === view.name) {
          const index = state.minorCachedViews.indexOf(i)
          state.minorCachedViews = state.minorCachedViews.slice(index, i + 1)
          break
        }
      }
    },
    DEL_MINORALL_VIEWS: (state) => {
      state.minorVisitedViews = []
      state.minorCachedViews = [
        {
          name: "dashboardacc",
          path: "/dashboardacc/dashboardacc",
          title: "dashboardacc",
        }
      ]
    }
  },
  actions: {
    addMajorVisitedViews({ commit }, view) {
      commit('ADD_MAJORVISITED_VIEWS', view)
    },
    delMajorVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_MAJORVISITED_VIEWS', view)
        resolve([...state.majorVisitedViews])
      })
    },
    delMajorOthersViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_MAJOROTHERS_VIEWS', view)
        resolve([...state.majorVisitedViews])
      })
    },
    delMajorAllViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_MAJORALL_VIEWS')
        resolve([...state.majorVisitedViews])
      })
    },
    addMinorVisitedViews({ commit }, view) {
      commit('ADD_MINORVISITED_VIEWS', view)
    },
    delMinorVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_MINORVISITED_VIEWS', view)
        resolve([...state.minorVisitedViews])
      })
    },
    delMinorOthersViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_MINOROTHERS_VIEWS', view)
        resolve([...state.minorVisitedViews])
      })
    },
    delMinorAllViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_MINORALL_VIEWS')
        resolve([...state.minorVisitedViews])
      })
    },
  }
}

export default tagsView
