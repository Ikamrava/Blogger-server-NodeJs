import mysql from 'mysql'

export const db = mysql.createConnection({
    host: "db4free.net",
    port: "3306",
    user: "dbu1300017",
    password : "Ki@nparid",
    database : "dbs10456594"
})