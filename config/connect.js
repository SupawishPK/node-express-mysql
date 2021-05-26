const mysql = require("mysql2");

const pool = mysql.createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
  debug: false,
  multipleStatements: true,
});

function executeQuery(sql, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      return callback(err, null);
    } else {
      if (connection) {
        connection.query(sql, function (error, results, fields) {
          connection.release();
          if (error) {
            return callback(error, null);
          }
          return callback(null, results);
        });
      }
    }
  });
}

function query(sql, callback) {
  executeQuery(sql, function (err, data) {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
}

const promiseQuery = (sql) => {
  return new Promise((resolve, reject) => {
    query(sql, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  promiseQuery,
};
