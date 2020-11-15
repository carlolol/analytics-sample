import store from './store'
import faker from 'faker'

/**
 * @typedef {object} Branch
 * @property {string} id
 * @property {string} name
 */

store.registerModule('branch', {
  namespaced: true,
  state: {
    /** @type {Branch[]} branch */
    branches: [
      { id: faker.random.uuid(), name: 'Makati' },
      { id: faker.random.uuid(), name: 'BGC Taguig' },
      { id: faker.random.uuid(), name: 'Mall of Asia, Pasay' },
      { id: faker.random.uuid(), name: 'Quezon City' },
      { id: faker.random.uuid(), name: 'Greenhills' },
      { id: faker.random.uuid(), name: 'Fairview' },
      { id: faker.random.uuid(), name: 'Marikina' },
      { id: faker.random.uuid(), name: 'Alabang' },
      { id: faker.random.uuid(), name: 'Laguna' },
      { id: faker.random.uuid(), name: 'Bulacan' },
      { id: faker.random.uuid(), name: 'Cubao' },
      { id: faker.random.uuid(), name: 'Araneta' },
      { id: faker.random.uuid(), name: 'Manila' },
      { id: faker.random.uuid(), name: 'Ortigas' },
      { id: faker.random.uuid(), name: 'Lipa' }
    ]
  },
  getters: {
    getBranchById: state => id => {
      return state.branches.find(branch => branch.id === id)
    },
    getBranchesRanked ({ branches }, getters, rootState, rootGetters) {
      const branchesWithTotalSales = branches.map(branch => ({
        ...branch,
        totalSales: rootGetters['sales/getTotalSalesByBranchId'](branch.id),
        change: {
          text: ((rootGetters['sales/getTotalSalesByBranchId'](branch.id) /
            rootGetters['sales/getAverageOrderValue']) * 100).toFixed(2) + '%',
          icon: Math.floor(Math.random() * 2) ? 'mdi-arrow-up' : 'mdi-arrow-down'
        }
      }))

      return branchesWithTotalSales
        .sort((a, b) => {
          return b.totalSales - a.totalSales
        })
        .map((b, i) => ({ ...b, rank: `${i + 1}.` }))
    }
  },
  actions: { },
  mutations: { }
})
