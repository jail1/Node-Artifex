(function() {

	// # This module basically creates a fork process on a given file. 
	// # Perhaps the most important function n the childProcess api (fork).

	const childProcess = require('child_process'),
		  childModule  = require.resolve('./child_process');

  	// # Refers to the internal child_process.fork implementation.

	// # process.cwd()
	// # From the official docs.
	// # Returns the current working directory of the process.

	// # child.send(message[, sendHandle][, callback])
	// #
	// # message Object
	// # sendHandle Handle object
	// # callback Function
	// # Return: Boolean
	// #
	// # When using child_process.fork() you can write to the child using child.send(message[, sendHandle][, callback]) 
	// # and messages are received by a 'message' event on the child.

	function fork(forkModule) {
		var child = childProcess.fork(childModule, {
			env: process.env,
			cwd: process.cwd()
		});

		child.send({ module : forkModule });

		// # Reveal.

		return {
			send : function(data) {
				try {
					child.send(data);
				} catch(e) {
					// # This should be picked up by onExit and the operation requeued.
				}
			},
			child : child
		}

	}

	// # Export the module.

	module.exports = fork;

}).call(this);