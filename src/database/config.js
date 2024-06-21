// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '17092005',
  port: 3306,
  database: 'USER',
});

// A simple SELECT query
connection.query(
  'SELECT * FROM Users',
  function (err, results, fields) {
    if(err){
        console.log(err);
        return;
    }
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);
