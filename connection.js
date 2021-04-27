//bring in necessary material
const util = require('util');
const mysql = require('mysql');

//create connection obj
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees_db"
});

//establish connection
connection.connect();

//prepare return promise query promise
connection.query = util.promisify(connection.query);

module.exports = connection;