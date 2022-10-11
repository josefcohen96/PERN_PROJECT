const Pool = require("pg").Pool;

const pool = new Pool({  // config the connection 
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "maintenance"
});


module.exports = pool;