var app=require('express');
var router=app.Router();
var addVid=require('../api/addVideo.js');
var buyTokens=require('../api/buyTokens.js');
var readVid=require('../api/readVid.js');
var validateVid=require('../api/validateToken.js');
var readAllVids=require('../api/readAllVids.js');
var transferToken=require('../api/transferToken.js');

router.post('/addVideo',function(req,res){                  //Add video in contract
    addVid.addVideo(req,res);
});

router.post('/buyTokens',function(req,res){                 //Buy tokens for a video
    buyTokens.buyTokens(req,res);
});

router.get('/readVid',function(req,res){                   //Read video for a user
    readVid.readVidByUser(req,res);
});

router.get('/validateTokenforVid',function(req,res){       //Validate token for a video for a user
    validateVid.checkIfVidExists(req,res);
});

router.get('/readAllVids',function(req,res){               //read all videos for a user
    readAllVids.readAllVids(req,res);
});

router.post('/transferTokens',function(req,res){            //transfer video tokens to other account
    transferToken.transferTokens(req,res);
});

module.exports=router;