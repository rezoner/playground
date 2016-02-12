PLAYGROUND.Utils = {

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

  /* deep extend */

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

  invoke: function(object, methodName) {

    var args = Array.prototype.slice.call(arguments, 2);

    for (var i = 0; i < object.length; i++) {
      var current = object[i];

      if (current[methodName]) current[methodName].apply(current, args);

    }

  },

  throttle: function(fn, threshold) {

    threshold || (threshold = 250);
    var last,
      deferTimer;
    return function() {
      var context = this;
      var args = [];

      for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);

      var now = Date.now();

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

  },

  sprintf: function(string, replace) {

    for (var key in replace) {

      var find = new RegExp("{" + key + "}", "g");

      string = string.replace(find, replace[key]);

    }

    return string;

  }


};

PLAYGROUND.Utils.ease = ease;