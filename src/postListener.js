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
    const {postClass, callbacks} = postListener;

    const newPosts = mutations.some(({addedNodes}) => {
      for (const addedNode of addedNodes) {
        if ((addedNode.classList && addedNode.classList.contains(postClass))
        || addedNode.querySelector(`.${postClass}`) !== null) {
          return true;
        }
      }
    });

    if (newPosts) {
      callbacks.forEach(i => i());
    }
  }),
};

window.tumblr.getCssMap().then(cssMap => {
  postListener.postClass = cssMap['listTimelineObject'][1];
  postListener.observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

export default postListener;
