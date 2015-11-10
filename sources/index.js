(function() {

	// # This module packs everything together.

	const Farm = require('./ranch')

	var farms = [];

	function farm (options, path, methods) {
	  if (typeof options == 'string') {
	    methods = path
	    path = options
	    options = {}
	  }

	  var f   = new Farm(options, path)
	    , consume = f.setup(methods)

	  farms.push({ farm: f, consume: consume })

	  return consume
	}

	function end (consume, callback) {
	  for (var i = 0; i < farms.length; i++)
	    if (farms[i] && farms[i].consume === consume)
	      return farms[i].farm.end(callback)
	  process.nextTick(callback.bind(null, 'Worker farm not found!'))
	}

	module.exports     = farm
	module.exports.end = end

}).call(this);