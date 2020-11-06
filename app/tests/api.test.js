import API from '../scripts/api';
import { feed } from './mock-data';
import Store from '../scripts/store';

describe('API', () => {
  const hostName = ['7e6272f7-098e.dakota.biz'];
  const hostList = [hostName];
  const appName = 'Small Fresh Pants - Kautzer - Boyer, and Sons';

  let store, api;
  const initAPI = () => {
    store = Store(feed);
    api = API(store);
  };

  const countAppsForHost = (name) => {
    const host = store.getState().hosts[name];
    return Object.values(host.appsByApdex).reduce((accumelator, currValue) => {
      return accumelator + currValue.size;
    }, 0);
  };

  describe('getTopAppsByHost', () => {
    beforeEach(initAPI);

    it('Returns top applications for host name, sorted by apdex from highest to lowest', () => {
      const apps = api.getTopAppsByHost(hostName);
      expect(apps.length).toBe(2);
      expect(apps[0].apdex > apps[1].apdex).toBe(true);
    });

    it('Returns nothing if no host name is provided', () => {
      const apps = api.getTopAppsByHost();
      expect(apps).toBe(null);
    });

    it('Returns nothing if no host name doesn\'t exist in the data feed', () => {
      const apps = api.getTopAppsByHost('not a real host name!');
      expect(apps).toBe(null);
    });
  });

  describe('addAppToHosts', () => {
    beforeEach(initAPI);

    it('Does nothing if application name doesn\'t exist in the data feed', () => {
      const numInstalledApps = countAppsForHost(hostName);
      api.addAppToHosts('random name', hostList);
      expect(countAppsForHost(hostName)).toBe(numInstalledApps);
    });

    it('Adds application to hosts in list maintains top apps order', () => {
      let topApps = api.getTopAppsByHost(hostName);
      expect(topApps[0].apdex).toBe(68);

      const numInstalledApps = countAppsForHost(hostName);
      api.addAppToHosts('Third app', hostList);
      expect(countAppsForHost(hostName)).toBe(numInstalledApps + 1);

      topApps = api.getTopAppsByHost(hostName);
      expect(topApps[0].apdex).toBe(100);
    });
  });

  describe('removeAppFromHosts', () => {
    beforeEach(initAPI);

    it('Does nothing if application name doesn\'t exist in the data feed', () => {
      let topApps = api.getTopAppsByHost(hostName);
      expect(topApps[0].apdex).toBe(68);

      const numInstalledApps = countAppsForHost(hostName);
      api.removeAppFromHosts('Non existing app', hostList);
      expect(countAppsForHost(hostName)).toBe(numInstalledApps);

      topApps = api.getTopAppsByHost(hostName);
      expect(topApps[0].apdex).toBe(68);
    });

    it('Removes app from hosts in list and maintains top apps', () => {
      let topApps = api.getTopAppsByHost(hostName);
      expect(topApps[0].apdex).toBe(68);

      const numInstalledApps = countAppsForHost(hostName);
      api.removeAppFromHosts(appName, hostList);
      expect(countAppsForHost(hostName)).toBe(numInstalledApps - 1);

      topApps = api.getTopAppsByHost(hostName);
      expect(topApps[0].apdex).toBe(57);
    });

    it('Doesn\'t change apps list for a host, if app is not installed on host', () => {
      let topApps = api.getTopAppsByHost(hostName);
      expect(topApps[0].apdex).toBe(68);

      const numInstalledApps = countAppsForHost(hostName);
      api.removeAppFromHosts('Third app', hostList);
      expect(countAppsForHost(hostName)).toBe(numInstalledApps);

      topApps = api.getTopAppsByHost(hostName);
      expect(topApps[0].apdex).toBe(68);
    });
  });
});