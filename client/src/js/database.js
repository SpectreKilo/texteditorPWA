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
  console.log('PUT to the database');
  const werdDb = await openDB('jate', 1);
  const transaction = werdDb.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');
  //DO WE NEED AN ID HERE FOR THIS REQUEST???
  const request = store.put({ id: 1, value: content});
  const result = await request;
  console.log('🚀 - text saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('gets all text from database');
  const werdDb = await openDB('jate', 1);
  const transaction = werdDb.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');
  const request = store.getAll(1);
  const result = await request;
  result ? console.log('result.value', result) : console.error('getDb not implemented');
  return result?.value;
}

initdb();
