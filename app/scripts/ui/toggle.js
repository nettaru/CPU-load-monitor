import { ACTION_TYPES } from '../config';
import { createNestedElement } from '../utils';

export default function Toggle(store) {
  const checked = store.getState().showList;
  const onToggle = (e) => {
    e.preventDefault();
    store.dispatch({
      type: ACTION_TYPES.TOGGLE_CHANGE,
      payload: inputEl.checked
    });
  };

  const elementDescription = {
    parent: {
      tag: 'div',
      attributes: {
        id: 'toggle'
      }
    },
    children: [{
      tag: 'input',
      attributes: {
        type: 'checkbox',
        name: 'toggler',
        id: 'toggler',
        tabindex: 0
      },
      properties: { checked },
      listeners: { change: onToggle }
    }, {
      tag: 'label',
      attributes: { for: 'toggler' },
      properties: { textContent: 'Show As List' }
    }]
  };

  const toggleEl = createNestedElement(elementDescription);
  const inputEl = toggleEl.querySelector('input');
  return toggleEl;
};