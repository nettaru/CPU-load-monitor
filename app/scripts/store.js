import { ACTION_TYPES } from './config';

function getNextState (currentAvarageLoad, state) {
  const now = Date.now();
  // Add current avarage data with time, remove first element of window to maintain
  // data for the past 10 minutes.
  const avarageLoad10MinWindow = [...state.avarageLoad10MinWindow, { time: now, value: currentAvarageLoad }];
  // We sample the load data every 10 seconds, and therefore will have 60 samples
  // in a 10 minutes period
  if (avarageLoad10MinWindow.length > 60) {
    avarageLoad10MinWindow.shift();
  }

  // Update high CPU load
  const highCPULoad = {
    events: [...state.highCPULoad.events],
    start: state.highCPULoad.start
  };

  if (currentAvarageLoad > 1) {
    // No high load events yet
    if (!highCPULoad.start) {
      highCPULoad.start = now;
    }
  } else if (highCPULoad.start && ((highCPULoad.start - now)/12000 >= 2)) {
    // Update back-to-normal load
    highCPULoad.events.push({ start: highCPULoad.start, end: now });
    highCPULoad.start = null;
  }

  return {
    // Update current avarage load
    currentAvarageLoad,
    avarageLoad10MinWindow,
    highCPULoad
  };
}

/**
 * Store manages the module state, in a redux-y manner.
 * Returns getState, dispatch & subscribe API
**/
export default function Store() {
  const subscribtions = {};
  let state = {
    currentAvarageLoad: 0,
    avarageLoad10MinWindow: [],
    highCPULoad: {
      events: [],
      start: null
    }
  };
  return {
    getState: () => {
      return state;
    },
    dispatch: data => {
      if (!data) return;
      const { type, payload } = data;
      const notifyEvents = [type];
      switch (type) {
        case ACTION_TYPES.NEW_LOAD_DATA:
          const currentAvarageLoad = Number(payload);
          const nextState = getNextState(currentAvarageLoad, state);
          if (!state.highCPULoad.start && nextState.highCPULoad.start) {
            notifyEvents.push(ACTION_TYPES.HIGH_CPU_LOAD);
          } else if (nextState.highCPULoad.events.length > state.highCPULoad.events.length) {
            notifyEvents.push(ACTION_TYPES.NORMAL_CPU_LOAD);
          }
          state = nextState;
          break;
        default:
          return;
      }
      Object.values(subscribtions).forEach(subscribtion => subscribtion(notifyEvents));
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