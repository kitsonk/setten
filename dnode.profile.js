var profile = (function(){
	var testResourceRe = /^dnode\/tests\//,

		copyOnly = function(filename, mid){
			var list = {
				"dnode/dnode.profile":1,
				"dnode/package.json":1,
				"dnode/tests":1,
			};
			return (mid in list) ||
				(/^dnode\/resources\//.test(mid) && !/\.css$/.test(filename)) ||
				/(png|jpg|jpeg|gif|tiff)$/.test(filename);
		};

	return {
		resourceTags:{
			test: function(filename, mid){
				return testResourceRe.test(mid);
			},

			copyOnly: function(filename, mid){
				return copyOnly(filename, mid);
			},

			amd: function(filename, mid){
				return !testResourceRe.test(mid) && !copyOnly(filename, mid) && /\.js$/.test(filename);
			}
		}
	};
})();