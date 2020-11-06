import '../styles/index.css';
import Store from './store';
import Page from './ui/page';
import API from './api';
const jsonFeed = require('../static/host-app-data.json');

export function boot () {
  // Create new state store
  const store = Store(jsonFeed);

  // Create the UI and append to the document
  const page = Page(store);
  document.getElementById('root').append(page);

  // Return the module API
  return API(store);
};

boot();