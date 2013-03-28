# Bugger.js

Live JavaScript error reporting

* Author    : Christian Schlosrich <<christian.schlosrich@gmail.com>>
* Source    : https://github.com/ChristianDen/bugger.js

## Why?
Because I want to know when users on live sites experience JavaScript runtime errors.
This has been made before but I decided to make one that was:

* 100% free to use
* Open source
* No dependencies
* Straight forward to implement

Similar libraries might come with more bells and whistles and Bugger.js is very basic but gets the job done.
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
{
  "error": "Uncaught ReferenceError: WTF is not defined",
  "line": 37,
  "url": "http://localhost:8888/libs/Bugger.js/test/",
  "userAgent": {
    "browser": {
      "name": "Chrome",
      "version": "26.0.1410.43",
      "major": "26"
    },
    "viewport": {
      "width": 1238,
      "height": 276
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
  "timestamp": "Thu Mar 28 2013 16:20:16",
  "uid": "46c00d7f-a58e-7ce2-3b58-072c37eeffa5"
}
```

## Implementation

```html
<script src="js/bugger.min.js"></script>

<script>
  /**
  * Instantiating Bugger
  * useGA: true for logging to Google Analytics (if the GA instance is not found this flag is ignored)
  * postURL: URL where errors are posted
  * onError: callback when exceptions are thrown
  */
    var bugger = new Bugger({
        useGA : true,
        postURL : 'http://localhost:8888/libs/Bugger.js/test/collect.php',
        onError : function(error){
          // Do whatever
        }
    });
</script>
```
