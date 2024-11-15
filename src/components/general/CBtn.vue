<template>
  <button
    :type="type"
    :class="wrapperClasses"
    :disabled="disabled"
    @click.stop="click"
  >
    <span :class="contentClasses">
      <slot></slot>
    </span>

    <CLoading v-if="loading" class="absolute" />
  </button>
</template>

<script>
import CIcon from './CIcon.vue'
import CLoading from './CLoading.vue'

export default {
  name: 'CBtn',
  components: {
    CIcon,
    CLoading,
  },
  props: {
    block: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    size: { type: String, default: 'md' },
    wrapperClass: [String, Object, Array],
    contentClass: [String, Object, Array],
    color: { type: String, default: 'primary' },
    type: { type: String, default: 'button' },
  },
  computed: {
    wrapperClasses() {
      const defaultClasses =
        'flex items-center justify-center font-medium outline-none duration-150 relative rounded'

      const disabledClasses =
        '!text-grey-400 !cursor-default !pointer-events-none border border-grey-100'

      const fontSizeClasses = 'text-xs sm:text-base'
      const sizeClasses = 'min-h-[38px] sm:min-h-[40px]'
      const colorClasses = this.getColorClasses()
      const isTransparent = this.color === 'transparent'
      const isOutlined = this.color?.endsWith('outlined')

      return [
        defaultClasses,
        fontSizeClasses,
        sizeClasses,
        this.disabled ? disabledClasses : colorClasses,
        {
          'w-full': this.block,
          'bg-grey-100': this.disabled && !isTransparent && !isOutlined,
        },
        this.wrapperClass,
      ]
    },
    contentClasses() {
      const defaultClasses =
        'flex items-center justify-center gap-x-2 w-full whitespace-nowrap'

      const paddingClasses = 'py-2 px-5'

      return [
        defaultClasses,
        paddingClasses,
        { 'opacity-0': this.loading },
        this.contentClass,
      ]
    },
  },
  methods: {
    getColorClasses() {
      switch (this.color) {
        case 'primary':
          return 'bg-blue !text-white border-2 border-blue'
        case 'primary-outlined':
          return 'bg-transparent !text-dark-blue border-2 border-solid border-dark-blue'
        case 'transparent':
          return ''
      }
    },
    click($event) {
      if (this.loading) return
      // Todo: fix event bubbling
      // this.$emit('click', $event)
    },
  },
}
</script>
