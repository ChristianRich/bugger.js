/**
 * Live JavaScript error reporting
 * Author : Christian Schlosrich
 * http://www.github.com/ChristianDen/bugger.js
 */
;(function(window){

	'use strict';

	/**
	 * @param options
	 * @constructor
	 */
	var Bugger = function(options){

		Bugger.MAX_ERRORS = 10;
		Bugger.VERSION = '1.0';
		Bugger.NUM_ERRORS = 0;
		Bugger.SUPPRESS_ERRORS = false;

		var o = options,
			uid,
			iframe,
			self = this;

		/**
		 * Overriding native error handling
		 * @param message
		 * @param url
		 * @param linenumber
		 * @returns {boolean}
		 */
		window.onerror = function(message, url, linenumber){

			if(Bugger.NUM_ERRORS >= Bugger.MAX_ERRORS){
				return;
			}

			Bugger.NUM_ERRORS++;

			var error = JSON.stringify({
				error : message,
				line : linenumber,
				url : url,
				userAgent : new UAParser().getResult(),
				viewport :{
					width: getWidth(),
					height: getHeight()
				},
				timestamp: dateFormat(),
				uid : uid
			});

			if(o.useGA){
				trackGA(error);
			}

			if(o.postURL){
				postToUrl(o.postURL, error);
			}

			if(o.onError){
				o.onError.call(self, error);
			}

			return Bugger.SUPPRESS_ERRORS;
		};
		
		var getWidth = function(){
			return Math.max(
				document.documentElement['clientWidth'],
				document.body['scrollWidth'],
				document.documentElement['scrollWidth'],
				document.body['offsetWidth'],
				document.documentElement['offsetWidth']
			);
		};

		var getHeight = function(){
			return Math.max(
				document.documentElement['clientHeight'],
				document.body['scrollHeight'],
				document.documentElement['scrollHeight'],
				document.body['offsetHeight'],
				document.documentElement['offsetHeight']
			);
		};

		/**
		 * Reporting the error to Google Analytics
		 * @param error
		 */
		var trackGA = function(error){

			// Checking Google Analytics availablity
			if(!window._gaq){
				return;
			}

			// Building the event
			var category = 'JavaScript error',
				action = 'error',
				opt_label = error;

			// Pushing to GA instance
			window._gaq.push(['_trackEvent', category, action, opt_label]);
		};

		/**
		 * Posting the error to an URL
		 * @param url
		 * @param error
		 */
		var postToUrl = function(url, error){

			// Clean up if the form already exists in the DOM
			var f = document.getElementById('569c4fc7-4390-5426-456b-ea08623f7e96');
			if(f && f.parentNode) f.parentNode.removeChild(f);

			var form = document.createElement('form');
			form.setAttribute('method', 'POST');
			form.setAttribute('action', url);
			form.setAttribute('target', 'iframe');
			form.setAttribute('id', '569c4fc7-4390-5426-456b-ea08623f7e96');

			var input = document.createElement('input');
			input.setAttribute('type', 'hidden');
			input.setAttribute('name', 'data');
			input.setAttribute('value', error);
			form.appendChild(input);

			document.body.appendChild(form);

			if(!iframe){
				iframe = document.createElement('iframe');
				iframe.name = 'iframe';
				iframe.style.display = 'none';
				iframe.style.width = iframe.style.height = 1;
				document.body.appendChild(iframe);
			}

			form.submit();
		};

		/**
		 * Generate a unique app instance id
		 * @returns {string}
		 */
		var getGuid = function() {

			function n() {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			}

			return n() + n() + '-' + n() + '-' + n() + '-' + n() + '-' + n() + n() + n();
		};

		uid = getGuid();
	};

	window.Bugger = Bugger;

})(window);