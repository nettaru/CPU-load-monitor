import Header from './header';
import AppsContainer from './apps-container';
import { domElementFromDescription } from '../utils';

const elementDescription = {
  tag: 'div',
  attributes: { id: 'page' }
};

export default function Page(store) {
  const headerEl = Header(store);
  const appsContainerEl = AppsContainer(store);
  const page = domElementFromDescription(elementDescription);
  page.append(headerEl, appsContainerEl);

  return page;
};