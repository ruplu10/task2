
const { pool } = require("../db");
const jsonwebtoken = require('jsonwebtoken')
const JWT_SECRET = '21ddddaadadf'
exports.getRegister = (req, res) => {
  res.render('register');
};
exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postRegister = (req, res) => {
const profile_picture = req.file.filename
const {firstname,lastname,password}=req.body
// const files = req

  const sql = "INSERT INTO users (firstname, lastname, password,profile_picture) VALUES ($1,$2,$3,$4) returning *"
const value = [firstname,lastname,password,profile_picture] 
 pool.query(sql,value,(err, result) => {
  if (err) {
    console.error('Error executing query', err);
    res.send('Error inserting data');
  } else {
    console.log('Data inserted successfully');
    const user = result.rows[0]
    res.render('user',{user})  }});};
exports.getUser = (req, res) => {
  const { userName } = req.params;

  // Get the user with the matching username from the usersMap
  // const user = usersMap.get(userName);

  // Create a new user object with the retrieved information
  const { firstName, lastName, profilePicture } = user;
  const newUser = new User(firstName, lastName, userName, profilePicture);

  // Render the user details page with the user object
  res.render('user', { user: newUser });
};
exports.postLogin = async (req, res) => {
// console.log('login page');
const {firstname,password} = req.body;
// res.send(req.body)

if (firstname == 'admin' && password == 'admin'){
  const token = jsonwebtoken.sign({firstname}, JWT_SECRET)
  console.log(token);
  return res.status(200).json({success: true, token, message: 'Authentication success'})
}
return res.status(401).send('Invalid')
}

