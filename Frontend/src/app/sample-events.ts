import * as moment from 'moment';
import { AxiomSchedulerEvent } from 'axiom-scheduler';

var colors = {
  "examination": "#3399FF",
  "predefEx": "#9933FF",
  "operation": "#FF9933",
  "holiday": "#CC0033",
  "timeOff": "#339933",
}

export var SAMPLE_EVENTS = [
  {
    "data": {
      "kind": "Examination",
      "patientFirstName": "Pera",
      "patientLastName": "Peric",
      "examination": true,
    },
    "from": moment(Date.now()).startOf('weeks').add('days', 5).add('hours', 0).toISOString(),
    "to": moment(Date.now()).startOf('weeks').add('days', 5).add('hours', 5).toISOString(),
    "color": colors["examination"],
    "locked": true,
  },
  {
    "data": {
      "kind": "Predef. Examination",
      "patientFirstName": "Mita",
      "patientLastName": "Mitic",
      "examination": true,
    },
    "from": moment(Date.now()).startOf('weeks').add('days', 3).add('hours', 3).toISOString(),
    "to": moment(Date.now()).startOf('weeks').add('days', 3).add('hours', 6).toISOString(),
    "color": colors["predefEx"],
    "locked": true
  },
  {
    "data": {
      "kind": "Operation",
      "patientFirstName": "Nikola",
      "patientLastName": "Nikolic",
      "examination": true,
    },
    "from": moment(Date.now()).startOf('weeks').add('days', 2).add('hours', 5).toISOString(),
    "to": moment(Date.now()).startOf('weeks').add('days', 2).add('hours', 9).toISOString(),
    "color": colors["operation"],
    "locked": true
  },
  {
    "data": {
      "kind": "Holiday",
      "patientFirstName": "Aleksa",
      "patientLastName": "Aleksic",
      "examination": false,
    },
    "from": moment(Date.now()).startOf('weeks').add('days', 1).add('hours', 5).toISOString(),
    "to": moment(Date.now()).startOf('weeks').add('days', 1).add('hours', 8).toISOString(),
    "color": colors["holiday"],
    "locked": true
  },
  {
    "data": {
      "kind": "Time Off",
      "patientFirstName": "Ivan",
      "patientLastName": "Ivanovic",
      "examination": false,
    },
    "from": moment(Date.now()).startOf('weeks').add('days', 1).add('hours', 2).toISOString(),
    "to": moment(Date.now()).startOf('weeks').add('days', 1).add('hours', 4).toISOString(),
    "color": colors["timeOff"],
    "locked": true
  },

  /*
  {
    "data": {
      "id": "32f1822f-e404-4812-9cbd-9a61280adfb3",
      "title": "Call Mary Johnson"
    },
    "from": "2019-02-19T21:30:00.000Z",
    "to": "2019-02-20T01:05:00.000Z",
    "color": "#673AB7",
    "locked": true
  },
  */

  /*
  {
    "data": {
      "id": "32f1822f-e404-4212-9cbd-9a61280adfb3",
      "title": "Call Mary Johnson"
    },
    "from": moment(Date.now()).startOf('weeks').add('days', 2).add('hours', 3).toISOString(),
    "to": moment(Date.now()).startOf('weeks').add('days', 2).add('hours', 6).toISOString(),
    "color": "#673AB7",
    "locked": true
  },
  {
    "data": {
      "title": "StartUp Meeting",
      "id": "32f1822a-e404-4812-9cbd-9a612802dfb3"
    },
    "from": moment(Date.now()).startOf('weeks').add('days', 3).add('hours', 6).toISOString(),
    "to": moment(Date.now()).startOf('weeks').add('days', 3).add('hours', 12).toISOString(),
    "color": "#792048",
    "locked": true
  },
  {
    "data": {
      "title": "Send email to production team",
      "id": "32f1822f-e404-4812-9cbd-1a62280adfb3"
    },
    "from": moment(Date.now()).startOf('weeks').add('days', 3).add('hours', 0).toISOString(),
    "to": moment(Date.now()).startOf('weeks').add('days', 3).add('hours', 4).toISOString(),
    "color": "#E91E63",
  },
  {
    "data": {
      "title": "Buy some stuff",
      "id": "32f1822f-e404-1812-9cbd-9a61290adfb2"
    },
    "from": moment(Date.now()).startOf('weeks').add('days', 4).add('hours', 8).toISOString(),
    "to": moment(Date.now()).startOf('weeks').add('days', 4).add('hours', 10).toISOString(),
    "color": "#009688",
    "locked": true
  },
  {
    "data": {
      "title": "Music class",
      "id": "32f1822f-e404-4812-9cbd-9a63280adfb3"
    },
    "from": moment(Date.now()).startOf('weeks').add('days', 5).add('hours', 3).toISOString(),
    "to": moment(Date.now()).startOf('weeks').add('days', 5).add('hours', 5).toISOString(),
    "color": "#ff5252",
    "locked": true
  },
  {
    "data": {
      "title": "Set an appointment with Mike",
      "id": "32f1822f-e404-4812-9c3d-9a61280wdfb3"
    },
    "from": moment(Date.now()).startOf('day').add('hours', 1).toISOString(),
    "to": moment(Date.now()).startOf('day').add('hours', 4).toISOString(),
    "color": "#FFC107",
    "locked": true
  }
  */
].map(i => new AxiomSchedulerEvent(i.data.kind, i.from && new Date(i.from), i.to && new Date(i.to), i.data, i.color, i.locked));