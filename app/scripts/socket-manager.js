import { ACTION_TYPES } from './config';

export default function SocketManager (store) {

  // Setup Websocket to receive data from the server

  // Note: in a real app I would use wss protocol to have a secure connection
  // between the server and the client.
  const webSocket = new WebSocket('ws://localhost:3000/chat');

  // Send data to store on server messages
  webSocket.onmessage = event => {
    store.dispatch({ type: ACTION_TYPES.NEW_LOAD_DATA, payload: JSON.parse(event.data) });
  };

  // Close the socket before the tab is closed
  window.addEventListener('beforeunload', event => {
    event.preventDefault();
    webSocket.close();
  });
}