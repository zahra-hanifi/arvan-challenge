<template>
  <div :class="classes">
    <div
      v-if="label || $slots.label || $slots.labelAside"
      class="flex items-center justify-between"
    >
      <label
        v-if="label || $slots.label"
        :for="uniqueId"
        :class="labelClasses"
        :hidden="hideLabel || undefined"
      >
        <slot name="label">{{ label }}</slot>
      </label>

      <slot name="labelAside"></slot>
    </div>

    <div :class="wrapperClasses" @click="focusOnInput">
      <textarea v-if="multiline" v-bind="attributes" v-on="events" />

      <input v-else v-bind="attributes" v-on="events" />

      <slot></slot>
    </div>

    <div
      v-if="validations?.length || hint"
      class="text-xs flex justify-between"
      :class="{ 'min-h-[24px]': fixedBottomSpacing }"
    >
      <div v-if="error" class="input-error-message text-error">
        {{ error }}
      </div>

      <div
        v-else-if="hint && (focused || persistentHint)"
        class="flex items-center gap-x-2 text-grey-500"
      >
        {{ hint }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import CIcon from './CIcon.vue'
import { validate } from '../../utils/validations'

export default {
  name: 'CInput',
  components: {
    CIcon,
  },
  props: {
    modelValue: String,
    id: String,
    label: String,
    hideLabel: { type: Boolean, default: false },
    placeholder: String,
    persistentPlaceholder: { type: Boolean, default: true },
    hint: String,
    persistentHint: { type: Boolean, default: false },
    type: { type: String, default: 'text' },
    inputmode: { type: String, default: undefined },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    wrapperClass: [String, Object, Array],
    inputClass: [String, Object, Array],
    autofocus: { type: Boolean, default: false },
    autocomplete: String,
    validations: Array,
    fixedBottomSpacing: { type: Boolean, default: true },
    state: {
      type: String,
      default: null,
      validator(value) {
        return ['error', null].includes(value)
      },
    },
    multiline: { type: Boolean, default: false },
    rows: {
      type: [Number, String],
      default: 4,
      validator(value) {
        return !isNaN(value)
      },
    },
    maxlength: {
      type: [Number, String],
      validator(value) {
        return !isNaN(value)
      },
    },
  },
  setup(props) {
    const randomNum = String(Math.floor(Math.random() * 9))
    const uniqueId = ref(props.id || `input-${randomNum}`)
    const error = ref(null)
    const focused = ref(false)

    return {
      uniqueId,
      error,
      focused,
    }
  },
  computed: {
    showPlaceholder() {
      return !this.focused || this.persistentPlaceholder
    },
    attributes() {
      return {
        id: ref(this.uniqueId).value,
        value: this.model,
        placeholder: this.showPlaceholder ? this.placeholder : undefined,
        class: this.inputClasses,
        type: this._type,
        inputmode: this._inputmode,
        readonly: this.readonly,
        disabled: this.disabled,
        autocomplete: this.autocomplete,
        'has-validation': this.validations?.length ? true : undefined,
        maxlength: this.maxlength,
        rows: this.multiline ? this.rows : undefined,
      }
    },
    events() {
      return {
        reset: this.resetError,
        input: this.input,
        change: this.change,
        blur: this.blur,
        keydown: this.keydown,
        keypress: this.keypress,
        keyup: this.keyup,
        focus: this.focus,
        paste: this.paste,
        click: this.click,
      }
    },
    model: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
    _type() {
      if (['number', 'decimal'].includes(this.type)) return 'text'
      return this.type
    },
    _inputmode() {
      switch (this.type) {
        case 'number':
        case 'decimal':
          return 'numeric'
        default:
          return this.inputmode
      }
    },
    classes() {
      const defaultClasses = 'flex flex-col gap-y-1'

      return [defaultClasses]
    },
    wrapperClasses() {
      const defaultClasses = 'flex items-center gap-x-2 rounded-lg duration-150'
      const colorClasses = 'bg-white'
      const borderClasses = 'border border-solid border-transparent'
      const stateClasses = this.disabled ? '' : this.getStateClasses()
      const paddingClasses = this.multiline ? 'py-2 px-3' : 'p-1 px-3'
      const sizeClasses = this.multiline ? '' : 'h-[38px] sm:h-[40px]'

      return [
        defaultClasses,
        colorClasses,
        borderClasses,
        stateClasses,
        paddingClasses,
        sizeClasses,
        this.wrapperClass,
      ]
    },
    inputClasses() {
      const defaultClasses = 'font-normal w-full grow outline-none'
      const colorClasses =
        'bg-transparent text-grey-800 placeholder:text-grey-500'
      const fontSizeClasses = 'text-sm'
      const sizeClasses = this.multiline ? '' : 'h-[38px] sm:h-[40px]'

      return [
        defaultClasses,
        colorClasses,
        fontSizeClasses,
        sizeClasses,
        this.inputClass,
      ]
    },
    labelClasses() {
      const defaultClasses = 'font-medium'
      const disabledClasses = 'text-grey-500'
      const colorClasses = 'text-grey-800'
      const fontSizeClasses = 'text-xs sm:text-sm'

      return [
        defaultClasses,
        this.disabled ? disabledClasses : colorClasses,
        fontSizeClasses,
      ]
    },
  },
  mounted() {
    if (this.autofocus) this.focusOnInput()

    this.$watch('modelValue', this.validateAndSetError)
  },
  methods: {
    getStateClasses() {
      const focusClasses =
        this.autofocus || this.focused ? '!border-blue caret-blue' : ''
      const errorClasses = '!border-red caret-red'

      if (this.error) return errorClasses

      switch (this.state) {
        case 'error':
          return errorClasses
        default:
          return focusClasses
      }
    },
    focusOnInput() {
      const inputEl = document.getElementById(this.uniqueId)
      if (!inputEl) return
      inputEl.focus()
      this.focused = true
    },
    input($event) {
      const initialCursorPosition = $event.target.selectionEnd
      const initialValue = $event.target.value

      const inputEl = document.getElementById(this.uniqueId)
      if (inputEl) inputEl.value = this.modelValue

      this.validateAndSetError(initialValue)

      this.model = initialValue

      this.setNewCursorPosition($event, initialCursorPosition, initialValue)
    },
    setNewCursorPosition($event, initialCursorPosition, initialValue) {
      this.$nextTick(() => {
        $event.target.selectionEnd =
          initialCursorPosition === 0
            ? 0
            : initialCursorPosition + this.model.length - initialValue.length
      })
    },
    validateAndSetError(value) {
      const { error } = validate(this.validations, value, this.uniqueId)
      this.error = error
    },
    resetError() {
      this.error = null
    },
    change($event) {
      this.$emit('change', $event)
    },
    blur($event) {
      this.focused = false
      this.$emit('blur', $event)
    },
    focus($event) {
      this.focused = true
      this.$emit('focus', $event)
    },
    keydown($event) {
      this.$emit('keydown', $event)
    },
    keypress($event) {
      this.$emit('keypress', $event)
    },
    keyup($event) {
      this.$emit('keyup', $event)
    },
    paste($event) {
      this.$emit('paste', $event)
    },
    click($event) {
      this.$emit('click', $event)
    },
  },
}
</script>

<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  background: transparent; /* Firefox */
  -webkit-transition-delay: 86400s; /* 24h - Chrome */
  transition-delay: 86400s; /* 24h - Chrome */
}
</style>
