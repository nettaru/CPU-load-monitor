import { createNestedElement } from './utils.js';

/**
* One UIModel to rule them all!
* The UIModel defines the rendering process, that considers the tag, id, attributes, and calls renderChlidren,
* That should be implemented by the extending classes.
* Style & Listeners can be separated from the attributes in future refactoring,
* I tried keeping it simpler for this challenge.
*
* replaceElement should be used when re-rendering is needed - within the state-change subscribers.
**/
export default class UIModel {
  constructor (id, tag = 'div') {
    this.id = id;
    this.tag = tag;
    this.attributes = { id };
    this.element = null;
  }

  render (data) {
    const children = this.renderChildren(data);
    this.element = createNestedElement({
      tag: this.tag,
      attributes: this.attributes,
      properties: this.properties,
      listeners: this.listeners,
      children
    });

    return this.element;
  }

  replaceElement (data) {
    const oldElement = this.element;
    if (!oldElement) return;
    const newElement = this.render(data);
    oldElement.parentNode.replaceChild(newElement, oldElement);
    this.element = newElement;
  }


  renderChildren ( data ) { return []; }
}