import { createNestedElement } from '../utils';
import ListItem from './list-item';

export default function HostTopApps(host, apps, hostIndex) {
  const elementDescription = {
    parent: {
      tag: 'div',
      attributes: { class: 'host-top-apps' }
    },
    children: [{
      tag: 'h3',
      properties: { textContent: host.name }
    }, {
      tag: 'ul',
      attributes: { class: 'list' }
    }]
  };

  const listItems = host.topApps().map((appName, index) => ListItem(apps[appName], hostIndex + index));
  const hostTopAppsEl = createNestedElement(elementDescription);
  hostTopAppsEl.querySelector('.list').append(...listItems);

  return hostTopAppsEl;
};