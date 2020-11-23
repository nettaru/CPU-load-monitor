import { ACTION_TYPES } from './config';

function processData (currentAvarageLoad, state) {
  state.currentAvarageLoad = currentAvarageLoad;
}
// Returns a deep copy of the input object
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
 * Returns getState, dispatch & subscribe API
**/
export default function Store() {
  const subscribtions = {};
  const state = {
    currentAvarageLoad: 0,
    avarageLoad10MinWindow: [],
    heavyCPULoadCounter: 0
  };
  return {
    getState: () => {
      return copy(state);
    },
    dispatch: data => {
      if (!data) return;
      const { type, payload } = data;
      switch (type) {
        case ACTION_TYPES.NEW_LOAD_DATA:
          const currentAvarageLoad = Number(payload);
          console.log(currentAvarageLoad);
          processData(currentAvarageLoad, state);
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