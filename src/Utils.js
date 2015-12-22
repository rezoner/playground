/** Utility functions
 */
PLAYGROUND.Utils = {

  /** Merge any number of associative arrays into first.
   *
   * All arguments are expected to be associative arrays.
   * If same key appears multiple times the final value
   * will come from last argument that contains it.
   *
   * @returns first argument
   *
   * Examples:
   *
   *     PLAYGROUND.Utils.extend({a: 1});
   *     // simply returns {a: 1}
   *
   *     PLAYGROUND.Utils.extend({a: 1}, {b: 2});
   *     // returns {a: 1, b: 2}
   *
   *     PLAYGROUND.Utils.extend({a: 1}, {a: 2});
   *     // returns {a: 2}
   *
   * Common usage is to intialize an object with defaults and
   * optional user arguments in a call like:
   *
   *     PLAYGROUND.Utils.extend(this, this.defaults, args);
   */
  extend: function() {

    for (var i = 1; i < arguments.length; i++) {

      for (var j in arguments[i]) {

        arguments[0][j] = arguments[i][j];

      }

    }

    return arguments[0];

  },

  defaults: function() {

    for (var i = 1; i < arguments.length; i++) {

      for (var j in arguments[i]) {

        if (typeof arguments[0][j] === "undefined") arguments[0][j] = arguments[i][j];

      }

    }

    return arguments[0];

  },


  /** Merge any number of associative arrays into first.
   *
   * All arguments are expected to be associative arrays.
   * If same key appears multiple times the final value
   * will come from last argument that contains it.
   *
   * This function does the same thing as
   * `PLAYGROUND.Utils.extend` but it also dives in nested
   * objects.
   *
   * @returns first argument
   *
   * Examples:
   *
   *     PLAYGROUND.Utils.extend({a: {var_1: 1}}, {a: {var_1: 2}});
   *     // returns {a: {var_1: 2}}
   */
  merge: function(a) {

    for (var i = 1; i < arguments.length; i++) {

      var b = arguments[i];

      for (var key in b) {

        var value = b[key];

        if (typeof a[key] !== "undefined") {
          if (typeof a[key] === "object") this.merge(a[key], value);
          else a[key] = value;
        } else {
          a[key] = value;
        }
      }
    }
    return a;

  },

  /** Call a method for all objects in first argument.
   *
   * The function simply ignores objects that don't have
   * specified `methodName`.
   *
   * @param object an indexed array of objects
   * @param methodName the name of the method to call
   *
   * The rest of the arguments are passed to the invoked method.
   *
   * Examples:
   *
   *     PLAYGROUND.Utils.invoke([obj1, obj2, obj3], 'someMethod', 'arg1', 'arg2');
   */
  invoke: function(object, methodName) {

    var args = Array.prototype.slice.call(arguments, 2);

    for (var i = 0; i < object.length; i++) {
      var current = object[i];

      if (current[methodName]) current[methodName].apply(current, args);

    }

  },

  /** Ensures that the function argument is not called too often.
   *
   * On first invocation the `fn` argument is simply called and the
   * time is recorded. On subsequent invocations the method checks if
   * the time passed from last invocation is larger than the threshold
   * or not. If is larger the function is called, otherwise
   * a delayed call is added.
   *
   * @param fn function to call
   * @param threshold (default is 250) in milliseconds
   * @returns a function implementing the logic
   *
   * Example:
   *
   *     // ...
   *     mousemove: PLAYGROUND.Utils.throttle(function(e) {
   *       console.log(this.x, this.y);
   *     }, 16),
   *     // ...
   */
  throttle: function(fn, threshold) {
    threshold || (threshold = 250);
    var last,
      deferTimer;
    return function() {
      var context = this;

      var now = +new Date,
        args = arguments;
      if (last && now < last + threshold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function() {
          last = now;
          fn.apply(context, args);
        }, threshold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  },

  /** TBD
   */
  wrapTo: function(value, target, max, step) {
    if (value === target) return target;

    var result = value;

    var d = this.wrappedDistance(value, target, max);

    if (Math.abs(d) < step) return target;

    result += (d < 0 ? -1 : 1) * step;

    if (result > max) {
      result = result - max;
    } else if (result < 0) {
      result = max + result;
    }

    return result;
  },

  /** Bring the value between min and max.
   *
   * Values larger than `max` are wrapped back to `min`
   * and vice-versa.
   *
   * @param value value to process
   * @param min lowest valid value
   * @param max largest valid value
   * @return result
   */
  wrap: function(value, min, max) {

    if (value < min) return max + (value % max);
    if (value >= max) return value % max;
    return value;

  },

  /** Bring the value between 0 and 2*PI.
   *
   * Valid values for the length of a circle in radians is
   * 2*PI.
   *
   * @param val value to process
   * @return a value in 0..2*PI interval
   */
  circWrap: function(val) {

    return this.wrap(val, 0, Math.PI * 2);

  },


  /** Bring the value between 0 and 2*PI.
   *
   * Valid values for the length of a circle in radians is
   * 2*PI.
   *
   * @param val value to process
   * @return a value in 0..2*PI interval
   */
  circWrapTo: function(value, target, step) {

    return this.wrapTo(value, target, Math.PI * 2, step);

  },


  /** TBD
   */
  wrappedDistance: function(a, b, max) {

    if (a === b) return 0;
    else if (a < b) {
      var l = -a - max + b;
      var r = b - a;
    } else {
      var l = b - a;
      var r = max - a + b;
    }

    if (Math.abs(l) > Math.abs(r)) return r;
    else return l;

  },

  /** TBD
   */
  circWrappedDistance: function(a, b) {

    return this.wrappedDistance(a, b, Math.PI * 2)

  },

  /** Compute first multiple of threshold that is smaller or equal to num.
   *
   * Valid values for the length of a circle in radians is
   * 2*PI.
   *
   * @param num the number to adjust
   * @param threshold reference value
   * @return an even multiple of `threshold` smaller or equal to `num`
   */
  ground: function(num, threshold) {

    return (num / threshold | 0) * threshold;

  },

  /** TBD
   *  Alias to `circWrappedDistance`.
   */
  circDistance: function(a, b) {

    return this.circWrappedDistance(a, b)

  },

  distance: function(x1, y1, x2, y2) {

    if (arguments.length > 2) {

      var dx = x1 - x2;
      var dy = y1 - y2;

      return Math.sqrt(dx * dx + dy * dy);

    } else {

      var dx = x1.x - y1.x;
      var dy = x1.y - y1.y;

      return Math.sqrt(dx * dx + dy * dy);

    }

  }


};

PLAYGROUND.Utils.ease = ease;