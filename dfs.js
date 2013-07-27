define([
	'dojo/node!fs',
	'./util'
], function (fs, util) {

	var dfs = {},
		singleArgFunctions = ['exists'];

	// Iterate through each property of the module
	for (var f in fs) {
		if (typeof fs[f] === 'function' && !/(^[_A-Z]|^create|^(un)?watch|Sync$)/.test(f)) { // It is something we want to convert
			dfs[f] = util.asDeferred(fs[f], fs, ~singleArgFunctions.indexOf(f)); // Create a deferred
		} else {
			dfs[f] = fs[f]; // Leave alone
		}
	}

	return dfs;
});