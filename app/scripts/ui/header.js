import Toggle from './toggle';

const headerElement = ```<div id="header">
  <h1>Apps by Host</h1>
</div>```;

export default function Header(store) {
  const toggleEl = Toggle(store);
  return document.createElement(headerElement).append(headerEl, toggleEl);
};