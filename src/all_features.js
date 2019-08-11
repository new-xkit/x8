import {cloneWithUpdate, reactLoaded} from '/src/util.js';
import webcrack3 from '/src/webcrack3.js';

reactLoaded.then(() => {
  const FeatureFlags = webcrack3.findExportedName('FeatureFlags')[0];
  const rootFiber = document.querySelector('#root')._reactRootContainer._internalRoot.current;

  const currentFeatures = rootFiber.child.pendingProps.children.props.features;
  const newFeatures = {...currentFeatures};
  Object.values(FeatureFlags).forEach(f => newFeatures[f] = true);

  const newProps = cloneWithUpdate(rootFiber.child.pendingProps,
    ['children', 'props', 'features'], newFeatures);
  rootFiber.child.pendingProps = newProps;
  rootFiber.child.stateNode.forceUpdate();
});
