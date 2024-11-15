import mutationObserver from './mutationObserver.js'

export default {
  mixins: [mutationObserver],
  methods: {
    observeChildElements(element, addedNodesCallback, removedNodesCallback) {
      const callback = (mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(addedNodesCallback)
            mutation.removedNodes.forEach(removedNodesCallback)
          }
        }
      }

      const config = { childList: true, subtree: true }

      this.observe(element, callback, config)
    },
  },
}
