import { ACTION_TYPES } from '../config';
import UIModel from './model';
import { domElementFromDescription } from './utils'

class CurrentAvarageCPULoadHeadline extends UIModel {
  constructor (store) {
    super('avarage-cpu-load-headline', 'h3');
    this.store = store;

    store.subscribe(eventTypes => {
      if (eventTypes.includes(ACTION_TYPES.NEW_LOAD_DATA)) {
        this.replaceElement();
      }
    });  
  }

  render () {
    const avarageLoad = this.store.getState().currentAvarageLoad;
    this.element = domElementFromDescription({
      tag: this.tag,
      attributes: this.attributes,
      properties: { textContent: avarageLoad }
    });

    return this.element;
  }
}
export default class CurrentAvarageCPULoad extends UIModel {
  constructor (store) {
    super('avarage-cpu-load');
    this.headline = new CurrentAvarageCPULoadHeadline(store);
  }

  renderChildren () {
    return [
      domElementFromDescription({
        tag: 'h3',
        properties: { textContent: 'Current Avarage CPU Load' }
      }),
      this.headline.render()
    ]
  }
}