const postListener = {
  callbacks: [],
  addCallback(callback) {
    callback();
    this.callbacks.push(callback);
  },
  removeCallback(callback) {
    this.callbacks = this.callbacks.filter(i => i !== callback);
  },
  postClass: undefined,
  observer: new MutationObserver(mutations => {
    const newPosts = mutations.find(({addedNodes}) => {
      for (const addedNode of addedNodes) {
        if (addedNode.classList && addedNode.classList.contains(postListener.postClass)) {
          return true;
        }
      }
    }) !== undefined;

    if (newPosts) {
      postListener.callbacks.forEach(i => i());
    }
  }),
};

window.tumblr.getCssMap().then(cssMap => {
  postListener.postClass = cssMap['listTimelineObject'][0];
  postListener.observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

export default postListener;
