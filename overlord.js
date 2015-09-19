'use strict';

/**
 * Overlord-js
 * @author SuperPaintman
 * @site flatdev.ru
 */

/**
 * Перегрузка функции
 * @function overlord
 * @param  {Array} overloads         - Массив вариантов перегружаемой функции 
 * @param  {Function} def            - Функция, выполняемая, если ни один из вариантов не подошел
 * @param  {Boolean} error           - Вызывать ли ошибку, в случае, если ни один вариант не подходит и не установлен default вариант
 * @return {Function}                - Перегруженная функция
 */
var overlord;

overlord = function(overloads, def, error) {
  if (error == null) {
    error = false;
  }
  return function() {

    /**
     * Функция, которая будет вызвана
     * @type {Function|Undefined}
     */
    var checkVal, firstart, found, func, i, j, k, l, lastarg, len, len1, len2, overargs, overload, ref, ref1, type;
    if (def) {
      func = def;
    } else {
      func = void 0;
    }
    for (i = j = 0, len = overloads.length; j < len; i = ++j) {
      overload = overloads[i];
      if ((overload != null ? overload.func : void 0) != null) {
        overload["function"] = overload.func;
      }
      if ((overload != null ? overload.args : void 0) == null) {
        throw new Error((i + 1) + " overload hasn't arguments");
      }
      if ((overload != null ? overload["function"] : void 0) == null) {
        throw new Error((i + 1) + " overload hasn't function");
      }

      /**
       * Найдена ли функция
       * @type {Boolean}
       */
      found = true;

      /**
       * @var {Type|String} firstart   - первый аргумент предполагаемый аргумент
       * @var {Arrar} overargs         - все аргумент являющиеся Type
       * @var {Type|String} lastarg    - последний аргумент предполагаемый аргумент
       */
      ref = overload.args, firstart = ref[0], lastarg = ref[ref.length - 1];
      if (lastarg === '...') {
        overargs = overload.args.slice(0, -1);
      } else {
        overargs = overload.args;
      }
      if ((overargs.length === arguments.length) || (arguments.length > 0 && lastarg === '...') || (arguments.length === 0 && firstart === '...')) {
        if (found) {
          for (i = k = 0, len1 = overargs.length; k < len1; i = ++k) {
            type = overargs[i];
            if (type.constructor === String && type.toLowerCase() === 'any') {
              break;
            } else if (arguments[i] && arguments[i].constructor !== type) {
              found = false;
              break;
            }
          }
        }
        if (found && ((overload != null ? overload.check : void 0) != null)) {
          ref1 = overload.check;
          for (i = l = 0, len2 = ref1.length; l < len2; i = ++l) {
            checkVal = ref1[i];
            if (checkVal instanceof RegExp) {
              if (!checkVal.test(arguments[i])) {
                found = false;
                break;
              }
            } else if (checkVal instanceof Function) {
              if (!checkVal(arguments[i])) {
                found = false;
                break;
              }
            } else {
              if (arguments[i] !== checkVal) {
                found = false;
                break;
              }
            }
          }
        }
      } else {
        found = false;
      }
      if (found) {
        func = overload["function"];
        break;
      }
    }
    if (func || error) {
      return func.apply(this, arguments);
    }
  };
};

module.exports = overlord;
