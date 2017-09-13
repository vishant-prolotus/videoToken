var address = require('../address.js');
var contract = require('truffle-contract');
var artifacts = require('../build/contracts/digitalToken.json');

var Records = contract(artifacts);
var accounts; var account;
var errorMessage = "";

module.exports = {
	readVidByUser: function(req, res, next) {
        
		console.log('readVidByUser called');
		var vidAddress=req.query.vidAddress;
        var user=req.query.user;
        
        var record;
        console.log(vidAddress);
        console.log(user);
		Records.setProvider(web3.currentProvider);
	Records.deployed().then(function(instance) {
			record = instance;

			return record.readVidByUser.call(vidAddress,user);
		}).then(function(value) {
			var result={addressVid:value[0],initialTokens:value[1],Title:value[2],ownerAddress:value[3],valueOfTokenInWei:value[4]};
			console.log({message: "Success",value:value});
			console.log('after passing--');
			res.json({message: "Success",result:result});
		}).catch(function(e) {
			console.log({message: "Failure", Error: e})
			res.json({message:value,error:e});
		});
	}
}