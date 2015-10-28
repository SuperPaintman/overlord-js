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
        func: function(name) {
            return "Hi, " + name;
        }
    }, {
        args: [String, Number],
        func: function(name, meters) {
            return name + " ran " + meters + " meters";
        }
    }, {
        args: [
            String, 
            Number, 
            Array
        ],
        check: [
            /^S/, 
            7, 
            function(arr) {
                if (arr.indexOf('commandos') !== -1) {
                    return true;
                } else {
                    return false;
                }
            }
        ],
        func: function(name, age, games) {
            var game, gameStr, i, j, len;
            gameStr = '';
            for (i = j = 0, len = games.length; j < len; i = ++j) {
                game = games[i];
                if (i > 0 && i < games.length - 1) {
                    gameStr += ', ';
                } else if (i === games.length - 1) {
                    gameStr += ' and ';
                }
                gameStr += game;
            }
            return "In " + age + " years, " + name + " was playing: " + gameStr;
        }
    }, {
        args: ['any', 'any'],
        func: function(var_1, var_2) {
            if (var_1 === var_2) {
                return "Equivalent";
            } else {
                return "Not equivalent";
            }
        }
    }, {
        args: [String, String, '...'],
        func: function() {
            return "We got " + arguments.length + " arguments";
        }
    }, {
        args: [],
        func: function() {
            return "No one variable";
        }
    }
], function() {
    return "Oops, custom call";
});

console.log( say('Sasha') );                                        // Hi, Sasha
console.log( say('Sasha', 10) );                                    // Sasha ran 10 meters
console.log( say('Sasha', 7, ['commandos', 'nfs', 'warcraft']) );   // In 7 years, Sasha was playing: commandos, nfs and warcraft
console.log( say('Sasha', 5, ['commandos', 'nfs', 'warcraft']) );   // Oops, custom call
console.log( say('Artem', 7, ['commandos', 'nfs', 'warcraft']) );   // Oops, custom call
console.log( say('Sasha', 7, ['hugo', 'nfs', 'warcraft']) );        // Oops, custom call
console.log( say(5, 'five') );                                      // Not equivalent
console.log( say(10, 10) );                                         // Equivalent
console.log( say('one', 'two', 'three', 'four') );                  // We got 4 arguments
console.log( say('one', 'two', 'three', 'four', 'five') );          // We got 5 arguments
console.log( say() );                                               // No one variable
console.log( say(1, [], false) );                                   // Oops, custom call
```

### Usage on client-side
```html
<html lang="ru-RU">
<head>
    <meta charset="UTF-8" />
    <title>Overlord.js - bow down before the Lord</title>
    <script type="text/javascript" src="./overlord-v1.1.0-min.js"></script>
</head>
<body>
    <script type="text/javascript">
    var say = overlord([
        {
            args: [String],
            check: [/^(?:S|A|L)/],
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
    console.log(say('Motja'));                  // Oops, custom call
    console.log(say(1, [], false));             // Oops, custom call
    </script>
</body>
```

------------------------------------

## API
### overlord(overloads, default, error)
* `array` **overloads** - array of functions.
    * `object` - information about single function
        * `array` **args** - array of prospective types of arguments. _example: `String, Numberd`_
            * `String`, `Number`, `Object`, `Array`, `Function`, `RegExp`, `Undefined` - for the type of a variable
            * `'any'` - for any type
            * `'...'` - for zero or more any type. It is available from the `arguments` like `arguments[3]`
            * `null`- For zero variables 
        * `function` **function** or **func** - The called function, if types of arguments match
        * `array` **check** - _[optional]_ - array of expected value, regular expression or checking function of verifiable argument
            * `String`, `Number`, `Object`, `Array` - expected value of the argument. Validate by `==` operator. _example: `'foo'`_
            * `RegExp` - a regular expression to validate the argument. _example: `/^www/`_
            * `Function` - custom checking function. function should return `true` or `false` for validate argument. _example: `function( arg ){ if(arg == 'foo') return true; else return false }`_
* `function` **default** - **function()** If none of the options didn't approach then this function will be called. _default: `undefined`_
* `boolean` **error** - If none of the option didn't approach, default function not defited and it set to true, will be emit event `Cannot read property 'apply' of undefined` . _default: `false`_

------------------------------------

## Test
### Run the mocha test
Current test runs for `8-10 ms`
```sh
npm test
```

Or for old
```sh
mocha test/test.v< version >.js
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

## Innovations in version
### 1.1.0
#### custom arguments validation of overload
```js
var say = overlord([
    {
    args: [String, Number, Array], 
    check: [
        /^S/,               // Using regular expressions
        7,                  // expected value
        function(arr) {     // or custom function
            if (arr.indexOf('commandos') !== -1) return true; // Valid
            else return false;
        }
    ],
    func: function(name, age, games) {
        // ...
    }
]);
```

------------------------------------

## Changelog
### 1.1.2 [ `Stable` ]
* `Add` - property of overload `check`. It may be a expected value, regular expression or checking function of verifiable argument. [Example](#innovations-in-version)
* `Add` - `func` alias for `function` property of overload.
* `Add` - throw error when overload property `func|function` or `args` not set

### 1.0.0 [ `Stable` ]
* `Add` - first realise

