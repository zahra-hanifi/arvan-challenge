export default {
  beforeDestroy() {
    if (this.observer) this.observer.disconnect()
  },
  methods: {
    observe(element, callback, config) {
      this.observer = new MutationObserver(callback)
      this.observer.observe(element, config)
    },
  },
}
