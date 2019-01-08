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
    selectAll: () => {},
    insertOne: () => {},
    updateOne: () => {}
};

module.exports = orm;