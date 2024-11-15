<template>
  <form @submit.prevent="$emit('submit')">
    <slot></slot>
  </form>
</template>

<script>
import { isNullOrUndefined } from '../../utils/validations'
import childElementsObserver from '../../mixins/observer/childElementsObserver'

export default {
  name: 'CForm',
  mixins: [childElementsObserver],
  props: {
    value: { type: Boolean, default: undefined },
  },
  data() {
    return {
      inputElements: null,
      inputStatuses: [],
      localFormIsValid: false,
    }
  },
  computed: {
    formIsValid: {
      get() {
        const hasVModel = !isNullOrUndefined(this.value)
        return hasVModel ? this.value : this.localFormIsValid
      },
      set(value) {
        this.localFormIsValid = value
        this.$emit('input', value)
      },
    },
  },
  mounted() {
    this.refreshFormState()

    this.observeChildElements(
      this.$el,
      this.refreshFormState,
      this.refreshFormState
    )
  },
  beforeDestroy() {
    this.removeEventListeners()
  },
  methods: {
    refreshFormState() {
      this.removeEventListeners()
      this.inputElements = this.$el.querySelectorAll(
        'input[has-validation], textarea[has-validation]'
      )

      this.addEventListeners()

      this.updateInputStatuses()
    },
    updateInputStatuses() {
      const inputElementsArr = Array.prototype.slice.call(this.inputElements)

      this.inputStatuses = inputElementsArr.map((inputElement) => {
        return {
          key: inputElement.id,
          value: (
            this.inputStatuses.find(
              (inputStatus) => inputStatus.key === inputElement.id
            ) || {
              value: false,
            }
          ).value,
        }
      })

      this.setFormIsValid()
    },
    setFormIsValid() {
      const values = this.inputStatuses.map((inputStatus) => inputStatus.value)
      this.formIsValid = values.every(Boolean)
    },
    addEventListeners() {
      if (!this.inputElements) return
      for (const inputEl of this.inputElements) {
        inputEl.addEventListener('validate', this.setInputStatus)
      }
    },
    removeEventListeners() {
      if (!this.inputElements) return
      for (const inputEl of this.inputElements) {
        inputEl.removeEventListener('validate', this.setInputStatus)
      }
    },
    setInputStatus($event) {
      const inputStatus = this.inputStatuses.find(
        (inputStatus) => inputStatus.key === $event.detail.key
      )

      if (!inputStatus) return

      inputStatus.value = $event.detail.value

      this.setFormIsValid()
    },
    validateAll() {
      return new Promise((resolve, reject) => {
        for (const inputEl of this.inputElements) {
          inputEl.dispatchEvent(new Event('input'))
        }

        this.$nextTick(() => resolve(this.formIsValid))
      })
    },
    resetValidations() {
      return new Promise((resolve, reject) => {
        for (const inputEl of this.inputElements) {
          inputEl.dispatchEvent(new Event('reset'))
        }

        this.$nextTick(() => resolve(this.formIsValid))
      })
    },
  },
}
</script>
