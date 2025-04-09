import pg from 'pg'
const { Pool } = pg

const host = process.env['POSTGRES_HOST']
const user = process.env['POSTGRES_USER']
const dbName = process.env['POSTGRES_DB']
const password = process.env['POSTGRES_PASSWORD']
const port = process.env['POSTGRES_PORT']


export function getDBConnectionPool() {
    const pool = new Pool({
        host: host,
        user: user,
        database: dbName,
        password: password,
        port: port,
        ssl: false,
    })
    pool.on('error', (err, _) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })
    return pool
}
 