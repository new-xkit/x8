
const allClasses = name => classList(webcrack3.findExportedName(name));

const addTimestampsToPost = element => {
  const post = reactFiber(element).return;
  const {
    timelineObject: {trail, content, id: postId, timestamp},
    appContext: {apiFetch},
  } = post.memoizedProps;

  if (trail.length) {
    const reblogHeaders = indexBy(
      element.querySelectorAll(allClasses('reblogHeader')),
      header => reactFiber(header).return.return.key
    );

    trail.map(async ({post: {id}, blog: {uuid}}) => {
      const {response: {timestamp}} = await apiFetch(`/v2/blog/${uuid}/posts/${id}`);
      reblogHeaders[id].append(reblogTimestampEl(timestamp));
    });

    if (content.length) {
      reblogHeaders[String(postId)].append(reblogTimestampEl(timestamp));
    }
  } else {
    element.querySelector('header').append(postTimestampEl(timestamp));
  }
}

const reblogTimestampEl = timestamp => element('span', span => {
  span.textContent = new Date(timestamp * 1000).toLocaleString();
  span.classList.add('xkit-reblog-timestamp');
});

const postTimestampEl = timestamp => element('span', span => {
  span.textContent = new Date(timestamp * 1000).toLocaleString();
  span.classList.add('xkit-post-timestamp');
});

document.head.append(element('style', style => {
  style.textContent = `
    header {
      flex-wrap: wrap;
    }

    .xkit-reblog-timestamp {
      margin-left: auto;
      color: var(--gray-40);
      font-weight: normal;
      display: flex;
      align-items: center;
    }

    .xkit-post-timestamp {
      flex-basis: 100%;
      font-size: 14px;
      padding-top: 0.3ex;
      line-height: 1;
      color: var(--gray-40);
    }
  `;
}));

document.querySelectorAll("article").forEach(addTimestampsToPost);
