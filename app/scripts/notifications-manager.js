import { ACTION_TYPES } from './config';

function getLatestEventLength (events) {
  const latestEvent = events[events.length - 1];
  return latestEvent ? (latestEvent.end - latestEvent.start)/60000 : 0;
}

/**
 * Notifies user in cases of high CPU load events and system recovery
 * 
 * Uses the notifications API if supported by the browser and approved by the user,
 * Otherwise - uses window.alert
 * @param {object} store 
 */
export default function NotificationsManager (store) {
  let notify = (title, body) => alert(`${title}\n${body}`);
  if (window.Notfication && Notification.permission !== 'granted') {
    Notification.requestPermission()
      .then(permission => {
        Notification.permission = permission;
        if (permission == 'granted') {
          notify = (title, body) => { new Notification(title, { body }); }
        }
      });
  } else if (window.Notfication && Notification.permission == 'granted') {
    notify = (title, body) => { new Notification(title, { body }); }
  }

  store.subscribe(eventTypes => {
    const cpuLoadEvents = store.getState().cpuLoadEvents;

    if (eventTypes.includes(ACTION_TYPES.HIGH_CPU_LOAD)) {
      notify('High CPU Load!', `Started ${getLatestEventLength(cpuLoadEvents.events)} minutes ago`);
    } else if (eventTypes.includes(ACTION_TYPES.NORMAL_CPU_LOAD)) {
      notify('CPU Load Recovered', `Event length was: ${getLatestEventLength(cpuLoadEvents.events)} minutes`);
    }
  });
};