# Bugger.js

* Author    : Christian Schlosrich <<christian.schlosrich@gmail.com>>
* Source    : https://github.com/ChristianDen/Bugger.js

Live JavaScript error reporting

# Why?
Because I want to know when users on live sites get JavaScript runtime errors that potentially breaks the site.

The combination of platforms, devices and browsers is staggering. Most of the time it is not realistic to test for JavaScript errors on every single combination.
Bugger.js does not replace testing, but at least you will know when your shit breaks and get a chance to fix it.

# How?
Bugger.js works by globally catching all JavaScript run time exceptions and sends detailed information about the error.
Currently Google Analytics and POST data can be used to collect data.

# The Error object
When an exception is thrown you'll get notification about:

The error type (eg. Uncaught ReferenceError: boo is not defined)
* Line number
* URL of the incident
* Browser vendor / version
* OS
* Device (if applicaple)
* Time stamp
* A unique id for the application instance

# Implementation

var bugger = new Bugger(true, 'http://localhost:8888/libs/Bugger.js/test/collect.php');