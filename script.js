// =============================================================================
//                                  Config 
// =============================================================================

// sets up web3.js
if (typeof web3 !== 'undefined')  {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// Default account is the first one
web3.eth.defaultAccount = web3.eth.accounts[0];
// Constant we use later
var GENESIS = '0x0000000000000000000000000000000000000000000000000000000000000000';

// This is the ABI for your contract (get it from Remix, in the 'Compile' tab)
// ============================================================
var abi =[
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "participants",
		"outputs": [
			{
				"name": "waddress",
				"type": "address"
			},
			{
				"name": "balance",
				"type": "int256"
			},
			{
				"name": "index",
				"type": "uint256"
			},
			{
				"name": "last_time",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_debtor",
				"type": "address"
			},
			{
				"name": "_creditor",
				"type": "address"
			}
		],
		"name": "get_iou_index",
		"outputs": [
			{
				"name": "ind",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "creditor",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "add_IOU",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "user",
				"type": "address"
			},
			{
				"name": "_creditor",
				"type": "address"
			}
		],
		"name": "get_creditor_amount",
		"outputs": [
			{
				"name": "am",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "iou_number",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_debtor",
				"type": "address"
			},
			{
				"name": "_creditor",
				"type": "address"
			}
		],
		"name": "lookup",
		"outputs": [
			{
				"name": "ret",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "user",
				"type": "address"
			}
		],
		"name": "get_total_Oed",
		"outputs": [
			{
				"name": "to",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "get_ith_iou_users",
		"outputs": [
			{
				"name": "users",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_sender_address",
		"outputs": [
			{
				"name": "sa",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_creditor",
				"type": "address"
			},
			{
				"name": "_debtor",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "create_IOU",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "user",
				"type": "address"
			}
		],
		"name": "get_all_creditors",
		"outputs": [
			{
				"name": "creditors",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "user",
				"type": "address"
			}
		],
		"name": "get_last_time",
		"outputs": [
			{
				"name": "time",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "user",
				"type": "address"
			}
		],
		"name": "is_already_participant",
		"outputs": [
			{
				"name": "ip",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "addressList",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_waddress",
				"type": "address"
			}
		],
		"name": "createParticipant",
		"outputs": [
			{
				"name": "this",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "change_IOU",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_iou_number",
		"outputs": [
			{
				"name": "en",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "deployed",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];
abiDecoder.addABI(abi);
// call abiDecoder.decodeMethod to use this - see 'getAllFunctionCalls' for more

// Reads in the ABI
var BlockchainSplitwiseContractSpec = web3.eth.contract(abi);

// This is the address of the contract you want to connect to; copy this from Remix
var contractAddress = '0x3144f7abee48e51c867cc991d0abe5fd5a8c0611' // FIXME: fill this in with your contract's address/hash

var BlockchainSplitwise = BlockchainSplitwiseContractSpec.at(contractAddress)


// =============================================================================
//                            Functions To Implement 
// =============================================================================

// TODO: Add any helper functions here!

// TODO: Return a list of all users (creditors or debtors) in the system
// You can return either:
//   - a list of everyone who has ever sent or received an IOU
// OR
//   - a list of everyone currently owing or being owed money
function getUsers() {
	var users = new Set();
	var iou_number = BlockchainSplitwise.get_iou_number();
	for (i = 0; i < iou_number; i++){
		users.add(BlockchainSplitwise.get_ith_iou_users(i, {gas: 3000000}));
	}
	// var users = BlockchainSplitwise.get_users();
	return Array.from(users);
}

// TODO: Get the total amount owed by the user specified by 'user'
function getTotalOwed(user) {
	var total_owed = BlockchainSplitwise.get_total_Oed(user, {gas: 3000000});
	return total_owed;
}

// TODO: Get the last time this user has sent or received an IOU, in seconds since Jan. 1, 1970
// Return null if you can't find any activity for the user.
// HINT: Try looking at the way 'getAllFunctionCalls' is written. You can modify it if you'd like.
function getLastActive(user) {
	var last_active = BlockchainSplitwise.get_last_time(user, {gas: 3000000});
	return last_active;
}

// TODO: add an IOU ('I owe you') to the system
// The person you owe money is passed as 'creditor'
// The amount you owe them is passed as 'amount'
function add_IOU(creditor, amount) {
	var debtor = BlockchainSplitwise.get_sender_address({gas: 3000000});
	if (BlockchainSplitwise.is_already_participant(debtor, {gas: 3000000}) == false){BlockchainSplitwise.createParticipant(debtor, {gas: 3000000})}
	if (BlockchainSplitwise.is_already_participant(creditor, {gas: 3000000}) == false){BlockchainSplitwise.createParticipant(creditor, {gas: 3000000})}
	var paths = doBFS(creditor, debtor);
	if (paths == null || paths.length == 0){
		console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
		BlockchainSplitwise.add_IOU(creditor, amount, {gas: 3000000});
	}
	else{
		log("cycle detected: ", paths);
		var ious = [{index: -1, value: parseInt(amount, 10, {from: debtor, gas: 3000000})}];
		for (i = paths.length-1; i>0; i--){
			ious.push({
				index: BlockchainSplitwise.get_iou_index(paths[i-1], paths[i], {gas: 3000000}).toNumber(),
				value: BlockchainSplitwise.lookup(paths[i-1], paths[i], {gas: 3000000}).toNumber()
			});
		}
		log("history", ious);
		ious.sort((a,b) => a.value - b.value);
		log("sorted", ious);

		if (ious[0].index == -1){
			for (i=1; i<ious.length; i++){
					BlockchainSplitwise.change_IOU(ious[i].index + 1, ious[0].value, {gas: 3000000});
			}
			sort_iou(paths, 0);
		} 
		else {
			// modify minimum transaction
			log("to be deleted", ious[0].value);
			BlockchainSplitwise.change_IOU(ious[0].index + 1, ious[0].value, {gas: 3000000});
			// add new transaction with the subtracted amount
			BlockchainSplitwise.add_IOU(creditor, amount-ious[0].value, {gas: 3000000});
			
			// replace existed transaction with the subtracted amount
			for (i=1; i<ious.length; i++){
				if (ious[i].index == -1) continue;
				BlockchainSplitwise.change_IOU(ious[i].index + 1, ious[0].value, {gas: 3000000});
			}
			sort_iou(paths, amount-ious[0].value);
		}
	}
}

function sort_iou(paths, amount){
	var ious = [{id: -1, value: parseInt(amount, 10)}];
    for (i = paths.length-1; i>0; i--){
			ious.push({
				id: BlockchainSplitwise.get_iou_index(paths[i-1], paths[i], {gas: 3000000}).toNumber(),
				value: BlockchainSplitwise.lookup(paths[i-1], paths[i], {gas: 3000000}).toNumber()
			});
    }
	log("history", ious);
	ious.sort((a,b) => a.value - b.value);
	log("sorted", ious);
	return ious;
}

function getNeighbors(user){
	// neighbours = [];
	// neighbors = BlockchainSplitwise.get_all_creditors(user);
	console.log("salam");
	console.log(BlockchainSplitwise.get_all_creditors(user));
	return BlockchainSplitwise.get_all_creditors(user);
}
// =============================================================================
//                              Provided Functions 
// =============================================================================
// Reading and understanding these should help you implement the above

// This searches the block history for all calls to 'functionName' (string) on the 'addressOfContract' (string) contract
// It returns an array of objects, one for each call, containing the sender ('from') and arguments ('args')
function getAllFunctionCalls(addressOfContract, functionName) {
	var curBlock = web3.eth.blockNumber;
	var function_calls = [];
	while (curBlock !== GENESIS) {
	  var b = web3.eth.getBlock(curBlock, true);
	  var txns = b.transactions;
	  for (var j = 0; j < txns.length; j++) {
	  	var txn = txns[j];
	  	// check that destination of txn is our contract
	  	if (txn.to === addressOfContract) {
	  		var func_call = abiDecoder.decodeMethod(txn.input);
	  		// check that the function getting called in this txn is 'functionName'
	  		if (func_call && func_call.name === functionName) {
	  			var args = func_call.params.map(function (x) {return x.value});
	  			function_calls.push({
	  				from: txn.from,
	  				args: args
	  			})
	  		}
	  	}
	  }
	  curBlock = b.parentHash;
	}
	return function_calls;
}

// We've provided a breadth-first search implementation for you, if that's useful
// It will find a path from start to end (or return null if none exists)
// You just need to pass in a function ('getNeighbors') that takes a node (string) and returns its neighbors (as an array)
function doBFS(start, end) {
	var queue = [[start]];
	while (queue.length > 0) {
		var cur = queue.shift();
		var lastNode = cur[cur.length-1]
		if (lastNode === end) {
			return cur;
		} else {
			var neighbors = getNeighbors(lastNode);
			for (var i = 0; i < neighbors.length; i++) {
				queue.push(cur.concat([neighbors[i]]));
			}
		}
	}
	return null;
}
// =============================================================================
//                                      UI 
// =============================================================================

// This code updates the 'My Account' UI with the results of your functions
$("#total_owed").html("$"+getTotalOwed(web3.eth.defaultAccount));
$("#last_active").html(timeConverter(getLastActive(web3.eth.defaultAccount)));
$("#myaccount").change(function() {
	web3.eth.defaultAccount = $(this).val();
	$("#total_owed").html("$"+getTotalOwed(web3.eth.defaultAccount));
	$("#last_active").html(timeConverter(getLastActive(web3.eth.defaultAccount)))
});

// Allows switching between accounts in 'My Account' and the 'fast-copy' in 'Address of person you owe
var opts = web3.eth.accounts.map(function (a) { return '<option value="'+a+'">'+a+'</option>' })
$(".account").html(opts);
$(".wallet_addresses").html(web3.eth.accounts.map(function (a) { return '<li>'+a+'</li>' }))

// This code updates the 'Users' list in the UI with the results of your function
$("#all_users").html(getUsers().map(function (u,i) { return "<li>"+u+"</li>" }));

// This runs the 'add_IOU' function when you click the button
// It passes the values from the two inputs above
$("#addiou").click(function() {
  add_IOU($("#creditor").val(), $("#amount").val());
  // window.location.reload(true); // refreshes the page after
});

// This is a log function, provided if you want to display things to the page instead of the JavaScript console
// Pass in a discription of what you're printing, and then the object to print
function log(description, obj) {
	$("#log").html($("#log").html() + description + ": " + JSON.stringify(obj, null, 2) + "\n\n");
}


