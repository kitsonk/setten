define([
	'doh/main',
	'setten/dfs'
], function (doh, dfs) {
	doh.register('tests.dfs', [
		{
			name: 'dfs async no error',
			runTest: function (t) {
				var td = new doh.Deferred();

				dfs.exists('tests/resources/test.txt').then(td.getTestCallback(function (exists) {
					t.t(exists, 'file exists');
				}, function (err) {
					td.errback(err);
				}));

				return td;
			}
		},
		{
			name: 'dfs async with error',
			runTest: function (t) {
				var td = new doh.Deferred();

				dfs.readFile('tests/resources/test.txt', 'utf8').then(td.getTestCallback(function (data) {
					t.is(data, 'test', 'file read');
				}, function (err) {
					td.errback(err);
				}));

				return td;
			}
		},
		{
			name: 'dfs sync',
			runTest: function (t) {
				var data = dfs.readFileSync('tests/resources/test.txt', 'utf8');
				t.is(data, 'test', 'file read');
			}
		}
	]);
});