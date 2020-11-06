import { feed } from './mock-data';
import Store from '../scripts/store';
import { ACTION_TYPES } from '../scripts/config';

describe('Store', () => {
  const store = Store(feed);
  it('Returns current state', () => {
    const state = store.getState();
    expect(state.hasOwnProperty('showList')).toBe(true);
    expect(state.hasOwnProperty('apps')).toBe(true);
    expect(state.hasOwnProperty('hosts')).toBe(true);
  });

  it('Allows mutating state through dispatching events', () => {
    expect(store.getState().showList).toBe(false);
    store.dispatch({ type: ACTION_TYPES.TOGGLE_CHANGE, payload: true });
    expect(store.getState().showList).toBe(true);
  });

  it('Allows subscribing to state change', () => {
    let changeMe = 'first value';
    const changedValue = 'state has change!';
    const subscriber = () => { changeMe = changedValue; }
    store.subscribe(subscriber);
    store.dispatch({ type: ACTION_TYPES.TOGGLE_CHANGE, payload: true });
    expect(changeMe).toEqual(changedValue);
  });
});