import Toggle from '../../scripts/ui/toggle';
import Store from '../../scripts/store';
import { feed } from '../mock-data';

describe('Toggle', () => {
  const store = Store(feed);
  const element = Toggle(store);
  const input = element.querySelector('input');

  it('Creates the toggle element', () => {
    expect(element.id).toBe('toggle');
    expect(input).not.toBe(null);
  });

  it('Element notifies store when it\'s value changes', () => {
    const spy = jest.spyOn(store, 'dispatch').mockImplementation(() => {});
    input.click();
    expect(spy).toHaveBeenCalled();
  });
});