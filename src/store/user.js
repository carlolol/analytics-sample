import store from './store'
import faker from 'faker'

/**
 * @typedef {object} User
 * @property {string} uuid
 * @property {string} username
 * @property {string} fullname
 * @property {string} createdAt
 */

/**
 * @param {number} amount
 * @returns {User[]} list of user
*/
const generateUsers = (amount) => {
  const users = []
  for (let i = 0; i < amount; i++) {
    users.push({
      uuid: faker.random.uuid(),
      username: faker.internet.userName(),
      fullname: faker.name.findName(),
      createdAt: Math.floor(Math.random() * 2) ? faker.date.recent(0) : faker.date.past()
    })
  }
  return users
}

store.registerModule('user', {
  namespaced: true,
  state: {
    /** @type {User[]} */
    users: generateUsers(285)
  },
  getters: {
    getDailyAverage ({ users }) {
      const reducedDates = users.reduce((acc, user) => {
        const date = user.createdAt.substring(0, 10)
        if (date in acc) {
          acc[date]++
        } else {
          acc[date] = 1
        }

        return acc
      }, [{}])
      return reducedDates.reduce((acc, date) => (acc += Object.keys(date)[0]), 0) / reducedDates.length
    }
  },
  actions: { },
  mutations: { }
})
