var address = require('../address.js');
var contract = require('truffle-contract');
var artifacts = require('../build/contracts/digitalToken.json');
var config=require('../config.json');
var crypto=require('crypto');
var Records = contract(artifacts);
var accounts; var account;
var errorMessage = "";


module.exports = {
	addVideo: function(req, res, next) {
        console.log('addvideo called');
        var hash=crypto.createHash('md5').update(''+Date.now()).digest('hex');
        console.log(hash);
		var vidAddress='0x'+hash;
        var supply=0+req.body.supply;
        var name=req.body.name;
        var owner=req.body.owner;
        var buyprice=0+req.body.buyprice;
        var from=req.body.from;
        var record;
       
		Records.setProvider(web3.currentProvider);
	Records.deployed().then(function(instance) {
			record = instance;
            
			return record.addVid(vidAddress,supply,name,owner,buyprice,{from:from,gas:4500000});
		}).then(function(value) {
			console.log('after passing--');
            console.log(value);
            res.json({message: "Success",Remarks:value.logs[0].args.message,videoAddress:vidAddress,value:value});
            
			/*return record.readVidByUser.call(vidAddress,config.contractAddress);
                }).then(function(value) {
                    console.log({message: "Success",value:value});
                    console.log('after passing--');
                    var result={addressVid:value[0],initialTokens:0+value[1],Title:value[2],ownerAddress:value[3],valueOfTokenInWei:0+value[4]}
                    res.json({message: "Success",response:result});
                }).catch(function(e) {
                    console.log({message: "Failure", Error: e});
                    res.json({error:e});
                });*/
            
		}).catch(function(e) {
			console.log({message: "Failure", Error: e})
			res.json({message:value});
		});
	}
}