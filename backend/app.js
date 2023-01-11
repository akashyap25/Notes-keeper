const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const ejs= require("ejs");
const { urlencoded } = require("express");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var findOrCreate = require('mongoose-findorcreate');

const PORT = process.env.PORT || 5000;

const app = express();



//login

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.set('strictQuery', true);


app.use(session({
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(
  "mongodb://localhost:27017/notesDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (!err) {
      console.log("Database Connected..");
    } else console.log("Database Connection Error..", err);
  }
);

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    googleId: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);




const User= new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/secrets",
  userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);

  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));


// app.get("/", function(req,res){
 
//   res.render("home");
 
// });

app.get('/auth/google',
  passport.authenticate('google', { scope: ["profile"] }));

  app.get('/auth/google/secrets',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/');
  });

app.get("/login", function(req,res){
    res.render("login");
  });

  app.get("/register", function(req,res){
    res.render("register");
  });

  app.get("http://localhost:3000/", function(req,res){
    if (req.isAuthenticated()){
      res.render("http://localhost:3000/");
    } else {
      res.redirect("/login");
    }
  });

  app.get("/logout", function(req,res){
    req.logout(function(err){
      if(err){
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
     
  });

  app.post("/register", function(req,res){

    User.register({username:req.body.username}, req.body.password, function(err,user){
       if(err){
        console.log(err);
        res.redirect("/register");
       } else {
        passport.authenticate("local")(req,res, function(){
            res.redirect("http://localhost:3000/");
        });
       }
    });
   
  });


  app.post("/login", function(req,res){
    
    const user= new User({
     username: req.body.username,
      password: req.body.password
    });

    req.login(user, function(err,){
       if(err){
        console.log(err);
       } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("http://localhost:3000/");
        })
       }
    });
                
  });




app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);



const notesSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Notes = mongoose.model("Notes", notesSchema);

app.get("/", function (req, res) {
  Notes.find({})
  .then((items) => res.json(items))
  .catch((err) => console.log(err));
});

app.post("/create", function (req, res) {
  var db = mongoose.connection;
  const title = req.body.title;
  console.log(title);
  const content = req.body.content;
  console.log(content);
  const newNote = {
    title: title,
    content: content,
  };
  console.log(newNote);

  db.collection("notes").insertOne(newNote, (err, collection) => {
    if (err) {
      console.log(err);
    }
    console.log("Record Inserted Successfully");
  });
});

app.listen(PORT, function () {
  console.log("Server is alive");
});

