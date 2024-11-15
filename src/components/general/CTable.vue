<template>
  <div>
    <slot v-if="loading" name="loading"></slot>
    <table v-else class="w-full">
      <thead v-show="showHeader">
        <slot name="headers">
          <tr class="w-full">
            <th
              v-for="heading in _headers"
              :key="heading.value"
              :class="[
                headerClasses,
                getAlignmentClass(heading.align),
                { 'cursor-pointer': heading.sortable },
              ]"
              :dir="heading.dir || undefined"
              @click="sort(heading.sortable, heading.value)"
            >
              <CIcon v-if="heading.icon" :icon="heading.icon" />
              {{ heading.text }}
            </th>
          </tr>
        </slot>
      </thead>
      <tbody>
        <tr
          v-for="(rowItem, key) in slicedItems"
          :key="key"
          :class="[rowClasses]"
          @click="handleClick(rowItem)"
        >
          <td
            v-for="(rowData, index) in _headers"
            :key="index"
            :class="[
              getAlignmentClass(rowData.align),
              sizeClass,
              'text-sm 2xl:text-base text-grey-800',
            ]"
            :dir="rowData.dir || undefined"
          >
            <slot :name="rowData.value" :item="rowItem">
              <span v-if="rowData.value === 'counter'">{{ key + 1 }}</span>

              <span>{{ rowItem[rowData.value] }}</span>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <slot name="footer"></slot>
    <CPagination
      v-model="_page"
      class="mt-6"
      :loading="initializing"
      :items-per-page="itemsPerPage"
      :items-count="itemsCount"
      :link-path="linkPath"
      @input="paginate"
    />
  </div>
</template>

<script>
import CIcon from './CIcon.vue'
import CPagination from './CPagination.vue'
import vModel from '../../mixins/vModel.js'

export default {
  name: 'CTable',
  components: {
    CPagination,
    CIcon,
  },
  mixins: [vModel],
  props: {
    page: {
      type: [Number, String],
      default: 1,
      validator(value) {
        return !isNaN(value)
      },
    },
    initializing: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    itemsCount: {
      type: [Number, String],
      required: true,
      validator(value) {
        return !isNaN(value)
      },
    },
    itemsPerPage: {
      type: [Number, String],
      default: 10,
      validator(value) {
        return !isNaN(value)
      },
    },
    size: {
      type: String,
      validator(value) {
        return ['md', 'sm', 'lg'].includes(value)
      },
    },
    hoverEffect: {
      type: Boolean,
      default: false,
    },
    linkPath: {
      type: String,
      default: undefined,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      sortOptions: {
        sortType: null,
        sortKey: null,
      },
      isAllItemsSelected: false,
    }
  },
  computed: {
    _page: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('paginate', val)
      },
    },
    _headers() {
      return this.isMobile ? this.mobileHeaders : this.headers
    },
    mobileHeaders() {
      return this.headers.filter((item) => !item.hideInMobile)
    },
    slicedItems() {
      if (this.itemsPerPage >= this.items.length) return this.items
      const start = this.itemsPerPage * (this.page - 1)
      const end = start + this.itemsPerPage
      return this.items.slice(start, end)
    },
    headerClasses() {
      const defaultClasses = 'group text-base font-bold p-2 whitespace-nowrap'
      const bgAndBorderClasses = this.getHeaderClasses()
      return [defaultClasses, bgAndBorderClasses]
    },
    rowClasses() {
      const defaultClasses = 'border-b border-grey-400 last-of-type:border-0'
      const hoverClasses = this.hoverEffect ? 'hover:bg-grey-300' : undefined
      return [defaultClasses, hoverClasses]
    },
    sizeClass() {
      switch (this.size) {
        case 'sm':
          return 'p-2'
        case 'lg':
          return 'py-4 px-2'
        default:
          return 'py-3 px-2'
      }
    },
    isMobile() {
      return false
    },
  },
  methods: {
    handleClick(item) {
      this.$emit('click', item)
    },
    getAlignmentClass(alignment) {
      switch (alignment) {
        case 'right':
          return 'text-start'
        case 'left':
          return 'text-end'
        case 'center':
          return 'text-center'
        default:
          return 'text-start'
      }
    },
    getHeaderClasses() {
      return 'text-grey-700 bg-grey-300 first-of-type:pl-2 last-of-type:pr-2'
    },
    sort(isSortable, sortKey) {
      if (!isSortable) return
      this.sortOptions.sortKey = sortKey
      switch (this.sortOptions.sortType) {
        case null:
          return (this.sortOptions.sortType = 'asc')
        case 'asc':
          return (this.sortOptions.sortType = 'desc')
        case 'desc':
          return (this.sortOptions.sortType = null)
      }
    },
    paginate(value) {
      this._page = value
    },
  },
}
</script>
