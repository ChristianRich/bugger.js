# Bugger.js

Live JavaScript error reporting

* Author    : Christian Schlosrich <<christian.schlosrich@gmail.com>>
* Source    : https://github.com/ChristianDen/bugger.js

## Why?
Because I want to know when users on live sites experience JavaScript runtime errors that potentially breaks the site.

## How?
Bugger.js works by globally catching JavaScript exceptions and sends detailed information about the error. Data collection points would either be Google Analytics or a custom server side script via POST.

## The Error object
When an exception is thrown a JSON object containing detailed information will be created and contains:

* The error
* Line number
* URL
* UserAgent / OS / device
* Time stamp
* A unique id so we can seperate errors in different application instances

Example of an error:

```html
{ "error": "Uncaught ReferenceError: FooBar is not defined",
  "line": 37,
  "url": "http://localhost:8888/libs/Bugger.js/test/",
  "userAgent": {
    "browser": {
      "name": "Chrome",
      "version": "26.0.1410.43",
      "major": "26"
    },
    "engine": {
      "name": "WebKit",
      "version": "537.31"
    },
    "os": {
      "name": "Mac OS X",
      "version": "10.6.8"
    },
    "device": {
    }
  },
  "timestamp": "2013-03-28T02:16:06.690Z",
  "uuid": "db43aeee-7891-eebd-c551-523135acd9b6"
}
```

## Implementation

```html
<script src="js/bugger.min.js"></script>

<script>
    var bugger = new Bugger({

        // true for logging to Google Analytics (if the GA instance is not found this flag is ignored)
        useGA : true,

        // URL where errors are posted
        postURL : 'http://localhost:8888/libs/Bugger.js/test/collect.php',

        // Optional callback when errors are detected
        onError : function(error){
        }
    });
</script>
```
