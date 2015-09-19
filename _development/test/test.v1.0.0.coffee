assert = require 'assert'
overlord = require './../overlord.js'

say = overlord [
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
        function: (names)->
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
        args: [String, String, '...']
        function: ()->
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
        function: (names)->
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
        args: [String, String, '...']
        function: ()->
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
        function: (names)->
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
        args: [String, String, '...']
        function: ()->
            return "We got #{ arguments.length } arguments"
    }
    {
        args: []
        function: ()->
            return "No one variable"
    }
], null, true

unitTest = ()->
    ###*
     * Canonical
     *
     * "Hi, Sasha"
     * "Sasha ran 10 meters"
     * "Sat by the fire Sasha, Lesha and Artem"
     * "Not equivalent"
     * "Equivalent"
     * "We got 4 arguments"
     * "We got 5 arguments"
     * "No one variable"
     * "Oops, custom call"
     * 
     * "Hi, Sasha"
     * "Sasha ran 10 meters"
     * "Sat by the fire Sasha, Lesha and Artem"
     * "Not equivalent"
     * "Equivalent"
     * "We got 4 arguments"
     * "We got 5 arguments"
     * "No one variable"
     * undefined
     * 
     * "Hi, Sasha"
     * "Sasha ran 10 meters"
     * "Sat by the fire Sasha, Lesha and Artem"
     * "Not equivalent"
     * "Equivalent"
     * "We got 4 arguments"
     * "We got 5 arguments"
     * "No one variable"
     * "Cannot read property 'apply' of undefined"
    ###
    describe "overlord", ->
        it "executes overloaded function", ->
            # With default function and without errors
            assert.equal say('Sasha')                                           , "Hi, Sasha"
            assert.equal say('Sasha', 10)                                       , "Sasha ran 10 meters"
            assert.equal say(['Sasha', 'Lesha', 'Artem'])                       , "Sat by the fire Sasha, Lesha and Artem"
            assert.equal say(5, 'five')                                         , "Not equivalent"
            assert.equal say(10, 10)                                            , "Equivalent"
            assert.equal say('one', 'two', 'three', 'four')                     , "We got 4 arguments"
            assert.equal say('one', 'two', 'three', 'four', 'five')             , "We got 5 arguments"
            assert.equal say()                                                  , "No one variable"
            assert.equal say(1, [], false)                                      , "Oops, custom call"

            # without function and errors
            assert.equal sayNotDef('Sasha')                                     , "Hi, Sasha"
            assert.equal sayNotDef('Sasha', 10)                                 , "Sasha ran 10 meters"
            assert.equal sayNotDef(['Sasha', 'Lesha', 'Artem'])                 , "Sat by the fire Sasha, Lesha and Artem"
            assert.equal sayNotDef(5, 'five')                                   , "Not equivalent"
            assert.equal sayNotDef(10, 10)                                      , "Equivalent"
            assert.equal sayNotDef('one', 'two', 'three', 'four')               , "We got 4 arguments"
            assert.equal sayNotDef('one', 'two', 'three', 'four', 'five')       , "We got 5 arguments"
            assert.equal sayNotDef()                                            , "No one variable"
            assert.equal sayNotDef(1, [], false)                                , undefined

            # without function and with errors
            try
                sayError(1, [], false)
                error = false
            catch e
                error = e.message
            assert.equal sayError('Sasha')                                      , "Hi, Sasha"
            assert.equal sayError('Sasha', 10)                                  , "Sasha ran 10 meters"
            assert.equal sayError(['Sasha', 'Lesha', 'Artem'])                  , "Sat by the fire Sasha, Lesha and Artem"
            assert.equal sayError(5, 'five')                                    , "Not equivalent"
            assert.equal sayError(10, 10)                                       , "Equivalent"
            assert.equal sayError('one', 'two', 'three', 'four')                , "We got 4 arguments"
            assert.equal sayError('one', 'two', 'three', 'four', 'five')        , "We got 5 arguments"
            assert.equal sayError()                                             , "No one variable"
            assert.equal error                                                  , "Cannot read property 'apply' of undefined"

unitTest()