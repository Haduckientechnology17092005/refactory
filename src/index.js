import express from 'express';
import fs from 'fs';
import routers from './apis';
import { connection } from './database/config.js';
const app = express();

app.use(express.json());

app.use('/api', routers);

(async () => {
    try {
      const conn = await connection;
      const [results, fields] = await conn.query(
        'SELECT * FROM User'
      );
  
      console.log(results); // results chứa các dòng được trả về từ server
      console.log(fields);  // fields chứa thông tin meta về các cột, nếu có
    } catch (err) {
      console.log(err);
    }
  
    try {
      const conn = await connection;
      const [results] = await conn.query(
        'SELECT * FROM User WHERE name = ? AND age > ?',
        ['Alice', 20]
      );
  
      console.log(results);
    } catch (err) {
      console.log(err);
    }
  })();
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})