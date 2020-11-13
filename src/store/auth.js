import store from './store'

/**
 * @typedef {object} User
 * @property {string} uuid
 * @property {string} username
 * @property {string} fullname
 */

store.registerModule('auth', {
  namespaced: true,
  state: {
    /** @type {User} user */
    user: {
      uuid: '7eb945c4-a38d-4db7-b1eb-b9a9845f46ef',
      username: 'katrina',
      fullname: 'Katrina'
    }
  },
  getters: {
    isAuthenticated ({ user }) {
      let credentials = localStorage.getItem('credentials')
      credentials = credentials ? JSON.parse(credentials) : null
      return !!user || !!credentials
    },
    user ({ user }) {
      let credentials = localStorage.getItem('credentials')
      credentials = credentials ? JSON.parse(credentials) : null
      return user || credentials
    }
  },
  actions: {
    /**
     * @param ctx
     * @param {User} user
     */
    login (ctx, user) {
      // TODO: implement
    },

    revalidateLogin (ctx) {
      // TODO: implement
    },

    logout (ctx) {
      // TODO: implement
    }
  },
  mutations: {
    /**
     * @param state
     * @param {User} user
     */
    setUser (state, user) {
      state.user = user || null
    }
  }
})
