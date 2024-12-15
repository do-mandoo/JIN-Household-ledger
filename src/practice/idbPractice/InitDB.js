import { openDB } from 'idb';

// IndexedDB 호환성 설정
// const setIndexedDBCompatibility = () => {
//   window.indexedDB =
//     window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//   window.IDBTransaction =
//     window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

//   window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

//   if (!window.indexedDB) {
//     console.error('indexd DB 미지원 브라우저');
//   }
// };

const InitDB = async () => {
  // setIndexedDBCompatibility(); // 호환성 설정 호출
  try {
    const db = await openDB('myPracticeDB', 1, {
      upgrade(db) {
        //object store 생성
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
    console.error('db 여는걸 성공했습니다.', db);
    return db;
  } catch (error) {
    console.error('db 여는걸 실패했습니다.', error);
  }
};

export default InitDB;
