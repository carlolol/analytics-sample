import Vue from 'vue'
import store from './store'
import faker from 'faker'

/**
 * @typedef {object} Reward
 * @property {string} id
 * @property {string} createdAt
 * @property {string} redeemedAt
 * @property {number} amount
 */

store.registerModule('reward', {
  namespaced: true,
  state: {
    /** @type {Reward[]} rewards */
    rewards: []
  },
  getters: { },
  actions: {
    generateRewards (ctx) {
      const reward = []
      const amount = Math.floor(Math.random() * 200)

      for (let i = 0; i < amount; i++) {
        const createdAt = Math.floor(Math.random() * 2) ? faker.date.recent(0) : faker.date.past()
        reward.push({
          id: faker.random.uuid(),
          createdAt,
          redeemedAt: Math.floor(Math.random() * 2) ? faker.date.future(0, createdAt) : '',
          amount: Math.floor(Math.random() * 10) * 1000
        })
      }

      ctx.commit('updateRewards', { items: reward, upsert: true })
    }
  },
  mutations: {
    /**
     * @param state
     * @param {object} opts
     * @param {Reward[]} opts.items
     * @param {boolean} opts.upsert
     * @param {boolean} opts.remove
     */
    updateRewards ({ rewards }, opts) {
      const { items, upsert, remove } = opts

      items.forEach(item => {
        const index = rewards.findIndex(b => b.id === item.id)

        if (~index) {
          if (remove) {
            Vue.delete(rewards, index, item)
          } else {
            Vue.set(rewards, index, item)
          }
          return
        }

        if (upsert) rewards.push(item)
      })
    }
  }
})
