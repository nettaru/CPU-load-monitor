/**
 * Returns a flat DOM element from a description
 * @param {object} DOM element description 
 */
export function domElementFromDescription ({tag = 'div', attributes = {}, properties = {}, listeners = {}}) {
  const element = document.createElement(tag);
  Object.keys(attributes).forEach(attr => {
    element.setAttribute(attr, attributes[attr]);
  });

  Object.keys(properties).forEach(name => {
    element[name] = properties[name];
  });

  Object.keys(listeners).forEach(eventType => {
    element.addEventListener(eventType, listeners[eventType]);
  });

  return element;
};

/**
 * Returns a nested DOM element from the structure data
 * @param {object} structure including parent container and children array information to render
 */
export function createNestedElement (structure) {
  if (!structure) return null;
  const parentElement = domElementFromDescription(structure);
  parentElement.append(...structure.children);
  return parentElement;
};

export function getLast (array) {
  return array[array.length - 1];
};