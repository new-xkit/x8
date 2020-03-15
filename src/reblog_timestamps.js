import {classList, element, indexBy, reactFiber, reactLoaded} from '/src/util.js';
import postListener from '/src/postListener.js';
import webcrack3 from '/src/webcrack3.js';

const allClasses = name => classList(webcrack3.findExportedName(name));

const parentWithProp = (fiber, propName) => {
  if (!fiber.memoizedProps) {
    fiber = reactFiber(fiber);
  }
  while (fiber && !fiber.memoizedProps.hasOwnProperty(propName)) {
    fiber = fiber.return;
  }
  return fiber;
};

const addTimestampsToPost = async postElement => {
  if (postElement.querySelector('.xkit-post-timestamp') !== null) {
    return;
  }

  const post = parentWithProp(postElement, 'timelineObject');
  const {
    timelineObject: {trail, content, id: postId, timestamp: postTimestamp},
    appContext: {apiFetch},
  } = post.memoizedProps;

  if (trail.length) {
    const reblogHeaders = indexBy(
      postElement.querySelectorAll(allClasses('reblogHeader')),
      header => reactFiber(header).return.return.key,
    );

    trail.map(async({post: {id}, blog: {uuid}}) => {
      const {response: {timestamp}} = await apiFetch(`/v2/blog/${uuid}/posts/${id}`);

      if (reblogHeaders[id].querySelector('.xkit-reblog-timestamp') === null) {
        reblogHeaders[id].append(reblogTimestampEl(timestamp));
      }
    });

    if (content.length) {
      reblogHeaders[String(postId)].append(reblogTimestampEl(postTimestamp));
    }
  } else {
    postElement.querySelector('header').append(postTimestampEl(postTimestamp));
  }
};

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
    article header[role="banner"] {
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

const reblogTimestamps = () => document.querySelectorAll('article').forEach(addTimestampsToPost);
reactLoaded.then(() => postListener.addCallback(reblogTimestamps));
