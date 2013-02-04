define([
	'doh/main',
	'setten/util'
], function (doh, util) {

	function asyncFunction(value, callback) {
		setTimeout(function () {
			callback.call(this, value === 'error' ? 'error' : null, value);
		}, 0);
	}

	function asyncFunctionNoErr(value, callback) {
		setTimeout(function () {
			callback.call(this, value);
		}, 0);
	}

	doh.register('tests.util', [
		{
			name: 'asDeferred',
			runTest: function (t) {
				var td = new doh.Deferred();

				var fn = util.asDeferred(asyncFunction);

				fn('test').then(td.getTestCallback(function (results) {
					t.is(results, 'test', 'results as expected');
				}), function (err) {
					td.errback(err);
				});

				return td;
			}
		}, {
			name: 'asDeferred no error',
			runTest: function (t) {
				var td = new doh.Deferred();

				var fn = util.asDeferred(asyncFunctionNoErr, this, true);

				fn('test').then(td.getTestCallback(function (results) {
					t.is(results, 'test', 'results as expected');
				}), function (err) {
					td.errback(err);
				});

				return td;
			}
		}, {
			name: 'asDeferred returning error',
			runTest: function (t) {
				var td = new doh.Deferred();

				var fn = util.asDeferred(asyncFunction);

				fn('error').then(function (results) {
					td.errback(results);
				}, td.getTestCallback(function (err) {
					t.is(err, 'error', 'error returned');
				}));

				return td;
			}
		}
	]);
});