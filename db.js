// const {Pool} = require('pg');


// const pool = new Pool({
//     user : 'postgres',
//     host: 'localhost',
//     database: 'postgres',
//     password: 'root',
//     port: '5433',
//   })
//   console.log('here',pool);
// //   const createUserTable = () => {
// //     return pool.query('create table if not exists users(id int primary key, name varchar(30), age int)', (err, results) => {
// //         if(err){
// //             console.log('ERR: ', err)
// //         }

// //         console.log('Response', results)
// //     })
  
//   ;
  
//   module.exports = pool;
  



const { Pool, Client } = require('pg')
 
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port: 5433,
})
 
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
 
const client = new Client({
    user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port: 5433,
})
client.connect()
 
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
  client.end()
// })
console.log('connect to db');
module.exports = {
    pool,client
};