import Dexie from "dexie"

const db = new Dexie('dexie')
db.version(1).stores({ drinks: '++id, date, time, class, name' })

export default db