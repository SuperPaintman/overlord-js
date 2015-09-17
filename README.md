# Overloading javascript functions like a overlord 
Overlord-js is a module which allows you to overload functions in a pseudo-functional style

## Installation
### NPM
```sh
npm install overlord-js --save
```

------------------------------------

## Usage
### Usage on server-side
```js
var overlord = require('overlord-js');

var say = overlord([
    {
        args: [String],
        function: function(name) {
            return "Hi, " + name;
        }
    }, {
        args: [String, Number],
        function: function(name, meters) {
            return name + " ran " + meters + " meters";
        }
    }, {
        args: ['any', 'any'],
        function: function(var_1, var_2) {
            if (var_1 === var_2) {
                return "Equivalent";
            } else {
                return "Not equivalent";
            }
        }
    }, {
        args: [String, String, '...'],
        function: function() {
            return "We got " + arguments.length + " arguments";
        }
    }, {
        args: [],
        function: function() {
            return "No one variable";
        }
    }
], function() {
    return "Oops, custom call";
});

console.log(say('Sasha'));                                  // Hi, Sasha
console.log(say('Sasha', 10));                              // Sasha ran 10 meters
console.log(say(5, 'five'));                                // Not equivalent
console.log(say(10, 10));                                   // Equivalent
console.log(say('one', 'two', 'three', 'four'));            // We got 4 arguments
console.log(say('one', 'two', 'three', 'four', 'five'));    // We got 5 arguments
console.log(say());                                         // No one variable
console.log(say(1, [], false));                             // Oops, custom call
```

### Usage on client-side
```html
<html lang="ru-RU">
<head>
    <meta charset="UTF-8" />
    <title>Overlord.js - bow down before the Lord</title>
    <script type="text/javascript" src="./overlord-v1.0.0-min.js"></script>
</head>
<body>
    <script type="text/javascript">
    var say = overlord([
        {
            args: [String],
            function: function(name) {
                return "Hi, " + name;
            }
        }
    ],  function() {
        return "Oops, custom call";
    });
    
    console.log(say('Sasha'));                  // Hi, Sasha
    console.log(say('Lesha'));                  // Hi, Lesha
    console.log(say('Artem'));                  // Hi, Artem
    console.log(say(1, [], false));             // Oops, custom call
    </script>
</body>
```

------------------------------------

## API
### overlord(overloads, default, error)
* `array` **overloads** - array of functions.
    * `object` - information about single function
        * `array` **args** - array of of prospective types of arguments. _example: `String, Numberd`_
            * `String`, `Bumber`, `Mumber`, `Object`, `Function`, `Undefined` - for the type of a variable
            * `'any'` - for any type
            * `'...'` - for zero or more any type. In It is available from the `arguments` like `arguments[3]`
            * `null`- For zero variables 
        * `function` **function** - The called function, if types of arguments match
* `function` **default** - **function()** If none of the options didn't approach then this function will be called. _default: `undefined`_
* `boolean` **error** - If none of the option didn't approach, default function not defited and it set to true, will be emit event `Cannot read property 'apply' of undefined`

------------------------------------

## Test
### Run the mocha test
Current test runs for `7-9 ms`
```sh
npm test
```

------------------------------------

## Build form coffee source
### Build project
```sh
gulp build
```
### Build only browser files
```sh
gulp browserify
```
### Clear all compiled files
```sh
gulp clear
```

------------------------------------

## Changelog
### 1.0.0 [ `Stable` ]
* `Add` - first realise

