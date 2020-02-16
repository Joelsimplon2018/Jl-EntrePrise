const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const UserModel = require("../models/user.model");


router.post("/authenticate", authenticate);
function authenticate(req, res, next) {
    console.log("controller ", req.body);

  UserModel.authenticate(req.body).then(
    (user, error) => 
      error
        ? res
            .status(400)
            .json({
              message: "Username or password is incorrect",
              success: false
            })
        : !user
        ? res.status(401).send({ message: "Unknown user", success: false })
        : bcrypt.compare(req.body.password, user.password)
            .then(function(match) {
              if (!match) return res.status(401).send("login failed");
              console.log('user before jwt encode : ', user);

              const token = jwt.sign(
                JSON.parse(JSON.stringify(user)),
                config.secret
              );

              res.status(200).send({ success: true, token, user:user });
            })
            .catch(error => next(error))
  );
}

router.patch("/update", updateUser);
function updateUser(req, res, next) {
  //console.log("req.body ",req.body);
  UserModel.updateUser(req.body)
    .then(function(user) {
      if (user) {
        res.json(user);
      } else res.status(400).json({ message: `Update Failed` });
    })
    .catch(err => next(err));
}

router.patch("/update_password", updateUserPassword);
function updateUserPassword(req, res, next) {
  console.log("req.body update pswd ", req.body);
  bcrypt.hash(req.body.newPassword, 10).then(hash => {
    req.body.newPassword = hash;
    UserModel.updateUserPassword(req.body)
      .then(function(user) {
        if (user) {
          router.get("/" + req.body.idUser, getUser);
          console.log("user update password controller ", user);
        } else res.status(400).json({ message: `Update password Failed` });
      })
      .catch(err => next(err));
  });
}

router.post("/register", register);
function register(req, res, next) {
  bcrypt.hash(req.body.password, 10).then(hash => {
    req.body.password = hash;
    UserModel.register(req.body)
      .then(user =>
        user
          ? res.json(user)
          : res.status(400).json({ message: "Error in subscription !" })
      )
      .catch(err => next(err));
  });
}

router.post("/users", createUser);

function createUser(req, res, next) {
  UserModel.createUser(req.body).then(function(NewUser) {
    if (NewUser) res.json(NewUser);
    else
      res
        .status(400)
        .json({ message: `controller : No ...` })
        .catch(err => next(err));
  });
}

router.get("/", getUser);
router.get("/:idusers", getUser);
function getUser(req, res,next) {
  UserModel.getUser(req.params)
    .then(function(user) {
      if (user) {
        //res.json(user);

        const token = jwt.sign(JSON.parse(JSON.stringify(user)), config.secret);
    
        res.status(200).send({ success: true, token });
        console.log("user get ", user);
      } else res.status(400).json({ message: `No user(s) ...` });
    })
    .catch(err => next(err));
}

router.delete("/delete/:idusers", deleteUser);
function deleteUser(req, res, next) {
  UserModel.deleteUser(req.params)
    .then(function(user) {
      if (user) res.json(user);
      else res.status(400).json({ message: `Deleted Failed` });
    })
    .catch(err => next(err));
}

//On export notre routeur
module.exports = router;
