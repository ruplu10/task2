const express = require('express');
const ejs = require('ejs');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser')
const {pool, client} = require('./db.js')
const jsonwebtoken = require('jsonwebtoken')
const JWT_SECRET = '21ddddaadadf'
const app = express();

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Set up routes
const userController = require('./controller/userController.js');

app.get('/register', userController.getRegister);
app.post('/register', upload.single('profile_picture'), userController.postRegister);

app.get('/user/:userName', userController.getUser);

app.get('/login' ,userController.getLogin);
app.post('/login',userController.postLogin)
// const {username, password}= req.body
// if (username == 'admin' && password == 'admin'){
//   const token = jsonwebtoken.sign({username}, JWT_SECRET)
//   console.log(token);
//   return res.status(200).json({success: true, token, message: 'Authentication success'})
// }
// return res.status(401).send('Invalid')
// })

// Start server
const port = process.env.PORT || 3006;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
