const state = require('../static/host-app-data.json');

export default function Store() {
  return {
    get: () => {
      return { ...state };
    }
  }
};