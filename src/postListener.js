const postListener = {
  callbacks: [],
  addCallback(callback) {
    callback();
    this.callbacks.push(callback);
  },
  removeCallback(callback) {
    this.callbacks = this.callbacks.filter(i => i !== callback);
  },
  observer: new MutationObserver(mutations => {
    const selector = '[data-id]';
    const newPosts = mutations.some(({addedNodes}) => {
      for (const addedNode of addedNodes) {
        if (addedNode.matches(selector) || addedNode.querySelector(selector) !== null) {
          return true;
        }
      }
    });

    if (newPosts) {
      postListener.callbacks.forEach(i => i());
    }
  }),
};

postListener.observer.observe(document.body, {
  childList: true,
  subtree: true,
});

export default postListener;
