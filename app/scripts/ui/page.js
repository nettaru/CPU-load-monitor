import UIModel from './model';
import { domElementFromDescription, createNestedElement } from './utils';
import CurrentAvarageCPULoad from './current-avarage-cpu-load';
import LoadTimeWindow from './load-time-window';
import HighCPULoadInfo from './high-cpu-load-info';
export default class Page extends UIModel {
  constructor (store) {
    super('page');
    this.cpuAvarageLoad = new CurrentAvarageCPULoad(store);
    this.loadTimeWindow = new LoadTimeWindow(store);
    this.highCPULoadInfo = new HighCPULoadInfo(store);
  }

  renderChildren () {
    return [
      domElementFromDescription({
        tag: 'h1',
        attributes: { id: 'header' },
        properties: { textContent: 'Avarage CPU Load Dashboard' }
      }),
      createNestedElement({
        attributes: { class: 'info-row' },
        children: [
          this.cpuAvarageLoad.render(),
          this.highCPULoadInfo.render(),
        ]
      }),
      createNestedElement({
        attributes: { class: 'info-row' },
        children: [
          this.loadTimeWindow.render()
        ]
      })
    ]
  }
};