import { openDB, deleteDB } from "idb";

if (!("indexedDB" in window)) {
  alert("Browser ini tidak memiliki IndexedDB. Silahkan upgrade browser");
}

class DB {
  // class parameters
  db;
  store;
  tx;

  constructor(options) {
    if (!options.objectStoreName) {
      console.error("no object store");
      return false;
    }

    // Create DB
    this.db = openDB(name, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(options.objectStoreName)) {
          db.createObjectStore(options.objectStoreName, { keyPath: "id" });
        }
      },
    });

    // Get objectStore
    this.objectStoreName = options.objectStoreName
      ? options.objectStoreName
      : "";

    this.tx = this.db.transaction(options.objectStoreName, "readwrite");
    this.store = tx.objectStore(options.objectStore);
  }

  async fetch(id) {
    this.store.get(id);
  }

  async fetchAll() {
    this.store.getAll();
  }

  async insert(payload) {
    this.store.add(payload);
    return this.tx.complete;
  }

  async update(payload) {
    this.store.put(payload);
    return this.tx.complete;
  }
}

// Define implementations of the DB
class teamDB extends DB {
  constructor() {
    super({ objectStoreName: "team" });
  }
}

class leagueDB extends DB {
  constructor() {
    super({ objectStoreName: "league" });
  }
}

export { teamDB, leagueDB };
