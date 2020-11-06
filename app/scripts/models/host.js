import { NUM_OF_DISPLAYED_TOP_APPS } from '../config';

export default class Host {  
  constructor(name) {
    this.name = name;
    this.appsByApdex = {};
  }

  /**
   * Returns a list of installed apps names, sorted from high to low apdex
   * @param {number} numOfTopApps - number of apps to be returned
   */
  topApps (numOfTopApps = NUM_OF_DISPLAYED_TOP_APPS) {
    let apps = [];
    // Since the keys are numbers, they are returned sorted by the Object.keys method,
    // from lowest to highest:
    const sortedKeys = Object.keys(this.appsByApdex);

    for (let i = sortedKeys.length - 1; i > -1 && apps.length < numOfTopApps; i--) {
      const currApdex = sortedKeys[i];
      const setAsArray = Array.from(this.appsByApdex[currApdex]).slice(0, numOfTopApps - apps.length);
      apps = apps.concat(setAsArray);
    }
    return apps;
  }

  /**
   * Adds application name by apdex
   * @param {string} name 
   * @param {number} apdex 
   */
  addApplication (name, apdex) {
    if (!this.appsByApdex[apdex]) {
      this.appsByApdex[apdex] = new Set();
    }
    this.appsByApdex[apdex].add(name);
  }

  /**
   * Removes application from host
   * @param {string} name 
   * @param {number} apdex 
   */
  removeApplication (name, apdex) {
    if (!this.appsByApdex[apdex]) { return; }
    this.appsByApdex[apdex].delete(name);
    if (this.appsByApdex[apdex].size == 0) {
      delete this.appsByApdex[apdex];
    }
  }
};