var address = require('../address.js');
var contract = require('truffle-contract');
var artifacts = require('../build/contracts/digitalToken.json');
var config=require('../config.json');

var Records = contract(artifacts);
var accounts; var account;
var errorMessage = "";


module.exports = {
	transferTokens: function(req, res, next) {
		//start();
        console.log('addvideo called');
		var vidAddress=req.body.vidAddress;
        var newOwner=req.body.newOwner;
        var amount=0+req.body.amount;
        var from=req.body.from;
        var record;
        console.log(typeof(supply));
        console.log(typeof(buyprice));
		Records.setProvider(web3.currentProvider);
	Records.deployed().then(function(instance) {
			record = instance;
            
			return record.transferTokens(newOwner,vidAddress,amount,{from:from,gas:4500000});
		}).then(function(value) {
			console.log({message: "Success",value:value});           
			res.json({message: "Success",Remarks:value.logs[0].args.message,value:value});
		}).catch(function(e) {
			console.log({message: "Failure", Error: e})
			res.json({message:value});
		});
	}
}