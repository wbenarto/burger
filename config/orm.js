// Import MySQL connection
const connection = require("./connection");

// Helper function for generating MySQL syntax
const printQuestionMarks = (num) => {
    let arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    };

    return arr.toString();
};

const objToSql = (ob) => {
    let arr = [];

    for (var key in ob) {
        arr.push(key + "=" + ob[key]);
    };

    return arr.toString();
}
 
const orm = {
    // Function that returns all table entries
    selectAll: (tableInput, cb) => {
        let queryString = "SELECT * FROM " + tableInput + ";";
        console.log(queryString);

        // Database query
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },

    // Function that insert a single table entry
    insertOne: (table, cols, vals, cb) => {
        let queryString = "INSERT INTO " + table;

        // INSERT INTO (cols) VALUES (printquestionMarks(vals.length));
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        // Database query
        connection.query(queryString, vals, (err,result) => {
            if (err) throw err;
            cb(result);
        });
    },

    // Function that updates a single table entry
    updateOne: (table, objColVals, condition, cb) => {
        const queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
        console.log(queryString);
        
        // Database query
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;