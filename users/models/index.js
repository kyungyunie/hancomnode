const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'm95.cq1ymn0qmmdx.ap-northeast-2.rds.amazonaws.com',
  user: process.env.DB_USER || 'masterchain1',
  password: process.env.DB_PASSWORD || '***********',
  database: process.env.DB_NAME || 'nodejs',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
}).promise();

module.exports = pool; 