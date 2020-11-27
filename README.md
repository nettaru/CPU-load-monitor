# Info-Cat - CPU load monitor
Implementation of a technical code challenge.

## The task
Build a a browser-based CPU load monitoring application. This application will display time-series data.
A user should be able to view your application to answer the following questions about their computer:

- What is my computer's current average CPU load?
- How did the average CPU load change over a 10 minute window?
- Has my computer been under heavy CPU load for 2 minutes or more? When? How many times?
- Has my computer recovered from heavy CPU load? When? How many times?

## Product requirements:

- The front-end application should communicate with a local back-end service to retrieve CPU load average information from your computer (see below).
- The front-end application should retrieve CPU load information every 10 seconds.
- The front-end application should maintain a 10 minute window of historical CPU load information.
- The front-end application should alert the user to high CPU load.
- The front-end application should alert the user when CPU load has recovered.

## Implementation
**Architecture**

State is managed by the module store. The state consists of the following:
1. _avarageLoad10MinWindow_ - Events array of the past 10 minutes. Each event consists of its time and avarage CPU load value.
2. _currentAvarageLoad_ - Numeric value of the latest avarage CPU load.
3. _cpuLoadEvent_ - Array containing High CPU load events. Each event consists of its start & end time, and type - either high load or recovery.


The store has the following API:
1. _getState_ - Returns a copy of current module state.
2. _dispatch_ - Dispatches a change type and payload, and changes the state accordingly.
1. _subscribe_ - Allows subscribing to state changes, returns an unsubscribe method.


The state is displayed by 3 UI components:
- _CPUAvarageLoad_ - displays current avarage as it is kept in the state.
- _CPULoadEventsInfo_ - displays counts of high CPU load & recovery events.
- _LoadTimeWindow_ - displays an SVG graph of the avarage load changes in the past 10 minutes. The graph is colored according to events. When rendered or updated, we iterate for each data point through the CPU load events, and color the relevant time slot accordingly. The iteration through the events is kept under O(1), since we have at most 4 CPU load events.


**UI**

Page is built with the following components:
```
Page
  Header
  Info-Row
    CPU-Avarage-Load
    CPU-Load-Events-Info
  Info-Row
    Load-Time-Window
```

**Future Application Improvements**
There are definitely some improvements that can be done for a production version:
- WebSocket is using ws protocol which is not secure. Production version requires an SSL certificate to use wss protocol for the socket.
- The chart can display a tooltip with values on hover, which will make it easier to see the accurate value.
- More testing - using e2e tests or purhaps jest snapshots, to make sure the UI doesn't break on changes.
- Store state can use models in case of a more complicated data structure.
- Store can use state reducers when maintaining a more complicated state.
- Production stack should also minify the files.


**Stack**

Babel+Webpack for compiling and serving the page.
Jest for testing.
    

Run `yarn start` in order start the express server. Load `http://localhost:3000/` for the page.

Run `yarn test` in order to run the jest tests.


Hope you enjoy this amazing challenge implementaion! :)
