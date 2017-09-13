var address = require('../address.js');
var contract = require('truffle-contract');
var artifacts = require('../build/contracts/digitalToken.json');

var Records = contract(artifacts);
var accounts; var account;
var errorMessage = "";

module.exports = {
	readAllVids: function(req, res, next) {
        
		console.log('readVidByUser called');
	
        var user=req.query.user;
        
        var record;
      
        console.log(user);
		Records.setProvider(web3.currentProvider);
	Records.deployed().then(function(instance) {
			record = instance;
			
			return record.readAllVids.call({from:user});
		}).then(function(value) {
			console.log({message: "Success",value:value});
			console.log('after passing--');
			var allvids=[];
			for (var i=0;i<value.length;i++){
				if (parseInt(value[i])){
					allvids.push(value[i]);
				}
			}
			res.json({message: "Success",allVideos:allvids});
		}).catch(function(e) {
			console.log({message: "Failure", Error: e})
			res.json({message:value,error:e});
		});
	}
}