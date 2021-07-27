import PouchDB from 'pouchdb-browser'

const dbName = 'isitbinday';
export const db = new PouchDB(dbName);

