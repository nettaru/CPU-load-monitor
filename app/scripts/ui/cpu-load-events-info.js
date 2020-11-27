import { ACTION_TYPES } from '../config';
import UIModel from './model';
import { domElementFromDescription } from './utils'

class HighCPULoadCounter extends UIModel {
  constructor (store) {
    super('high-cpu-load-counter', 'h3');
    this.attributes.class = 'headline--emphasized';
    this.properties = { textContent: `Events: 0` };
    this.eventsCount = 0;

    store.subscribe(eventTypes => {
      if (eventTypes.includes(ACTION_TYPES.HIGH_CPU_LOAD)) {
        this.eventsCount++;
        this.properties.textContent = `Events: ${this.eventsCount}`;
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
    this.eventsCount = 0;

    store.subscribe(eventTypes => {
      this.eventsCount++;
      if (eventTypes.includes(ACTION_TYPES.RECOVERY)) {
        this.properties.textContent = `Recoveries: ${this.eventsCount}`;
        this.replaceElement();
      }
    });  
  }
}
export default class CPULoadEventsInfo extends UIModel {
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