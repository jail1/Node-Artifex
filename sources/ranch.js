(function() {

	'use strict';

	// # Some specific properties.

	var numberOfCores = require('os').cpus().length,
		cachedCreate  = require('errno').create;

	const INF 		  = Infinity;

	const DEFAULT_CONFIG = {
		maxCallsPerWorker			: INF,
		maxConcurrentWorkers		: numberOfCores,
		maxConcurrentCallsPerWorker : 10,
		maxConcurrentCalls          : INF,
		maxCallTime                 : INF, // # Wanna guess why this is infinite ? If you exceed this, the whole worker is done.
		maxRetries					: INF,
		forcedKillTime 				: 100,
		autoStart 					: false
	};

	// # Include the required modules.
	// # Also, create the necessary error listeners.

	const   objectExtend 				= require('./tools/object_extend.js'),
			fork 	   					= require('./fork'),
			TimeoutError				= cachedCreate('TimeoutError'),
			ProcessTerminatedError		= cachedCreate('ProcessTerminatedError'),
			MaxConcurrentCallsError 	= cachedCreate('MaxConcurrentCallsError');

	// # Create the ranch Factory.

	function Ranch(options, path) {
		this.options 		= extend(DEFAULT_OPTIONS, options);
		this.path 	 		= path;
		this.activeCalls	= 0;
	}

	

}).call(this);