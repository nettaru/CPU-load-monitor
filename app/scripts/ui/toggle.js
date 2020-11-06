const toggleElementStr = ```
<div>
  <input type="checkbox" id="toggle" name="toggle" checked=${checked}>
  <label for="toggle">Show as list</label>
</div>```;

export default function Toggle(store) {
  const checked = store.getState().showList;
  const onToggle = (e) => {
    e.preventDefault();
    store.dispatch('TOGGLE_CHANGE');
  };
  const toggleEl = document.createElement(toggleElementStr);
  toggleEl.addEventListner('change', onToggle);
  return toggleEl;
};