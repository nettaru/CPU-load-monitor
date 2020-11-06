import Host from './models/host';
import Application from './models/application';

export default function FeedProcessor (hostAppData) {
  const hosts = {};
  const apps = {};

  hostAppData.forEach(appData => {
    const app = new Application(appData);
    apps[appData.name] = app;
    appData.host.forEach(hostName => {
      if (!hosts[hostName]) { hosts[hostName] = new Host(hostName); }
      hosts[hostName].addApplication(app.name, app.apdex);
    });
  });

  return { hosts, apps };
};
