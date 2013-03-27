#!/bin/bash
java -jar compiler.jar \
--js ../libs/ua-parser.js \
--js ../src/Bugger.js \
--js_output_file ../dist/bugger.min.js