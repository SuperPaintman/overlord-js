assert = require 'assert'
overlord = require './../overlord.js'

say = overlord [
    {
        args: [RegExp]
        function: (reg)->
            return "It is regular expression"
    }
    {
        args: [String]
        function: (name)->
            return "Hi, #{name}"
    }
    {
        args: [String, Number]
        func: (name, meters)->
            return "#{name} ran #{meters} meters"
    }
    {
        args: [String, Number, Array]
        check:  [
            /^S/
            7
            (arr)->
                if arr.indexOf('commandos') != -1
                    return true
                else 
                    return false
        ]
        function: (name, age, games)->
            gameStr = ''
            for game, i in games
                if i > 0 && i < games.length - 1
                    gameStr += ', '
                else if i == games.length - 1
                    gameStr += ' and '

                gameStr += game

            return "In #{age} years, #{name} was playing: #{gameStr}"
    }
    {
        args: [Array]
        func: (names)->
            namesStr = ''
            for name, i in names
                if i > 0 && i < names.length - 1
                    namesStr += ', '
                else if i == names.length - 1
                    namesStr += ' and '

                namesStr += name

            return "Sat by the fire #{namesStr}";
    }
    {
        args: ['any', 'any']
        func: (var_1, var_2)->
            if var_1 == var_2
                return "Equivalent"
            else
                return "Not equivalent"
    }
    {
        args: [String, String, String, '...']
        func: ()->
            return "We got #{ arguments.length } arguments"
    }
    {
        args: []
        function: ()->
            return "No one variable"
    }
], ->
    return "Oops, custom call"

sayNotDef = overlord [
    {
        args: [String]
        check: ['Sasha']
        func: (name)->
            return "Hi, #{name}"
    }
    {
        args: [String, Number]
        function: (name, meters)->
            return "#{name} ran #{meters} meters"
    }
    {
        args: [Array]
        func: (names)->
            namesStr = ''
            for name, i in names
                if i > 0 && i < names.length - 1
                    namesStr += ', '
                else if i == names.length - 1
                    namesStr += ' and '

                namesStr += name

            return "Sat by the fire #{namesStr}";
    }
    {
        args: ['any', 'any']
        function: (var_1, var_2)->
            if var_1 == var_2
                return "Equivalent"
            else
                return "Not equivalent"
    }
    {
        args: [String, String, String, '...']
        func: ()->
            return "We got #{ arguments.length } arguments"
    }
    {
        args: []
        function: ()->
            return "No one variable"
    }
]

sayError = overlord [
    {
        args: [String]
        function: (name)->
            return "Hi, #{name}"
    }
    {
        args: [String, Number]
        function: (name, meters)->
            return "#{name} ran #{meters} meters"
    }
    {
        args: [Array]
        func: (names)->
            namesStr = ''
            for name, i in names
                if i > 0 && i < names.length - 1
                    namesStr += ', '
                else if i == names.length - 1
                    namesStr += ' and '

                namesStr += name

            return "Sat by the fire #{namesStr}";
    }
    {
        args: ['any', 'any']
        function: (var_1, var_2)->
            if var_1 == var_2
                return "Equivalent"
            else
                return "Not equivalent"
    }
    {
        args: [String, String, String, '...']
        function: ()->
            return "We got #{ arguments.length } arguments"
    }
    {
        args: []
        function: ()->
            return "No one variable"
    }
], null, true

sayErr_noArgs =  overlord [
    {
        function: (name)->
            return "Hi, #{name}"
    }
], null, true

sayErr_noFunc =  overlord [
    {
        args: [String, Number]
        func: (name, meters)->
            return "#{name} ran #{meters} meters"
    }
    {
        args: [String]
    }
], null, true

unitTest = ()->
    describe "overlord", ->
        it "executes overloaded function", ->
            # With default function and without errors
            assert.equal say(/^www/)                                            , "It is regular expression"
            assert.equal say('Sasha')                                           , "Hi, Sasha"
            assert.equal say('Sasha', 10)                                       , "Sasha ran 10 meters"
            assert.equal say('Sasha', 7, ['commandos', 'nfs', 'warcraft'])      , "In 7 years, Sasha was playing: commandos, nfs and warcraft"
            assert.equal say('Sasha', 5, ['commandos', 'nfs', 'warcraft'])      , "Oops, custom call"
            assert.equal say('Artem', 7, ['commandos', 'nfs', 'warcraft'])      , "Oops, custom call"
            assert.equal say('Sasha', 7, ['hugo', 'nfs', 'warcraft'])           , "Oops, custom call"
            assert.equal say(['Sasha', 'Lesha', 'Artem'])                       , "Sat by the fire Sasha, Lesha and Artem"
            assert.equal say(5, 'five')                                         , "Not equivalent"
            assert.equal say(10, 10)                                            , "Equivalent"
            assert.equal say('one', 'two', 'three')                             , "We got 3 arguments"
            assert.equal say('one', 'two', 'three', 'four')                     , "We got 4 arguments"
            assert.equal say('one', 'two', 'three', 'four', 'five')             , "We got 5 arguments"
            assert.equal say()                                                  , "No one variable"
            assert.equal say(1, 5, [], false)                                   , "Oops, custom call"

            # without function and errors
            assert.equal sayNotDef('Sasha')                                     , "Hi, Sasha"
            assert.equal sayNotDef('Sasha', 10)                                 , "Sasha ran 10 meters"
            assert.equal sayNotDef(['Sasha', 'Lesha', 'Artem'])                 , "Sat by the fire Sasha, Lesha and Artem"
            assert.equal sayNotDef(5, 'five')                                   , "Not equivalent"
            assert.equal sayNotDef(10, 10)                                      , "Equivalent"
            assert.equal sayNotDef('one', 'two', 'three')                       , "We got 3 arguments"
            assert.equal sayNotDef('one', 'two', 'three', 'four')               , "We got 4 arguments"
            assert.equal sayNotDef('one', 'two', 'three', 'four', 'five')       , "We got 5 arguments"
            assert.equal sayNotDef()                                            , "No one variable"
            assert.equal sayNotDef(1, 5, [], false)                             , undefined

            # without function and with errors
            try
                sayError(1, 5, [], false)
                error = undefined
            catch e
                error = e.message
            assert.equal sayError('Sasha')                                      , "Hi, Sasha"
            assert.equal sayError('Sasha', 10)                                  , "Sasha ran 10 meters"
            assert.equal sayError(['Sasha', 'Lesha', 'Artem'])                  , "Sat by the fire Sasha, Lesha and Artem"
            assert.equal sayError(5, 'five')                                    , "Not equivalent"
            assert.equal sayError(10, 10)                                       , "Equivalent"
            assert.equal sayError('one', 'two', 'three')                        , "We got 3 arguments"
            assert.equal sayError('one', 'two', 'three', 'four')                , "We got 4 arguments"
            assert.equal sayError('one', 'two', 'three', 'four', 'five')        , "We got 5 arguments"
            assert.equal sayError()                                             , "No one variable"
            assert.equal error                                                  , "Cannot read property 'apply' of undefined"

            # custom errors
            try
                sayErr_noArgs('Sasha')
                error = undefined
            catch e
                error = e.message
            assert.equal error                                                  , "1 overload hasn't arguments"

            try
                sayErr_noFunc('Sasha')
                error = undefined
            catch e
                error = e.message
            assert.equal error                                                  , "2 overload hasn't function"

unitTest()