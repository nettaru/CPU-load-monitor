import '../styles/index.css';
import * as config from './config';
import Store from './store';
import Page from './ui/page';

export function boot () {
  // Create new state store
  const store = new Store(config);
  const element = document.getElementById('root');
  return new Page(store, element);
  // consume JSON feed and store it in 
};

boot();