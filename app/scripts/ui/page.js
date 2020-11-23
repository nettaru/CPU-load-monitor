import Header from './header';
import { domElementFromDescription } from '../utils';

const elementDescription = {
  tag: 'div',
  attributes: { id: 'page' }
};

export default function Page(store) {
  const headerEl = Header(store);
  const page = domElementFromDescription(elementDescription);
  page.append(headerEl);

  return page;
};