import PouchDB from 'pouchdb-browser';
import pouchdb_upsert from 'pouchdb-upsert';

const dbName = 'isitbinday';
export const db = new PouchDB(dbName);
PouchDB.plugin(pouchdb_upsert);

