# Bugger.js

Live JavaScript error reporting

* Author    : Christian Schlosrich <<christian.schlosrich@gmail.com>>
* Source    : https://github.com/ChristianDen/bugger.js

## Why?
Because I want to know when users on live sites experience JavaScript runtime errors that potentially breaks my site.

The combination of platforms, devices and browsers is staggering. Most of the time it is not realistic to test for JavaScript errors on every single combination.
Bugger.js does not replace testing, but at least you will know when your code breaks so you can fix it.

## How?
Bugger.js works by globally catching all JavaScript run time exceptions and sends detailed information about the error straight to you or logs it as a custom event in Google Analytics.
You can also specify a data collection URL where the POST data will be sent and potentially stored. This could be a Node.js, PHP or any other server side script.

## The Error object
When an exception is thrown you'll get notification about:

* The error (eg. 'Uncaught ReferenceError: boo is not defined')
* Line number
* URL / Script file
* Browser vendor and version
* OS
* Device (if applicaple)
* Time stamp
* A unique id so we can seperate errors in different application instances

## Implementation

```html
<script src="js/bugger.min.js"></script>
```

```html
<script>
    var bugger = new Bugger(true, 'http://localhost:8888/libs/Bugger.js/test/collect.php');
</script>
```

The paramenters passed to Bugger.js are:
Track event in Google Analytics: true or false (default is false)
URL of your server side script that collects POST data from a hidden form. Please see the source code for the field names.
