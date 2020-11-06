import Host from '../../scripts/models/host';
import { apps } from '../mock-data';

describe('Host', () => {
  const app = Object.values(apps)[0];

  
  it('Return list of top apps names sorted by apdex', () => {
    const host = new Host('test host');
    Object.values(apps).forEach(app => {
      host.addApplication(app.name, app.apdex);
    });
    const topApps = host.topApps();
    expect(topApps.length).toBe(5);
    expect(apps[topApps[0]].apdex).toBe(100);
    expect(apps[topApps[4]].apdex).toBe(30);
  });

  it('Allows adding application', () => {
    const host = new Host('test host');
    expect(host.topApps().length).toBe(0);
    host.addApplication(app.name, app.apdex);
    expect(host.topApps().length).toBe(1);
  })

  it('Allows removing application', () => {
    const host = new Host('test host');
    host.addApplication(app.name, app.apdex);
    expect(host.topApps().length).toBe(1);

    host.removeApplication(app.name, app.apdex);
    expect(host.topApps().length).toBe(0);
  })
});