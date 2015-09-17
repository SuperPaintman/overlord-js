'use strict'
###*
 * Overlord-js
 * @author SuperPaintman
 * @site flatdev.ru
###

###*
 * Перегрузка функции
 * @function overlord
 * @param  {Array} overloads         - Массив вариантов перегружаемой функции 
 * @param  {Function} def            - Функция, выполняемая, если ни один из вариантов не подошел
 * @param  {Boolean} error           - Вызывать ли ошибку, в случае, если ни один вариант не подходит и не установлен default вариант
 * @return {Function}                - Перегруженная функция
###
overlord = (overloads, def, error)->
    error = error ? false

    return ()->
        ###*
         * Функция, которая будет вызвана
         * @type {Function|Undefined}
        ###
        if def
            func = def
        else
            func = undefined

        # Обход всех перегрузов
        for overload, i in overloads
            ###*
             * Найдена ли функция
             * @type {Boolean}
            ###
            found = true

            # Проверка на жесткое ограничегие аргументов
            ###*
             * @var {Type|String} firstart   - первый аргумент предполагаемый аргумент
             * @var {Arrar} overargs         - все аргумент являющиеся Type
             * @var {Type|String} lastarg    - последний аргумент предполагаемый аргумент
            ###
            [firstart, ..., lastarg] = overload.args
            if lastarg == '...'
                overargs = overload.args[...-1]
            else
                overargs = overload.args

            # Проверка на равность аргументов, возможность нефиксированных аргументов, или отсутствие их
            if (overargs.length == arguments.length) || (arguments.length > 0 && lastarg == '...') || (arguments.length == 0 && firstart == '...')
                # Обход всех типов
                for type, i in overargs
                    # Проверка допускается ли любой тип переменной
                    if type.constructor == String && type.toLowerCase() == 'any'
                        break
                    # Проверка соответствует ли тип переменной
                    else if arguments[ i ] && arguments[ i ].constructor != type
                        found = false
                        break
            else
                found = false

            # Если все подходит используем эту переменную
            if found
                func = overload.function
                break

        # Вызов функции, если найдено или приводит к ошибке, если установлено error
        if func || error
            func.apply(this, arguments)

module.exports = overlord