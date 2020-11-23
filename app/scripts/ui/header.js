import { createNestedElement } from '../utils';

const elementDescription = {
  parent: {
    tag: 'div',
    attributes: { id: 'header' }
  },
  children: [{
    tag: 'h1',
    properties: { textContent: 'Apps by Host' }
  }, {
    tag: 'span',
    attributes: { class: 'user' },
    properties: { textContent: 'for user averylongemailaddress@companyname.com' }
  }]
};

export default function Header(store) {
  const headerEl = createNestedElement(elementDescription);
  return headerEl;
};