import '../styles/index.css';
import Store from './store';
import Page from './ui/page';
import SocketManager from './socket-manager';

export function boot () {
  // Create new state store
  const store = Store();

  // Create socket manager to handle communication with server
  SocketManager(store);

  // Create the UI and append to the document
  // const page = Page(store);
  // document.getElementById('root').append(page);
};

boot();