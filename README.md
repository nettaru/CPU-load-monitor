# Hosts-List-Code-Challenge
Implementation of a technical code challenge.

## The task
Build a new page view that shows the list of applications running on every host.
* An application has a name, a list of contributors, a release version number, and a list of hosts that the app has been deployed at.
* Each application has an Apdex metric assigned. The Apdex score is a positive integer between 0 and 100. Apdex measures users' satisfaction based on the response time of web applications and services.

**Input:** A JSON feed is used as the page input, and is loaded as a static file on page creation.

**Layout:** The page has 2 page view modes - grid & list layouts. Each app item is clickable, and opens an alert with the applicaiton version number.

**API:** The page module return an API with the following methods:
1. _getTopAppsByHost_ - Retrieves a list of the 25 most satisfying applications for a hostname.
2. _addAppToHosts_ - Adds an application for all hosts in list.
3. _removeAppFromHosts_ - Removes an application for all hosts in list.

No JS/CSS frameworks are allowed :)


## Implementation
**Architecture**

State is managed by the module store, includes maps of hosts-by-name and apps-by-name, and the current UI view mode.
The store has the following API:
1. _getState_ - Returns a copy of current module state.
2. _dispatch_ - Get a change type and payload, and changes the state accordingly.
1. _subscribe_ - Allow subscribing to state changes, returns an unsubscribe method.

In the state, Hosts maintain the _applicationByIndex_ map, that holds the host-to-apps relation.
The object keys are the _apdex_ grades, and the entries are app-names Sets.
This way, the apps are sorted by index while being added, and there is no need to re-sort the topApps list when an app is added or removed to a host.
Accessing (_Set.has_), adding (_Set.add_) or removing (_Set.delete_) an app from a host is achieved in O(1) complexity (on avarage).
The apps are store by name on the host (and not by reference) so that no state manipulation could be done from outside of the store.

**UI**

Page is built with the following components:
```
Page
  Header
    View Toggle
  Apps-Container
    Host-Top-Apps
      List-Item
```
The View Toggle changes the show-list mode.

**Stack**

Babel+Webpack for compiling and serving the page.
Jest for testing.
    

Run `yarn serve` in order to have the test running and open in chrome.

Run `yarn test` in order to run the jest tests.


Hope you enjoy this amazing challenge implementaion! :)
