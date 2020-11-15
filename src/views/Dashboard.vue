<template lang="pug">
  v-container(fluid).dashboard-wrapper.pt-0
    v-row
      v-col(cols="12").white
        div.d-flex.align-center.px-4
          v-icon(color="blue" large) mdi-chart-arc
          span.pl-3.pr-2.page-title Analytics
          v-tooltip(bottom)
            template(#activator="{ on, attrs }")
              v-icon(
                v-bind="attrs"
                v-on="on"
                small
                color="grey lighten-1"
              ) mdi-help-circle
            span Help
      v-col(
        cols="12"
        :class="{'main-content-lg': !$isSmallAndDown}"
      )
        v-row
          v-col(
            v-for="(d, i) in cardData"
            sm="6"
            lg="3"
            cols="12"
            :key="i"
          )
            summary-card(
              v-bind="d"
              :highlight="selected === d.mainText"
              @click="selected = selected === d.mainText ? '' : d.mainText"
            )
      v-col(
        cols="12"
        :class="{'main-content-lg': !$isSmallAndDown}"
      )
        v-row
          v-col(
            sm="6"
            md="4"
            lg="3"
            cols="12"
          ).py-0
            v-select(
              v-model="selectedDateRange"
              solo
              flat
              dense
              outlined
              :items="dateFilters"
            )
          v-col(
            sm="6"
            md="4"
            lg="3"
            cols="12"
          ).py-0
            v-menu(
              v-model="showDateMenu"
              offset-y
              min-width="290px"
              transition="scale-transition"
              :close-on-content-click="false"
            )
              template(#activator="{ on, attrs }")
                v-text-field(
                  v-on="on"
                  v-bind="attrs"
                  v-model="dateRangeText"
                  solo
                  flat
                  dense
                  outlined
                  readonly
                  append-icon="mdi-calendar"
                  @click:append="showDateMenu = true"
                )
              v-date-picker(
                v-model="selectedDateRange"
                range
              )
        v-card(
          rounded
          outlined
          elevation="6"
        )
          v-card-title(style="background-color: rgb(245,249,252)").py-0
            v-row(align="center")
              v-col(
                md="auto"
                cols="12"
              ).py-0
                span
                  | Sales Overview
                  v-tooltip(bottom)
                    template(#activator="{ on, attrs }")
                      v-icon(
                        v-bind="attrs"
                        v-on="on"
                        small
                        color="grey lighten-1"
                      ).pl-2 mdi-help-circle
                    span Help
              v-spacer
              v-col(
                sm="auto"
                cols="12"
              )
                v-select(
                  v-model="selectedSalesType"
                  solo
                  flat
                  dense
                  outlined
                  hide-details
                  :items="salesTypeFilters"
                ).py-0
              v-col(
                sm="auto"
                cols="12"
              )
                v-select(
                  v-model="selectedBranch"
                  solo
                  flat
                  dense
                  outlined
                  hide-details
                  :items="branchFilters"
                ).py-0
          v-card-text
            div.d-flex.align-items-center.py-4
              v-row(align="center")
                v-col(cols="12" sm="auto")
                  h3.pr-2 Total:
                v-col(cols="auto")
                  p.mb-0 #[small Sales]
                  v-chip(
                    label
                    small
                    color="rgb(148,172,247)"
                    text-color="white"
                  ) Php {{ totalSales }}
                v-col(cols="auto")
                  p.mb-0 #[small Revenue]
                  v-chip(
                    label
                    small
                    color="rgb(86,211,191)"
                    text-color="white"
                  ) Php {{ totalRevenue }}
                v-col(cols="auto")
                  p.mb-0 #[small Generated Points]
                  v-chip(
                    label
                    small
                    color="rgb(190,133,220)"
                    text-color="white"
                  ) 1000 Points
                v-col(cols="auto")
                  p.mb-0 #[small Used Points]
                  v-chip(
                    label
                    small
                    color="rgb(190,133,220)"
                    text-color="white"
                  ) 1000 Points
            apexchart(
              type="bar"
              height="350"
              :series="series"
              :options="chartOptions"
            )
      v-col(
        cols="12"
        :class="{'main-content-lg': !$isSmallAndDown}"
      )
        v-row
          //- Branch Performance
          v-col(
            md="6"
            col="12"
          )
            v-card(
              rounded
              outlined
              elevation="6"
            )
              v-card-title(style="background-color: rgb(245,249,252)")
                | Branch Performance
                v-tooltip(bottom)
                  template(#activator="{ on, attrs }")
                    v-icon(
                      v-bind="attrs"
                      v-on="on"
                      small
                      color="grey lighten-1"
                    ).pl-2 mdi-help-circle
                  span Help
              v-card-text
                v-data-table(
                  :headers="branchHeaders"
                  :items="branchRankings"
                  :items-per-page="5"
                )
                  template(#item.change="{ item }")
                    span
                      | {{ item.change.text }}
                      v-icon(
                        small
                        :color="item.change.icon === 'mdi-arrow-up' ? 'rgb(137,224,187)' : 'rgb(246,197,130)'"
                        style="vertical-align: baseline;"
                      ).ml-1 {{ item.change.icon }}
          //- Rewards Performance
          v-col(
            md="6"
            col="12"
          )
            v-card(
              rounded
              outlined
              elevation="6"
            )
              v-card-title(style="background-color: rgb(245,249,252)")
                | Rewards Performance
                v-tooltip(bottom)
                  template(#activator="{ on, attrs }")
                    v-icon(
                      v-bind="attrs"
                      v-on="on"
                      small
                      color="grey lighten-1"
                    ).pl-2 mdi-help-circle
                  span Help
              v-card-text
                v-data-table(
                  :headers="rewardHeaders"
                  :items="branchRankings"
                  :items-per-page="5"
                )
                  template(#item.name="{ item }") {{ `Reward ${item.rank.substring(0, item.rank.length - 1)}` }}
                  template(#item.change="{ item }")
                    span
                      | {{ item.change.text }}
                      v-icon(
                        small
                        :color="item.change.icon === 'mdi-arrow-up' ? 'rgb(137,224,187)' : 'rgb(246,197,130)'"
                        style="vertical-align: baseline;"
                      ).ml-1 {{ item.change.icon }}
</template>

<script>
import { format, subDays } from 'date-fns'
import SummaryCard from '@/components/SummaryCard'

export default {
  name: 'dashboard',
  components: {
    SummaryCard
  },
  data: () => ({
    selected: '',
    showDateMenu: false,
    summaryData: [],
    dateFilters: [
      {
        text: 'Last 7 days',
        value: [
          subDays(new Date(), 7).toISOString().substring(0, 10),
          new Date().toISOString().substring(0, 10)
        ]
      },
      {
        text: 'Last 30 days',
        value: [
          subDays(new Date(), 30).toISOString().substring(0, 10),
          new Date().toISOString().substring(0, 10)
        ]
      }
    ],
    salesTypeFilters: [
      { text: 'Sales', value: 'sales' },
      { text: 'Revenue', value: 'revenue' },
      { text: 'All Transactions', value: 'all' }
    ],
    selectedDateRange: [
      subDays(new Date(), 7).toISOString().substring(0, 10),
      new Date().toISOString().substring(0, 10)
    ],
    selectedSalesType: 'all',
    selectedBranch: 'all',
    branchHeaders: [
      { text: '', sortable: false, value: 'rank', width: '1%' },
      { text: 'Branch', sortable: false, value: 'name' },
      { text: 'Total Sales (₱)', sortable: false, value: 'totalSales', align: 'end' },
      { text: '', sortable: false, value: 'change', align: 'end' }
    ],
    rewardHeaders: [
      { text: '', sortable: false, value: 'rank' },
      { text: 'Badge', sortable: false, value: 'name' },
      { text: 'Total Sales (₱)', sortable: false, value: 'totalSales', align: 'end' },
      { text: '', sortable: false, value: 'change', align: 'end' }
    ]
  }),
  computed: {
    lifetimeSales () {
      return this.$store.getters['sales/getLifetimeSalesTotal'] || 0
    },
    revenueSales () {
      return this.$store.getters['sales/getRevenueSalesTotal'] || 0
    },
    averageOrderValue () {
      return this.$store.getters['sales/getAverageOrderValue'] || 0
    },
    userCount () {
      return this.$store.state.user.users.length
    },
    userDailyAverage () {
      return this.$store.getters['user/getDailyAverage'].toFixed(2) || 0
    },
    totalRewardsAmount () {
      return this.$store.getters['reward/getTotalRewards'](false) || 0
    },
    totalRewardsRedeemedAmount () {
      return this.$store.getters['reward/getTotalRewards'](true) || 0
    },
    branchFilters () {
      return [{ text: 'All Branches', value: 'all' }]
        .concat(this.$store.state.branch.branches.map(branch => ({
          text: branch.name,
          value: branch.id
        })))
    },
    dateRangeText () {
      return this.selectedDateRange.map(d => format(new Date(d), 'd MMM yyyy')).join(' - ')
    },
    aggregatedSalesData () {
      return this.$store.getters['sales/getAggregatedSales'](
        new Date(this.selectedDateRange[0]),
        new Date(this.selectedDateRange[1]),
        this.selectedBranch === 'all' ? '' : this.selectedBranch,
        this.selectedSalesType === 'all' ? '' : this.selectedSalesType
      )
    },
    aggregatedSalesDataKeys () {
      return Object.keys(this.aggregatedSalesData)
    },
    cardData () {
      return [
        {
          mainText: 'Sales',
          changePercentage: '20%',
          isPositive: true,
          chipColor: 'rgb(148,172,247)',
          showMainTextTooltip: true,
          firstContent: {
            text: 'Lifetime Sales',
            showIcon: true,
            icon: 'mdi-currency-php',
            value: this.lifetimeSales
          },
          secondContent: {
            text: 'Revenue Sales',
            showIcon: true,
            icon: 'mdi-currency-php',
            value: this.revenueSales
          },
          footerContent: {
            text: 'Average Order Value',
            showIcon: true,
            icon: 'mdi-currency-php',
            value: this.averageOrderValue
          }
        },
        {
          mainText: 'Engagement',
          changePercentage: '20%',
          isPositive: false,
          chipColor: 'rgb(137,224,187)',
          firstContent: {
            text: 'Lifetime SMS Engagements',
            value: this.userCount
          },
          secondContent: {
            text: 'Daily Average',
            value: this.userDailyAverage
          },
          footerContent: {
            text: '20% decrease in 30 days'
          }
        },
        {
          mainText: 'Acquisition',
          changePercentage: '20%',
          isPositive: true,
          chipColor: 'rgb(246,197,130)',
          firstContent: {
            text: 'Registered Users',
            value: this.userCount
          },
          secondContent: {
            text: 'Daily Average',
            value: this.userDailyAverage
          },
          footerContent: {
            text: '20% increase in 30 days'
          }
        },
        {
          mainText: 'Rewards Program',
          changePercentage: '20%',
          isPositive: true,
          chipColor: 'rgb(203,168,232)',
          firstContent: {
            text: 'Redeemed Rewards',
            value: this.totalRewardsRedeemedAmount
          },
          secondContent: {
            text: 'Issued Rewards',
            value: this.totalRewardsAmount
          },
          footerContent: {
            text: '20% increase in 30 days'
          }
        }
      ]
    },
    sales () {
      return this.aggregatedSalesDataKeys.map(key => this.aggregatedSalesData[key].sales)
    },
    totalSales () {
      return this.sales.reduce((acc, curr) => (acc += curr), 0)
    },
    revenue () {
      return this.aggregatedSalesDataKeys.map(key => this.aggregatedSalesData[key].revenue)
    },
    totalRevenue () {
      return this.revenue.reduce((acc, curr) => (acc += curr), 0)
    },
    branchRankings () {
      return this.$store.getters['branch/getBranchesRanked']
    },
    series () {
      const sales = {
        name: 'Sales',
        data: this.sales
      }
      const revenue = {
        name: 'Revenue',
        data: this.revenue
      }
      switch (this.selectedSalesType) {
        case 'sales': {
          return [sales]
        }
        case 'revenue': {
          return [revenue]
        }
        default: {
          return [sales, revenue]
        }
      }
    },
    chartOptions () {
      return {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: { show: false }
        },
        plotOptions: {
          bar: { horizontal: false, columnWidth: '55%' }
        },
        dataLabels: { enabled: false },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        grid: {
          show: true,
          xaxis: { lines: { show: true } },
          yaxis: { lines: { show: true } }
        },
        xaxis: {
          categories: this.aggregatedSalesDataKeys.map(key => key)
        },
        yaxis: { show: true },
        fill: { opacity: 1 },
        tooltip: {
          y: {
            formatter: (val) => 'Php ' + val + '.00'
          }
        },
        colors: ['#7FA0FF', '#57D2BF']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-wrapper {
  background-color: rgb(242, 246, 249);

  .page-title {
    font-size: 32px;
  }

  .main-content-lg {
    padding-right: 48px;
    padding-left: 48px;
  }

}
</style>
