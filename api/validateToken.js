var address = require('../address.js');
var contract = require('truffle-contract');
var artifacts = require('../build/contracts/digitalToken.json');

var Records = contract(artifacts);
var accounts; var account;
var errorMessage = "";

module.exports = {
	checkIfVidExists: function(req, res, next) {
        
		console.log('checkIfVidExists called');
		var vidAddress=req.query.vidAddress;
        var user=req.query.user;
        
        var record;
        console.log(vidAddress);
        console.log(user);
		Records.setProvider(web3.currentProvider);
	Records.deployed().then(function(instance) {
			record = instance;

			return record.checkIfVidExists.call(user,vidAddress);
		}).then(function(value) {
			console.log({message: "Success",value:value});
			console.log('after passing--');
			res.json({message: "Success",tokenValidity:value});
		}).catch(function(e) {
			console.log({message: "Failure", Error: e})
			res.json({message:value,error:e});
		});
	}
}