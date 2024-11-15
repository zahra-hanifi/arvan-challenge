<template>
  <div
    class="flex justify-center items-center gap-1 border border-grey-400 w-fit mx-auto rounded"
  >
    <CBtn
      color="transparent"
      :disabled="disabled || model === 1"
      class="!h-8 !w-8 !min-h-0 !min-w-0 !border-l-0 !border-y-0 !border-r border-r-grey-400 !rounded-none"
      content-class="!p-0"
      @click="selectPrev"
    >
      &lt;
    </CBtn>

    <CBtn
      v-for="(item, index) in displayItems"
      :key="index"
      :disabled="disabled || !item || endPageNumber === 1"
      color="transparent"
      class="!h-8 !w-8 !min-h-0 !min-w-0 !rounded-none border-r border-r-grey-400"
      :class="{
        '!bg-transparent': disabled || !item || endPageNumber === 1,
      }"
      :content-class="[
        {
          '!text-blue': item === model && endPageNumber !== 1,
        },
        '!p-0',
      ]"
      wrapper-class="!font-normal"
      @click="selectNumber(item)"
    >
      {{ item || '...' }}
    </CBtn>

    <CBtn
      color="transparent"
      class="!h-8 !w-8 !min-h-0 !min-w-0 !border-0"
      :class="{
        '!bg-transparent': disabled || model === endPageNumber,
      }"
      content-class="!p-0"
      :disabled="disabled || model === endPageNumber"
      @click="selectNext"
      >&gt;</CBtn
    >
  </div>
</template>

<script>
import vModel from '../../mixins/vModel'
import CBtn from './CBtn.vue'

export default {
  name: 'CPagination',
  components: { CBtn },
  mixins: [vModel],
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    itemsPerPage: {
      type: [Number, String],
      default: 10,
      validator(value) {
        return !isNaN(value)
      },
    },
    itemsCount: {
      type: [Number, String],
      required: true,
      validator(value) {
        return !isNaN(value)
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    endPageNumber() {
      if (+this.itemsPerPage <= 0) return 1
      const itemsCount = Number(this.itemsCount)
      const itemsPerPage = Number(this.itemsPerPage)
      const division = itemsCount / itemsPerPage
      const result = Math.ceil(division)
      return +result || 1
    },
    displayItems() {
      const centerDisplayItems = []
      const currentPage = +this.model

      if (this.endPageNumber <= 7) {
        centerDisplayItems.push(
          ...Array.from({ length: this.endPageNumber - 1 }, (_, i) => i + 2)
        ) // start numbers
      } else if (currentPage > 4 && currentPage < this.endPageNumber - 3) {
        centerDisplayItems.push(
          ...[
            '',
            currentPage - 1,
            currentPage,
            currentPage + 1,
            '',
            this.endPageNumber,
          ]
        )
      } else if (currentPage > 4 && currentPage >= this.endPageNumber - 3) {
        centerDisplayItems.unshift('')
        centerDisplayItems.push(
          ...Array.from({ length: 5 }, (_, i) => this.endPageNumber - 4 + i) // end numbers
        )
      } else {
        centerDisplayItems.push(...Array.from({ length: 4 }, (_, i) => i + 2)) // start numbers
        centerDisplayItems.push('')
        centerDisplayItems.push(this.endPageNumber)
      }

      return [1, ...centerDisplayItems]
    },
  },
  mounted() {
    if (!this.model) this.model = 1
  },
  methods: {
    selectNumber(v) {
      this.model = v
    },
    selectPrev() {
      if (this.model > 1) this.model = this.model - 1
    },
    selectNext() {
      if (this.model < this.endPageNumber) this.model = this.model + 1
    },
  },
}
</script>
