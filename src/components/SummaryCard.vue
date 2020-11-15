<template lang="pug">
  v-card(
    rounded
    outlined
    color="rgb(246,250,250)"
    height="100%"
    elevation="6"
    :class="highlight ? 'highlighted' : ''"
    @click.native="$emit('click')"
  )
    v-card-title
      | {{ mainText }}
      v-tooltip(v-if="showMainTextTooltip" bottom)
        template(#activator="{ on, attrs }")
          v-icon(
            v-bind="attrs"
            v-on="on"
            small
            color="grey lighten-1"
          ).pl-1 mdi-help-circle
        span {{ mainTextTooltipText }}
    v-card-text
      v-row(no-gutters align="center").standard-card-text-height
        v-col(cols="6" sm="6").pa-4
          v-chip(
            text-color="white"
            :color="chipColor"
          )
            | {{ changePercentage }}
            v-icon(right small) {{ `mdi-arrow-${isPositive ? 'up' : 'down'}` }}
        v-col(cols="6" sm="6").text-right.pa-4
          p.mb-0.grey--text.text--lighten-1 {{ firstContent.text }}
          div.d-flex.align-items-center.mb-2.justify-end
            v-icon(
              v-if="firstContent.showIcon"
              small
              color="orange"
            ).pr-2 {{ firstContent.icon }}
            span.content-value.font-weight-bold {{ firstContent.value }}
          p.mb-0.grey--text.text--lighten-1 {{ secondContent.text }}
          div.d-flex.align-items-center.mb-2.justify-end
            v-icon(
              v-if="secondContent.showIcon"
              small
              color="orange"
            ).pr-2 {{ secondContent.icon }}
            span.content-value.font-weight-bold {{ secondContent.value }}
    v-divider
    v-card-actions.px-8.footer-text
      span.grey--text.text--lighten-1 {{ footerContent.text }}
      v-spacer
      span(v-if="footerContent.value")
        v-icon(
          v-if="footerContent.showIcon"
          x-small
          color="orange"
        ).pr-2 {{ footerContent.icon }}
        span.grey--text.text--lighten-1 {{ footerContent.value }}
</template>

<script>
export default {
  name: 'dashboard',
  props: {
    mainText: {
      type: String,
      default: ''
    },
    showMainTextTooltip: {
      type: Boolean,
      default: false
    },
    mainTextTooltipText: {
      type: String,
      default: 'Help'
    },
    changePercentage: {
      type: String,
      default: ''
    },
    chipColor: {
      type: String,
      default: 'primary'
    },
    isPositive: {
      type: Boolean,
      default: false
    },
    firstContent: {
      type: Object,
      default: () => { }
    },
    secondContent: {
      type: Object,
      default: () => { }
    },
    footerContent: {
      type: Object,
      default: () => { }
    },
    highlight: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.content-value {
  font-size: 24px;
}

.standard-card-text-height {
  min-height: 174px;
}

.footer-text {
  font-size: 14px;
}

.highlighted {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 255, 0.14),
    0px 6px 10px 0px rgba(0, 0, 255, 0.14),
    0px 1px 18px 0px rgba(0, 0, 255, 0.14) !important;
  border-color: rgba(132,151,210);
}
</style>
