const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());


let ADMINS = [{
    username: 'admin',
    password: '1234'
}];
let USERS = [];
let COURSES = [];

app.post('/admin', (req, res)=>{
    res.send(ADMINS);
});

// ADMIN ROUTES
app.post('/admin/signup', (req, res) => {
  // LOGIC TO SIGNUP AS ADMIN
  var user = req.body.username;
  var pass = req.body.password;
  var newUser = {
      username: user,
      password: pass
  }
  ADMINS.push(newUser);
  res.send('Admin Created Successfully !');
});

function authenticate(user, pass){
    //FUNCTION TO AUTHENTICATE ADMIN
   for(const value of ADMINS){
       if((value.username === user) && (value.password === pass)){
           return true;
       }
   }
   return false;
}

app.post('/admin/login', (req, res) => {
  // LOGIC TO LOGIN AS ADMIN
  var user = req.headers.username;
  var pass = req.headers.password;
  var status = authenticate(user, pass);
  if(status === true){
    res.send('Logged in successfully !');
  }
  else res.send('Wrong ID/Password');
});

var courseId = -1;
app.post('/admin/createCourse', (req, res) => {
  // LOGIC TO CREATE A COURSE
  var user = req.headers.username;
  var pass = req.headers.password;
  var status = authenticate(user, pass);
  if(status === true){
    courseId++;
    var createdCourse = {
        id: courseId,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    }
    COURSES.push(createdCourse);
    res.send('Course created successfully with ID: ' + courseId);
  }
  else res.send('Wrong ID/Password');
});

app.put('/admin/courses/:Id', (req, res) => {
  // LOGIC TO EDIT COURSES
  var user = req.headers.username;
  var pass = req.headers.password;
  var status = authenticate(user, pass);
  if(status === true){
   courseId = parseInt(req.params.Id);
   COURSES[courseId].title = req.body.title;
   COURSES[courseId].description = req.body.description;
   COURSES[courseId].price = req.body.price;
   res.send('Course Updated Successfully !');
  }
  else res.send('Wrong ID/Password');
});

app.get('/admin/courses', (req, res) => {
  // LOGIC TO GET ALL COURSES
  var user = req.headers.username;
  var pass = req.headers.password;
  var status = authenticate(user, pass);
  if(status === true){
    res.send(COURSES);
  }
  else res.send('Wrong ID/Password');
  
});

// USER ROUTES
app.post('/users/signup', (req, res) => {
  // LOGIC TO SIGNUP USER
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
