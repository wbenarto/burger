//Set up connection Node to MySql
const mysql = require('mysql');

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "burgers_db"
});

connection.connect(function(err) {
    if(err) {
        console.log("error connecting: " + err.stack);
        return;
    };

    console.log("Connected to MYSQL database as id " + connection.threadId);
});

module.exports = connection;