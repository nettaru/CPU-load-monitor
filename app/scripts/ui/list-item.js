import { createNestedElement } from '../utils';

export default function ListItem(item, index) {
  const onListItemClick = () => {
    alert(`Application release number: ${item.version}`);
  };

  const elementDescription = {
    parent: {
      tag: 'li',
      attributes: { class: 'list-item', tabindex: index },
      listeners: { click: onListItemClick }
    },
    children: [{
        tag: 'span',
        attributes: { class: 'apdex' },
        properties: { textContent: item.apdex }
    }, {
      tag: 'span',
      attributes: { class: 'app-name' },
      properties: { textContent: item.name }
    }]
  };

  return createNestedElement(elementDescription);
};