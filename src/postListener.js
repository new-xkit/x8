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
    const newPosts = !!mutations.filter(({addedNodes}) => {
      if (!addedNodes[0] || !addedNodes[0].classList) {
        return false;
      }
      return addedNodes[0].classList.contains(postListener.postClass);
    }).length;

    if (newPosts) {
      postListener.callbacks.forEach(i => i());
    }
  }),
};

window.tumblr.getCssMap().then(cssMap => {
  const [timelineClass] = cssMap['timeline'];
  const timeline = document.querySelector(`.${timelineClass}`);

  postListener.postClass = cssMap['listTimelineObject'][0];
  postListener.observer.observe(timeline, {
    childList: true,
    subtree: true,
  });
});

export default postListener;
