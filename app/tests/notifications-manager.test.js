import { storeStateHighLoadEvent, storeStateRecoveryEvent } from './mock-data';
import Store from '../scripts/store';
import { ACTION_TYPES } from '../scripts/config';
import NotificationsManager from '../scripts/notifications-manager';

describe('Notifications Manager', () => {
  window.alert = jest.fn();
  it('notifies user on High Load Event', () => {
    window.alert.mockClear();
    const store = Store(storeStateHighLoadEvent);
    NotificationsManager(store);
    const spy = jest.spyOn(window, 'alert');
    store.dispatch({
      type: ACTION_TYPES.NEW_LOAD_DATA,
      payload: { time: 1606657488761, value: 2.7227783203125 }
    })
    expect(spy).toHaveBeenCalledWith(`High CPU Load!\nStarted ${(1606657488761 - 1606657368730)/60000} minutes ago`);
  });

  it('notifies user on CPU Load Recovery event', () => {
    window.alert.mockClear();
    const store = Store(storeStateRecoveryEvent);
    NotificationsManager(store);
    const spy = jest.spyOn(window, 'alert');
    store.dispatch({
      type: ACTION_TYPES.NEW_LOAD_DATA,
      payload: { time: 1606657738818, value: 0.67138671875 }
    })
    expect(spy).toHaveBeenCalledWith(`CPU Load Recovered\nEvent length was: ${(1606657738818 - 1606657608792)/60000} minutes`);
  });

  it('does not notify user on regular data event', () => {
    window.alert.mockClear();
    const store = Store(storeStateRecoveryEvent);
    NotificationsManager(store);
    const spy = jest.spyOn(window, 'alert');
    store.dispatch({
      type: ACTION_TYPES.NEW_LOAD_DATA,
      payload: { time: 1606657738818, value: 1.67138671875 }
    })
    expect(spy).not.toHaveBeenCalled();
  });
});