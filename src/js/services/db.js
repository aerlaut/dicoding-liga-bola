import { openDB, deleteDB } from "idb";

if (!("indexedDB" in window)) {
  alert("Browser ini tidak memiliki IndexedDB. Silahkan upgrade browser");
}

// Upgrade DB

openDB(name, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("teams")) {
      db.createObjectStore("teams", { keyPath: "id" });
    }

    if (!db.objectStoreNames.contains("leagues")) {
      db.createObjectStore("leagues", { keyPath: "id" });
    }
  },
});

export {};
