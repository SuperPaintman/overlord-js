var assert, overlord, say, sayError, sayNotDef, unitTest;

assert = require('assert');

overlord = require('./../overlord.js');

say = overlord([
  {
    args: [String],
    "function": function(name) {
      return "Hi, " + name;
    }
  }, {
    args: [String, Number],
    "function": function(name, meters) {
      return name + " ran " + meters + " meters";
    }
  }, {
    args: [Array],
    "function": function(names) {
      var i, j, len, name, namesStr;
      namesStr = '';
      for (i = j = 0, len = names.length; j < len; i = ++j) {
        name = names[i];
        if (i > 0 && i < names.length - 1) {
          namesStr += ', ';
        } else if (i === names.length - 1) {
          namesStr += ' and ';
        }
        namesStr += name;
      }
      return "Sat by the fire " + namesStr;
    }
  }, {
    args: ['any', 'any'],
    "function": function(var_1, var_2) {
      if (var_1 === var_2) {
        return "Equivalent";
      } else {
        return "Not equivalent";
      }
    }
  }, {
    args: [String, String, '...'],
    "function": function() {
      return "We got " + arguments.length + " arguments";
    }
  }, {
    args: [],
    "function": function() {
      return "No one variable";
    }
  }
], function() {
  return "Oops, custom call";
});

sayNotDef = overlord([
  {
    args: [String],
    "function": function(name) {
      return "Hi, " + name;
    }
  }, {
    args: [String, Number],
    "function": function(name, meters) {
      return name + " ran " + meters + " meters";
    }
  }, {
    args: [Array],
    "function": function(names) {
      var i, j, len, name, namesStr;
      namesStr = '';
      for (i = j = 0, len = names.length; j < len; i = ++j) {
        name = names[i];
        if (i > 0 && i < names.length - 1) {
          namesStr += ', ';
        } else if (i === names.length - 1) {
          namesStr += ' and ';
        }
        namesStr += name;
      }
      return "Sat by the fire " + namesStr;
    }
  }, {
    args: ['any', 'any'],
    "function": function(var_1, var_2) {
      if (var_1 === var_2) {
        return "Equivalent";
      } else {
        return "Not equivalent";
      }
    }
  }, {
    args: [String, String, '...'],
    "function": function() {
      return "We got " + arguments.length + " arguments";
    }
  }, {
    args: [],
    "function": function() {
      return "No one variable";
    }
  }
]);

sayError = overlord([
  {
    args: [String],
    "function": function(name) {
      return "Hi, " + name;
    }
  }, {
    args: [String, Number],
    "function": function(name, meters) {
      return name + " ran " + meters + " meters";
    }
  }, {
    args: [Array],
    "function": function(names) {
      var i, j, len, name, namesStr;
      namesStr = '';
      for (i = j = 0, len = names.length; j < len; i = ++j) {
        name = names[i];
        if (i > 0 && i < names.length - 1) {
          namesStr += ', ';
        } else if (i === names.length - 1) {
          namesStr += ' and ';
        }
        namesStr += name;
      }
      return "Sat by the fire " + namesStr;
    }
  }, {
    args: ['any', 'any'],
    "function": function(var_1, var_2) {
      if (var_1 === var_2) {
        return "Equivalent";
      } else {
        return "Not equivalent";
      }
    }
  }, {
    args: [String, String, '...'],
    "function": function() {
      return "We got " + arguments.length + " arguments";
    }
  }, {
    args: [],
    "function": function() {
      return "No one variable";
    }
  }
], null, true);

unitTest = function() {

  /**
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
   */
  return describe("overlord", function() {
    return it("executes overloaded function", function() {
      var e, error, error1;
      assert.equal(say('Sasha'), "Hi, Sasha");
      assert.equal(say('Sasha', 10), "Sasha ran 10 meters");
      assert.equal(say(['Sasha', 'Lesha', 'Artem']), "Sat by the fire Sasha, Lesha and Artem");
      assert.equal(say(5, 'five'), "Not equivalent");
      assert.equal(say(10, 10), "Equivalent");
      assert.equal(say('one', 'two', 'three', 'four'), "We got 4 arguments");
      assert.equal(say('one', 'two', 'three', 'four', 'five'), "We got 5 arguments");
      assert.equal(say(), "No one variable");
      assert.equal(say(1, [], false), "Oops, custom call");
      assert.equal(sayNotDef('Sasha'), "Hi, Sasha");
      assert.equal(sayNotDef('Sasha', 10), "Sasha ran 10 meters");
      assert.equal(sayNotDef(['Sasha', 'Lesha', 'Artem']), "Sat by the fire Sasha, Lesha and Artem");
      assert.equal(sayNotDef(5, 'five'), "Not equivalent");
      assert.equal(sayNotDef(10, 10), "Equivalent");
      assert.equal(sayNotDef('one', 'two', 'three', 'four'), "We got 4 arguments");
      assert.equal(sayNotDef('one', 'two', 'three', 'four', 'five'), "We got 5 arguments");
      assert.equal(sayNotDef(), "No one variable");
      assert.equal(sayNotDef(1, [], false), void 0);
      try {
        sayError(1, [], false);
        error = false;
      } catch (error1) {
        e = error1;
        error = e.message;
      }
      assert.equal(sayError('Sasha'), "Hi, Sasha");
      assert.equal(sayError('Sasha', 10), "Sasha ran 10 meters");
      assert.equal(sayError(['Sasha', 'Lesha', 'Artem']), "Sat by the fire Sasha, Lesha and Artem");
      assert.equal(sayError(5, 'five'), "Not equivalent");
      assert.equal(sayError(10, 10), "Equivalent");
      assert.equal(sayError('one', 'two', 'three', 'four'), "We got 4 arguments");
      assert.equal(sayError('one', 'two', 'three', 'four', 'five'), "We got 5 arguments");
      assert.equal(sayError(), "No one variable");
      return assert.equal(error, "Cannot read property 'apply' of undefined");
    });
  });
};

unitTest();
