const mysql = require('mysql');
var connection = mysql.createConnection({
    host        : 'locatlhost',
    user        : 'root',
    password : 'root',
    database : 'MonProjet_Ecole',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'

});
connection.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to database!");
});



  module.exports = connection;