import { data } from './mock-data';
import Store from '../scripts/store';
import { ACTION_TYPES } from '../scripts/config';

describe('Store', () => {
  const store = Store(data);
  it('Returns current state', () => {
    const state = store.getState();
    expect(state.hasOwnProperty('currentAvarageLoad')).toBe(true);
    expect(state.hasOwnProperty('avarageLoad10MinWindow')).toBe(true);
    expect(state.hasOwnProperty('cpuLoadEvents')).toBe(true);
  });

  it('Allows mutating state through dispatching events', () => {
    expect(store.getState().currentAvarageLoad).toBe(0);
    store.dispatch({ type: ACTION_TYPES.NEW_LOAD_DATA, payload: { value: 1, time: Date.now() } });
    expect(store.getState().currentAvarageLoad).toBe(1);
  });

  it('Allows subscribing to state change', () => {
    let changeMe = 'first value';
    const changedValue = 'state has change!';
    const subscriber = () => { changeMe = changedValue; }
    store.subscribe(subscriber);
    store.dispatch({ type: ACTION_TYPES.NEW_LOAD_DATA, payload: { value: 1, time: Date.now() } });
    expect(changeMe).toEqual(changedValue);
  });
});