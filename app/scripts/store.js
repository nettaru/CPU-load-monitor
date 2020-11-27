import { ACTION_TYPES } from './config';

function getNextState (currentAvarageLoad, state) {
  const now = Date.now();
  // Add current avarage data with time, remove first element of window to maintain
  // data for the past 10 minutes.
  const avarageLoad10MinWindow = [...state.avarageLoad10MinWindow, { time: now, value: currentAvarageLoad }];

  // Check if we maintain data for longer than 10 minutes, and if so - remove the first data entry
  if ((avarageLoad10MinWindow[avarageLoad10MinWindow.length - 1].time - avarageLoad10MinWindow[0].time)/(10*60*1000) > 10) {
    avarageLoad10MinWindow.shift();
  }

  // Update high CPU load
  const highCPULoad = {
    events: [...state.highCPULoad.events],
    start: state.highCPULoad.start,
    end: null
  };

  const isOngoingHighLoadEvent = highCPULoad.start && ((now - highCPULoad.start)/60000 >= 2);
  if (currentAvarageLoad > 1) {
    // If no ongoing high CPU load event - let's mark a start:
    if (!highCPULoad.start) {
      highCPULoad.start = now;
    }
    // If we have an ongoing high load event -
    // Either update the event still ongoing, or log the new event
    if (isOngoingHighLoadEvent) {
      const lastEvent = highCPULoad.events[highCPULoad.events.length - 1];
      if (lastEvent && lastEvent.start == highCPULoad.start) {
        lastEvent.end = now;
      } else {
        highCPULoad.events.push({ start: highCPULoad.start, end: now });
      }
    }
  } else {
    // If we had an event, it has now ended, and we log its end time
    if (isOngoingHighLoadEvent) {
      highCPULoad.end = now;
    }
    highCPULoad.start = null;
  }

  // Remove first high CPU load event if it is already out of the documented time window
  if (highCPULoad.events.length > 0 && avarageLoad10MinWindow[0].time > highCPULoad.events[0].start) {
    highCPULoad.events[0].start = avarageLoad10MinWindow[0].time;
    if (highCPULoad.events[0].end < highCPULoad.events[0].start) {
      highCPULoad.events.shift();
    }
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

          const isHighCPUEvent = nextState.highCPULoad.events.length > state.highCPULoad.events.length;
          const didHighCPUEventEnd = nextState.highCPULoad.end;

          if (isHighCPUEvent) {
            notifyEvents.push(ACTION_TYPES.HIGH_CPU_LOAD);
          } else if (didHighCPUEventEnd) {
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