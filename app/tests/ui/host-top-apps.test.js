import HostTopApps from '../../scripts/ui/host-top-apps';
import { host, apps } from '../mock-data';

describe('Host Top Apps', () => {
  const element = HostTopApps(host, apps);

  it('Creates the host top apps element', () => {
    expect(element.className).toBe('host-top-apps');
  });

  it('Element includes host name', () => {
    const text = element.textContent;
    expect(text.startsWith(host.name)).toBe(true);
  });

  it('Element includes list of apps', () => {
    expect(element.querySelector('.list').children.length).toBe(1);
  });
});