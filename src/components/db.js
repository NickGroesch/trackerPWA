import Dexie from "dexie"

const db = new Dexie('dexie')
db.version(1).stores({ drinks: '++id' })

export default db