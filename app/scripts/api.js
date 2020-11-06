import { NUM_OF_TOP_APPS, ACTION_TYPES } from './config';

// The module API
export default function API (store) {
  return {
    getTopAppsByHost: (hostName) => {
      const { hosts, apps } = store.getState();
      const host = hosts[hostName];
      if (!host) { return null; }
      return host.topApps(NUM_OF_TOP_APPS).map(appName => apps[appName]);
    },
    addAppToHosts: (appName, hostsNamesList = []) => {
      store.dispatch({
        type: ACTION_TYPES.ADD_APP_TO_HOSTS,
        payload: { appName, hostsNamesList }
      });
    },
    removeAppFromHosts: (appName, hostsNamesList = []) => {
      store.dispatch({
        type: ACTION_TYPES.REMOVE_APP_FROM_HOSTS,
        payload: { appName, hostsNamesList }
      });
    }
  }
};