import Host from '../scripts/models/host';
import Application from '../scripts/models/application';

export const feed = [
  {
    name: "Small Fresh Pants - Kautzer - Boyer, and Sons",
    contributors: ["Edwin Reinger","Ofelia Dickens","Hilbert Cole","Helen Kuphal","Maurine McDermott Sr."],
    version: 7,
    apdex: 68,
    host: ["7e6272f7-098e.dakota.biz","9a450527-cdd9.kareem.info","e7bf58af-f0be.dallas.biz"]
  },
  {
    name: "Refined Concrete Shirt - Hudson - Sauer, Group",
    contributors: ["Ramon Harris DDS","Summer Dicki","Triston Sipes","Fae Lind","Carole Emard"],
    version: 6,
    apdex: 57,
    host: ["e0419f48-6a5a.craig.info","7e6272f7-098e.dakota.biz"]
  },
  {
    name: "Third app",
    contributors: ["people"],
    version: 6,
    apdex: 100,
    host: ["333.netta.hey"]
  }
];
export const appName = 'Third app';
export const application = new Application({name: appName, version: 10, apdex: 100, contributers: ['Donald Trump']});
const application2 = new Application({name: 'application2', version: 10, apdex: 20, contributers: ['Donald Trump']});
const application3 = new Application({name: 'application3', version: 10, apdex: 30, contributers: ['Donald Trump']});
const application4 = new Application({name: 'application4', version: 10, apdex: 100, contributers: ['Donald Trump']});
const application5 = new Application({name: 'application5', version: 10, apdex: 30, contributers: ['Donald Trump']});
const application6 = new Application({name: 'application6', version: 10, apdex: 100, contributers: ['Donald Trump']});
export const apps = { [appName]: application, application2, application3, application4, application5, application6 };

export const host = new Host('host');
host.addApplication(application.name, application.apdex);

export const hostName = '7e6272f7-098e.dakota.biz';
