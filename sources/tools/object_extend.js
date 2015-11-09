// # Object extend. Extend the functionality of an object, without mutating the object.

(function() {

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	function extend(target, mutate) {
		// # You may want your target object to be considered immutable.
	    if(!mutate) {
	    	var target = {}
	    } 

	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i]

	        for (var key in source) {
	            if (hasOwnProperty.call(source, key)) {
	                target[key] = source[key]
	            }
	        }
	    }

	    return target
	}

	// # Reveal the module.

	module.exports = extend;

}).call(this);

