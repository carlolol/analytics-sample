<template lang="pug">
  div
    v-app-bar(
      app
      flat
      elevate-on-scroll
      color="white"
    )
      v-app-bar-nav-icon(@click.stop="showSideBar = !showSideBar")
      v-spacer
      v-menu(
        offset-y
        open-on-hover
      )
        template(#activator="{ on, attrs }")
          div(
            v-on="on"
            v-bind="attrs"
            text
          ).pr-5
            v-avatar(color="rgb(224,232,242)" size="38")
              v-icon(color="white") mdi-account
            span.px-5 {{ loggedInUser.fullname }}
            v-icon(small) mdi-chevron-down
        v-list
          v-list-item
            v-list-item-title Logout
      v-divider(inset vertical)
      v-btn(icon small).ml-5.mr-7
        v-badge(
          overlap
          color="orange"
          content="3"
        )
          v-icon mdi-bell-outline
      v-divider(inset vertical)
      v-icon.px-5 mdi-comment-question-outline
    v-navigation-drawer(
      v-model="showSideBar"
      :clipped="!$isSmallAndDown"
      :app="!$isSmallAndDown"
      :fixed="$isSmallAndDown"
      :temporary="$isSmallAndDown"
    )
      v-list(nav)
        v-list-item-group
          v-list-item(
            v-for="(navigation, i) in navigations"
            :key="i"
            :to="navigation.path"
          )
            v-list-item-title {{ navigation.name }}
</template>

<script>
import navigations from '@/constants/navigations'

export default {
  name: 'navbar',
  data: () => ({
    showSideBar: false,
    navigations
  }),
  computed: {
    loggedInUser () {
      return this.$store.getters['auth/user']
    }
  },
  methods: { }
}
</script>
