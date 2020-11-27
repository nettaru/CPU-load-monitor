import { ACTION_TYPES } from '../config';
import UIModel from './model';
import { domElementFromDescription } from './utils'

class CurrentAvarageCPULoadData extends UIModel {
  constructor (store) {
    super('avarage-cpu-load-data', 'h3');
    this.attributes.class = 'headline--emphasized';

    store.subscribe(eventTypes => {
      const avarageLoad = store.getState().currentAvarageLoad;
      if (eventTypes.includes(ACTION_TYPES.NEW_LOAD_DATA)) {
        this.properties = { textContent: avarageLoad.toFixed(8) }
        this.replaceElement();
      }
    });  
  }
}
export default class CurrentAvarageCPULoad extends UIModel {
  constructor (store) {
    super('avarage-cpu-load');
    this.attributes.class = 'board-block';
    this.dataDisplay = new CurrentAvarageCPULoadData(store);
  }

  renderChildren () {
    return [
      domElementFromDescription({
        tag: 'h3',
        properties: { textContent: 'Current Avarage CPU Load' }
      }),
      this.dataDisplay.render()
    ]
  }
}