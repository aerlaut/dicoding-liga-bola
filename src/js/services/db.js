import { openDB, deleteDB } from "idb";

if (!("indexedDB" in window)) {
  alert("Browser ini tidak memiliki IndexedDB. Silahkan upgrade browser");
}

class DB {
  constructor(options) {
    if (!options.objectStoreName) {
      console.error("no object store");
      return false;
    } else {
      // Get objectStore
      this.objectStoreName = options.objectStoreName
        ? options.objectStoreName
        : "";
    }
  }

  async connect() {
    // Create DB
    let obj = this;
    let db = await openDB("liga-bola-db", 1, {
      upgrade(db) {
        // Define store names
        const STORE_NAMES = ["user"];

        if (!db.objectStoreNames.contains(obj.objectStoreName)) {
          STORE_NAMES.forEach((storeName) => {
            db.createObjectStore(storeName, { keyPath: "id" });
          });
        }
      },
    });

    return db.transaction(obj.objectStoreName, "readwrite");
  }

  async fetch(id) {
    let tx = await this.connect();
    return tx.store.get(id);
  }

  async fetchAll() {
    let tx = await this.connect();
    return tx.store.getAll();
  }

  async insert(payload) {
    let tx = await this.connect();
    tx.store.add(payload);
    return tx.complete;
  }

  async update(payload) {
    let tx = await this.connect();
    tx.store.put(payload);
    return tx.complete;
  }

  async upsert(key, payload) {
    let tx = await this.connect();
    let item = await tx.store.get(key);
    if (item == null) {
      // team is undefined, create
      tx.store.add(payload);
    } else {
      // update
      tx.store.put(payload);
    }
    return tx.complete;
  }
}

// Define implementations of the DB
class TeamDB extends DB {
  constructor() {
    super({ objectStoreName: "team" });
  }
}

class LeagueDB extends DB {
  constructor() {
    super({ objectStoreName: "league" });
  }
}

class UserDB extends DB {
  constructor() {
    super({ objectStoreName: "user" });
  }
}

export { TeamDB, LeagueDB, UserDB };
