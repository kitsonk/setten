
var tests = ["setten/tests/all"];

dojoConfig = {
	baseUrl: "..",
	async: 1,

	hasCache: {
		"host-node": 1,
		"dom": 0
	},

	packages: [{
		name: "dojo",
		location: "dojo"
	},{
		name: "setten",
		location: "setten"
	},{
		name: "doh",
		location: "util/doh"
	}],

	tests: tests,

	deps: ["setten/tests/runner"]
};

require("../../dojo/dojo.js");
