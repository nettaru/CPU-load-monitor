import ListItem from '../../scripts/ui/list-item';
import { application } from '../mock-data';

describe('Host Top Apps', () => {
  const element = ListItem(application);

  it('Creates the list-item element', () => {
    expect(element.className).toBe('list-item');
  });

  it('Element includes apdex', () => {
    const text = element.textContent;
    expect(text.startsWith(application.apdex)).toBe(true);
  });

  it('Element includes name', () => {
    const text = element.textContent;
    expect(text.includes(application.name)).toBe(true);
  });

  it('Element opens alert window on click', () => {
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    element.click();
    expect(spy).toHaveBeenCalled();
  });
});