import Header from './header';
import HostTopApps from './host-top-apps';

const pageElement = '<div id="page"></div>';

const renderHosts = (hosts) => {
  return hosts.reduce((hostsList, host) => {
    return [...hostsList, HostTopApps(host)];
  }, []);
};

export default function Page(store) {
  const headerEl = Header(store);

  const hosts = store.getState();
  const hostsElementsList = renderHosts(hosts);
  return document.createElement(pageElement).append(headerEl, ...hostsElementsList);
};