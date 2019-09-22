import {cloneWithUpdate, reactLoaded} from '/src/util.js';
import webcrack3 from '/src/webcrack3.js';

const someFeatures = [
  'RedpopDesktopDashboard',
  'RedpopMessaging',
  'RedpopMessagingDesktop',
  'RedpopPostForm',
  'BetaFeedbackButton',
  'RedpopActivityPage',
];

const featureFlagsModuleKey = () =>
  Object.entries(webcrack3.moduleFunctions).find(([key, func]) =>
    someFeatures.filter(i => func.toString().indexOf(i) != -1).length > 2
  )[0];

const firstChildStateNode = (root) => {
  let current = root;
  while (current = current.child) {
    if (current.stateNode) {
      return current.stateNode;
    }
  }
}

reactLoaded.then(() => {
  const FeatureFlags = webcrack3.require(featureFlagsModuleKey());
  const rootFiber = document.querySelector('#root')._reactRootContainer._internalRoot.current;

  const currentFeatures = rootFiber.child.pendingProps.children.props.features;
  const newFeatures = {...currentFeatures};
  Object.values(FeatureFlags.a).forEach(f => newFeatures[f] = true);

  const newProps = cloneWithUpdate(rootFiber.child.pendingProps,
    ['children', 'props', 'features'], newFeatures);
  rootFiber.child.pendingProps = newProps;

  // I don't know enough about React yet to say if this actually helps.
  firstChildStateNode(rootFiber).forceUpdate();
});
