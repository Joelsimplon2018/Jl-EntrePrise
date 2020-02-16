const express = require("express");
const router = express.Router();
const multer= require("multer");
const morgan = require('morgan');
const mysql = require('mysql');
const cors= require('cors');
const bcrypt = require("bcrypt");
const fs = require("fs");

const MissionModel= require('../models/mission.model');


router.post('/', createMission);
function createMission(req, res, next){
    MissionModel.createMission(function(error, Mission){
        if(Mission) res.send(Mission);
        else res.status(400).send(error);
        
    }, req.body)
}
  
router.get("/", getMission);
router.get("/:id", getMission);

function getMission(req, res, next){
    MissionModel
    .getMission(req.params)
    .then(function(Mission){
        if(Mission) res.json(Mission);
        else res.status(400).json({ message: `controller : No  ...`})
        .catch(err => next(err));
    })
}
 

router.delete("/:id", deleteMission );

function deleteMission(req, res, next){
    MissionModel.deleteMission(req.params).then(function(Mission){
        if(Mission) res.json(Mission);
        else res.status(400).json({ message: `controller : No Prestataire deleded...`})
        .catch(err => next(err));
    })
}
  
router.patch('/', editMission);
function editMission(req, res, next){
    MissionModel.editMission(req.body).then(function(Mission){
        if(Mission) res.json(Mission);
        else res.status(400).json({ message: `controller : No ...`})
        .catch(err => next(err));
    })
}

  module.exports = router;
  