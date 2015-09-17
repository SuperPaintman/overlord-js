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

console.log say('Sasha')
console.log say('Sasha', 10)
console.log say(['Sasha', 'Lesha', 'Artem'])
console.log say(5, 'five')
console.log say(10, 10)
console.log say('one', 'two', 'three', 'four')
console.log say('one', 'two', 'three', 'four', 'five')
console.log say()
console.log say(1, [], false)