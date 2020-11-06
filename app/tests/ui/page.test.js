import Page from '../../scripts/ui/page';
import Store from '../../scripts/store';
import { feed } from '../mock-data';

describe('Page', () => {
  const store = Store(feed);
  const element = Page(store);

  it('Creates the page element', () => {
    expect(element.id).toBe('page');
  });

  it('Element includes header and applications container', () => {
    const header = element.querySelector('#header');
    const appsContainer = element.querySelector('#header');
    expect(header).not.toBe(null);
    expect(appsContainer).not.toBe(null);
  });
});