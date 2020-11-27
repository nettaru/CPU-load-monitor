import { ACTION_TYPES } from '../config';
import UIModel from './model';
import { domElementFromDescription } from './utils'

class HighCPULoadCounter extends UIModel {
  constructor (store) {
    super('high-cpu-load-counter', 'h3');
    this.attributes.class = 'headline--emphasized';
    this.properties = { textContent: `Events: 0` };

    store.subscribe(eventTypes => {
      if (eventTypes.includes(ACTION_TYPES.HIGH_CPU_LOAD)) {
        const eventsCount = store.getState().highCouLoad.events.length;
        this.properties.textContent = `Events: ${eventsCount}`;
        this.replaceElement();
      }
    });  
  }
}

class RecoveriesCounter extends UIModel {
  constructor (store) {
    super('recovery-counter', 'h3');
    this.attributes.class = 'headline--emphasized';
    this.properties = { textContent: `Recoveries: 0` };

    store.subscribe(eventTypes => {
      if (eventTypes.includes(ACTION_TYPES.NORMAL_CPU_LOAD)) {
        const eventsCount = store.getState().highCPULoad.events.length;
        this.properties.textContent = `Recoveries: ${eventsCount}`;
        this.replaceElement();
      }
    });  
  }
}
export default class HighCPULoadInfo extends UIModel {
  constructor (store) {
    super('high-cpu-load-info');
    this.attributes.class = 'board-block';
    this.highCPULoadCounter = new HighCPULoadCounter(store);
    this.recoveriesCounter = new RecoveriesCounter(store);
  }

  renderChildren () {
    return [
      domElementFromDescription({
        tag: 'h3',
        properties: { textContent: 'High CPU Load Events' }
      }),
      this.highCPULoadCounter.render(),
      this.recoveriesCounter.render()
    ]
  }
}