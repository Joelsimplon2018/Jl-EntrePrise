const express = require("express");
const router = express.Router();
const multer= require("multer");
const morgan = require('morgan');
const mysql = require('mysql');
const cors= require('cors');
const bcrypt = require("bcrypt");
const fs = require("fs");

const PrestataireModel= require('../models/prestat.model');

router.post('/', createPrestataire);
function createPrestataire(req, res, next){
    PrestataireModel.createPrestataire(function(error, Prestataire){
        if(Prestataire) res.send(Prestataire);
        else res.status(400).send(error);
        
    }, req.body)
}

router.get("/", getPrestataire);
router.get("/:id", getPrestataire);

function getPrestataire(req, res, next){
    PrestataireModel
    .getPrestataire(req.params)
    .then(function(Prestataire){
        if(Prestataire) res.json(Prestataire);
        else res.status(400).json({ message: `controller : No  ...`})
        .catch(err => next(err));
    })
}

router.delete("/:id", deletePrestataire );

function deletePrestataire(req, res, next){
    PrestataireModel.deletePrestataire(req.params).then(function(Prestataire){
        if(Prestataire) res.json(Prestataire);
        else res.status(400).json({ message: `controller : No Prestataire deleded...`})
        .catch(err => next(err));
    })
}
  
router.patch('/', editPrestataire);
function editPrestataire(req, res, next){
    PrestataireModel.editPrestataire(req.body).then(function(Prestataire){
        if(Prestataire) res.json(Prestataire);
        else res.status(400).json({ message: `controller : No ...`})
        .catch(err => next(err));
    })
}

   
  module.exports = router;