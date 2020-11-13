import Vue from 'vue'
import store from './store'
import faker from 'faker'

/**
 * @typedef {object} Sales
 * @property {string} id
 * @property {'sales' | 'revenue'} type
 * @property {string} branchId
 * @property {string} createdAt
 * @property {number} amount
 */

store.registerModule('sales', {
  namespaced: true,
  state: {
    /** @type {Sales[]} sales */
    sales: []
  },
  getters: {
    getSalesByBranchId: state => branchId => {
      return state.sales.filter(sales => sales.branchId === branchId)
    },
    getSalesByBranchIdAndType: state => (branchId, type) => {
      return state.sales.filter(sales => sales.branchId === branchId && sales.type === type)
    },
    getAggregatedSales: state => (from, to, branchId, type) => {
      const aggregatedSales = state.sales.reduce((acc, sale) => {
        const date = sale.createdAt.substring(0, 10)

        // Skip item that is out of range
        if (!((from <= new Date(date).getTime()) && (to >= new Date(date).getTime()))) return acc
        // Skip item that is not the same with the given branchId
        if (branchId && branchId !== sale.branchId) return acc
        // Skip item that is not the same with the given type
        if (type && type !== sale.type) return acc

        if (date in acc) {
          if (sale.type in acc[date]) {
            acc[date][sale.type] += sale.amount
          } else {
            acc[date][sale.type] = sale.amount
          }
        } else {
          acc[date] = {}
          acc[date][sale.type] = sale.amount
        }

        return acc
      }, [{}])

      return aggregatedSales
    }
  },
  actions: {
    /**
     * @param ctx
     * @param {string} branchId
     */
    generateSales (ctx, branchId) {
      const sales = []
      const amount = Math.floor(Math.random() * 200)

      for (let i = 0; i < amount; i++) {
        sales.push({
          id: faker.random.uuid(),
          type: Math.floor(Math.random() * 2) ? 'sales' : 'revenue',
          branchId,
          createdAt: Math.floor(Math.random() * 2) ? faker.date.recent(0) : faker.date.past(),
          amount: Math.floor(Math.random() * 10) * 1000
        })
      }

      ctx.commit('updateSales', { items: sales, upsert: true })
    }
  },
  mutations: {
    /**
     * @param state
     * @param {object} opts
     * @param {Sales[]} opts.items
     * @param {boolean} opts.upsert
     * @param {boolean} opts.remove
     */
    updateSales ({ sales }, opts) {
      const { items, upsert, remove } = opts

      items.forEach(item => {
        const index = sales.findIndex(b => b.id === item.id)

        if (~index) {
          if (remove) {
            Vue.delete(sales, index, item)
          } else {
            Vue.set(sales, index, item)
          }
          return
        }

        if (upsert) sales.push(item)
      })
    }
  }
})
