require([
	"dojo/_base/config",
	"doh/runner"
], function(config, doh){

	doh.debug = console.log;
	doh.error = console.log;

	var oldReport = doh._report;
	doh._report = function(){
		oldReport.apply(doh, arguments);
		if(this._failureCount > 0 || this._errorCount > 0){
			process.exit(1);
		}
	};

	console.log("\n"+doh._line);
	console.log("The Dojo Unit Test Harness, $Rev: 23869 $");
	console.log("Copyright (c) 2011, The Dojo Foundation, All Rights Reserved");
	console.log("Running with node.js");

	if(config.tests && config.tests.length){
		config.tests.forEach(function(test){
			console.log("loading test " + test);
		});
		console.log(doh._line, "\n");

		require(config.tests, function(){
			doh.run();
		});
	}else{
		console.log("No Tests!!");
		console.log(doh._line, "\n");
	}
});