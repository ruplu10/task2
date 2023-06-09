const express = require('express');
const ejs = require('ejs');
const path = require('path');
const multer = require('multer');
const {pool, client} = require('./db.js')

const app = express();

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended : true}))
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

// Start server
const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
