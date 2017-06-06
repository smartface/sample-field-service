const MCS = require("sf-extension-mcs");
var options = {
	"backendId": "4aebff42-70ac-44a5-b6f7-b671b0011886", //required
	"baseUrl": "https://smartface-mobilebel.mobileenv.em2.oraclecloud.com", //required
	"androidApplicationKey": "Y2497cdac-2a84-423e-81a8-c84f1caafa47", //required only for analytics & events
	"iOSApplicationKey": "37f2c1a7-9f63-4f22-9ca3-4063909821a9", //required only for analytics & events
	"anonymousKey": "TU9CSUxFQkVMX1NNQVJURkFDRV9NT0JJTEVfQU5PTllNT1VTX0FQUElEOmZzOXEzakltbm9iX2hw" //required only to perform operations without logging in first
};
var mcs = new MCS(options);
exports = module.exports = mcs;