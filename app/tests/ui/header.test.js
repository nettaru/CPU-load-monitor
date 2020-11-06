import Header from '../../scripts/ui/header';
import { feed } from '../mock-data';
import Store from '../../scripts/store';

describe('Header', () => {
  const store = Store(feed);
  const element = Header(store);

  it('Creates the header element', () => {
    expect(element.id).toBe('header');
  });

  it('Header element includes the correct text', () => {
    const text = element.textContent;
    expect(text.startsWith('Apps by Host')).toBe(true);
  });

  it('Header element includes user email', () => {
    const text = element.textContent;
    expect(text.includes('averylongemailaddress@companyname.com')).toBe(true);
  });

  it('Header element includes toggle view checkbox', () => {
    expect(element.querySelector('#toggle')).not.toBe(null);
  });
});