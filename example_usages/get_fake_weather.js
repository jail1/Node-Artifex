(function() {

	var ranch = require('../sources/'); 
	var workers    = ranch(require.resolve('./child'));

	var ret        = 0;

	for(var i = 0; i < 10; i++) {
		workers('#' + i + ' FOO ', function(err, output) {
			console.info(output, i);
			if(++ret == 10)
				ranch.end(workers);
		});
	}

}).call(this);