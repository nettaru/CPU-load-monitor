import { ACTION_TYPES } from './config';
import FeedProcessor from './feed-processor';

/**
 * Returns a deep copy of the input
**/
function copy (state) {
  if (state.constructor.name == 'Set') {
    return new Set(state);
  }
  if (typeof state == 'object') {
    const objectCopy = new state.constructor(state);
    Object.keys(state).forEach(key => {
      objectCopy[key] = copy(state[key]);
    });
    return objectCopy;
  }
  return state;
}

/**
 * Store manages the module state, in a redux-y manner.
 * Receives and proccessed a feed on creation,
 * returns getState, dispatch & subscribe API
**/
export default function Store(jsonFeed) {
  const subscribtions = {};
  const { hosts, apps } = FeedProcessor(jsonFeed);
  let state = {
    apps,
    hosts,
    showList: false
  };
  return {
    getState: () => {
      return copy(state);
    },
    dispatch: ({type, payload}) => {
      const { hosts, apps } = state;
      switch (type) {
        case ACTION_TYPES.TOGGLE_CHANGE:
          state.showList = payload;
          break;
        case ACTION_TYPES.ADD_APP_TO_HOSTS:
          const appToAdd = apps[payload.appName];
          if (!appToAdd) { return; }
          payload.hostsNamesList.forEach(hostName => {
            const host = hosts[hostName];
            host.addApplication(appToAdd.name, appToAdd.apdex);
          });
          state.hosts = hosts;
          break;
        case ACTION_TYPES.REMOVE_APP_FROM_HOSTS:
          const appToRemove = apps[payload.appName];
          if (!appToRemove) { return; }
          payload.hostsNamesList.forEach(hostName => {
            const host = hosts[hostName];
            host.removeApplication(appToRemove.name, appToRemove.apdex);
          });
          state.hosts = hosts;
          break;
        default:
          return;
      }
      Object.values(subscribtions).forEach(subscribtion => subscribtion(type));
    },
    subscribe: (subscribtion) => {
      const randomId = Math.random().toString();
      subscribtions[randomId] = subscribtion;
      return () => {
        delete subscribtions[randomId];
      };
    }
  }
};