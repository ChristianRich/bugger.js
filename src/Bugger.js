/**
 * Live JavaScript error reporting (c) 2013 Christian Schlosrich
 * Errors can be logged to Google Analytics or via POST to any desired url.
 *
 * Currently errors contain information about the error itself, OS, Browser and time.
 * Additionally a unique id is attached to each app instance.
 *
 * http://www.github.com/ChristianDen/bugger.js
 */
;(function(window){

	'use strict';

	/**
	 * @param pushToGA
	 * @param postURL
	 * @constructor
	 */
	var Bugger = function(pushToGA, postURL){

		Bugger.MAX_ERRORS = 10;
		Bugger.VERSION = '1.0';
		Bugger.NUM_ERRORS = 0;
		Bugger.SUPPRESS_ERRORS = false;
		Bugger.LOG = false;

		var pushToGA = pushToGA || false,
			postURL = postURL || null,
			ua = new UAParser().getResult(),
			uuid,
			iframe;

		/**
		 * Catches runtime errros
		 * @param msg
		 * @param url
		 * @param linenumber
		 * @returns {*}
		 */
		window.onerror = function(msg, url, linenumber){

			if(Bugger.NUM_ERRORS >= Bugger.MAX_ERRORS){
				return;
			}

			Bugger.NUM_ERRORS++;

			var e = getError(msg, url, linenumber);

			if(Bugger.LOG){
				console.log('Bugger.js caught a runtime exception!');
			}

			if(pushToGA) trackGA(e);
			if(postURL) postToUrl(postURL, e);
			return Bugger.SUPPRESS_ERRORS;
		};

		/**
		 * Constructing the error object
		 * @param msg
		 * @param url
		 * @param linenumber
		 * @returns {object}
		 */
		var getError = function(msg, url, linenumber){
			return{
				error : msg,
				line : linenumber,
				url : url,
				userAgent : ua.browser.name + ' ' + ua.browser.major,
				OS : ua.os.name + ' ' + ua.os.version,
				device : ua.device.model + ' ' + ua.device.vendor + ' ' + ua.device.type,
				date: new Date(),
				uuid : uuid
			}
		};

		/**
		 * Reporting the error to GA
		 * @param errorStr
		 */
		var trackGA = function(errorStr){

			if(!window._gaq){
				console.log('GA tracker undefined');
				return;
			}

			window._gaq.push(['_trackEvent', 'Bugger.js', 'JavaScript error', 'Details: ' + objectToString(errorStr)]);
		};

		/**
		 * Posting the error to an URL
		 * @param url
		 * @param errorObj
		 */
		var postToUrl = function(url, errorObj){

			var f = document.getElementById('569c4fc7-4390-5426-456b-ea08623f7e96');

			if(f && f.parentNode){
				f.parentNode.removeChild(f);
				f = null;
			}

			var form = document.createElement('form');
			form.setAttribute('method', 'POST');
			form.setAttribute('enctype', 'multipart/form-data');
			form.setAttribute('action', url);
			form.setAttribute('target', 'iframe');
			form.setAttribute('id', '569c4fc7-4390-5426-456b-ea08623f7e96');

			for(var key in errorObj) {
				if(errorObj.hasOwnProperty(key)) {
					var input = document.createElement('input');
					input.setAttribute('type', 'hidden');
					input.setAttribute('name', key);
					input.setAttribute('value', errorObj[key]);
					form.appendChild(input);
				}
			}

			if(Bugger.LOG){
				console.log(form);
			}

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
		 * Formats an object to String
		 * @param o
		 * @returns {string}
		 */
		var objectToString = function(o){
			var res = '';

			for(var i in o){
				if(o[i]){
					res += i + ': ' + o[i] + ', ';
				}
			}

			return res;
		};

		/**
		 * Random hex
		 * @returns {string}
		 */
		var s4 = function() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		};

		/**
		 * Generate a unique app instance id
		 * @returns {string}
		 */
		var getGuid = function() {
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		};

		uuid = getGuid();
	};

	window.Bugger = Bugger;

})(window);