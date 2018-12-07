var mysql = require('mysql');
var db = mysql.createConnection({
  host     : '54.180.104.7',
  user     : 'root',
  password : '1234',
  database : 'testdb',
  port: 3306
});
db.connect(function(err) {
  if (err) {
      console.error('mysql connection error');
      console.error(err);
      throw err;
  }
});
module.exports = db;
