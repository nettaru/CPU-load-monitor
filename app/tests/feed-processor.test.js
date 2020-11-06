import FeedProcessor from '../scripts/feed-processor';
import { feed, hostName, appName } from './mock-data';

describe('FeedProcessor', () => {
  const { hosts, apps } = FeedProcessor(feed);
  it('Returns connected hosts entities mapped by host name', () => {
    expect(Object.keys(hosts).length).toBe(5);
    const host = hosts[hostName];
    expect(host.topApps().length).toBe(2);
  });

  it('Returns application entities mapped by app name', () => {
    expect(Object.keys(apps).length).toBe(3);
    const app = apps[appName];
    expect(app.apdex).toBe(100);
  });
});