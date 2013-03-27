# Bugger.js

Live JavaScript error reporting

* Author    : Christian Schlosrich <<christian.schlosrich@gmail.com>>
* Source    : https://github.com/ChristianDen/bugger.js

## Why?
Because I want to know when users on live sites get JavaScript runtime errors that potentially breaks the site.

The combination of platforms, devices and browsers is staggering. Most of the time it is not realistic to test for JavaScript errors on every single combination.
Bugger.js does not replace testing, but at least you will know when your code breaks so you can fix it.

## How?
Bugger.js works by globally catching all JavaScript run time exceptions and sends detailed information about the error stright to you or logs it as a custom event in Google Analytics.
You can also specify a data collection URL where the POST data will be sent and potentially stored. This could be a Node.js, PHP or any other server side script.

## The Error object
When an exception is thrown you'll get notification about:

* The error (eg. Uncaught ReferenceError: boo is not defined)
* Line number
* URL of where the error occured
* Browser vendor & version
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