<template lang="pug">
  v-app#app
    nav-bar(v-if="isAuthenticated")
    v-main
      router-view
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  },
  created () {
    this.branches.forEach(branch => {
      this.$store.dispatch('sales/generateSales', branch.id)
    })
    this.$store.dispatch('reward/generateRewards')
  },
  data: () => ({

  }),
  computed: {
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated']
    },
    branches () {
      return this.$store.state.branch.branches
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
