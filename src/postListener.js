window.xkit = Object.assign(window.xkit || {}, {
  postListener: {
    callbacks: [],
    addCallback: function(callback) {
      callback();
      this.callbacks.push(callback);
    },
    removeCallback: function(callback) {
      this.callbacks = this.callbacks.filter(i => i !== callback);
    },
    postClass: undefined,
    observer: new MutationObserver(function(mutations) {
      const postClass = window.xkit.postListener.postClass;
      const newPosts = !!mutations.filter(({addedNodes}) => {
        if (!addedNodes[0] || !addedNodes[0].classList) {
          return false;
        }
        return addedNodes[0].classList.contains(postClass);
      }).length;

      if (newPosts) {
        window.xkit.postListener.callbacks.forEach(i => i());
      }
    })
  }
});

window.tumblr.getCssMap().then(cssMap => {
  const [timelineClass] = cssMap['timeline'];
  const timeline = document.querySelector(`.${timelineClass}`);

  window.xkit.postListener.postClass = cssMap['listTimelineObject'][0];
  window.xkit.postListener.observer.observe(timeline, {
    childList: true,
    subtree: true,
  });
});

export default window.xkit.postListener;
