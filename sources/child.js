(function() {

	// # This module decides what exactly happens when a certain listener is triggered. (message to be more specific).
	// # From the official documentation, an explanation of the Event : 'message'.
	// # Event: 'message'#

	// # message Object a parsed JSON object or primitive value.
	// # sendHandle Handle object a net.Socket or net.Server object, or undefined.
	// # Messages sent by .send(message, [sendHandle]) are obtained using the message event.

	// # Keep this here.
	var $module; 

	function handle(data) {

		// # Declare necessary expressions.
		var idx 			= data.idx,
			child 			= data.child,
			method 			= data.method,
			args 			= data.args,
			callback 		= function() {
				var _args = Array.prototype.slice.call(arguments);

				// # Remember when I said that the error should be caught by something ? 
				// # This is that something.
				if(_args[0] instanceof Error) {
					var e = args[0];
					_args[0] = {
						'$error' 	: '$error',
						'type'	 	: e.constructor.name,
						'message'	: e.message,
						'stack' 	: e.stack
					}

					Object.keys(e).forEach(function(key) {
						_args[0][key] = e[key];
					});
				}

				process.send({ idx : idx , child : child , args : _args });

			},
			exec;

			if(method == null && typeof $module == 'function') {
				exec = $module;
			} else if(typeof $module[method] == 'function') {
				exec = $module[method];
			}

			if(!exec) {
				return console.error('NO SUCH METHOD: ', method);
			}

			exec.apply(null, args.concat([ callback ]));

	}

	process.on('message', function(data) {

		if(!$module) {
			return $module = require(data.module);
		}

		if(data == 'die') {
			return process.exit(0);
		}

		handle(data);

	});

}).call(this);