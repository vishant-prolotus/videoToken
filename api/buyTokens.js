var address = require('../address.js');
var contract = require('truffle-contract');
var artifacts = require('../build/contracts/digitalToken.json');
var Records = contract(artifacts);
var config=require('../config.json');


var errorMessage = "";

module.exports = {
	buyTokens: function(req, res, next) {
		console.log('buy tokens called');
		var vidAddress=req.body.vidAddress;
        var from=req.body.fromAddress;
		var secondAcc=req.body.secondAcc;
        var tokenAmount=0+req.body.tokenAmount;
        var ether=0+req.body.etherAmount;
        var record;

		
		Records.setProvider(web3.currentProvider);
	Records.deployed().then(function(instance) {
			record = instance;
			/*var event = record.ReturnResult({_from: from});
					event.watch(function(err, result) {
					if (err) {
						console.log(err)
						return;
					}
					console.log(result);
					console.log(result.args.message)
					// check that result.args._from is web3.eth.coinbase then
					// display result.args._value in the UI and call    
					 event.stopWatching()
					});*/
            return record.buyTokens(vidAddress,tokenAmount,secondAcc,{from:from,value:web3.toWei(ether,"ether"),gas:4500000});
		}).then(function(value) {
			console.log({message: "Success",Remarks:value.logs[0].args.message,value:value});
			console.log('after passing--');
			res.json({message: "Success",Remarks:value.logs[0].args.message,value:value});
		}).catch(function(e) {
			console.log({message: "Failure", Error: e})
			res.json({message: "Failure",error:e});
		});
	}
}