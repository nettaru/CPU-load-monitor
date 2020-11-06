import HostTopApps from './host-top-apps';
import { domElementFromDescription } from '../utils';
import { ACTION_TYPES, NUM_OF_DISPLAYED_TOP_APPS } from '../config';

const viewClass = 'grid-view';
const elementDescription = {
  tag: 'div',
  attributes: { id: 'apps-container', class: viewClass }
};

const renderHostsTopApps = (hosts, apps) => {
  return Object.values(hosts).map((host, index) => HostTopApps(host, apps, index*NUM_OF_DISPLAYED_TOP_APPS+1));
};

// Renders hosts and subscribe to view mode changes:
export default function AppsContainer(store) {
  const { hosts, apps } = store.getState();
  const hostsElementsList = renderHostsTopApps(hosts, apps);
  const container = domElementFromDescription(elementDescription);
  container.append(...hostsElementsList);

  const toggleViewMode = (change) => {
    if (change !== ACTION_TYPES.TOGGLE_CHANGE) return;
    const action = store.getState().showList ? 'remove' : 'add';
    container.classList[action](viewClass);
  };

  store.subscribe(toggleViewMode);
  return container;
};