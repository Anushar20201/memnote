import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

}

// console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (value) => {

// console.error('getDb not implemented');
// connecting to the jate db and mentioning the version 1 here
const db = await openDB("jate", 1);
//creating a tran for jate db (for getting setting the previliges to read)
const tran = db.transaction("jate", "readonly");
const store = tran.objectStore("jate");
//assigning the getAll request here
const request = store.getAll();
//collecting the result
const result = await request;
console.log("This is the data from JATE db", result);
}

initdb();
