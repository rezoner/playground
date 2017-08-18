

/* file: license.txt */

/*     

  PlaygroundJS r12
  
  http://playgroundjs.com
  
  (c) 2012-2016 http://rezoner.net
  
  Playground may be freely distributed under the MIT license.

  latest major changes:

  r12

  + fixed font loader and antialias
  + updated canvasquery

  r11

  + sound panning
  
  r10

  + tween.call
  + pointer now takes care of cursor that left the window
  + this.keyboard.any (is any key pressed)

  r9

  + json data cascade
  + tween step event

  r8

  + fixed Transitions for CommonJS
  + images expand into hierarchy

  r7

  + fixed event.off
  + temporary fixes for gamepad d-pad

  r6

  + custom transitions
  + fixes for gamepad
  + updated CanvasQuery
  
  r5

  + game loop split into render and step - check profiler
  + fixed loader last item
  + fixed some flow issues
  + imageready event
  + loadFont
  + gamepad stick issue
  + pointerwheel event
  + updated CanvasQuery
  - removed video recorder  

  r4

  + tweens with events
  + context argument for events

  r3

  + pointer = mouse + touch

*/

/* file: src/lib/Ease.js */

/*     

  Ease 1.1
  
  http://canvasquery.com
  
  (c) 2015 by Rezoner - http://rezoner.net

  `ease` may be freely distributed under the MIT license.
     
  Cubic-spline interpolation by Ivan Kuckir

  http://blog.ivank.net/interpolation-with-cubic-splines.html

  With slight modifications by Morgan Herlocker

  https://github.com/morganherlocker/cubic-spline

*/

(function() {

  var ease = function(progress, easing) {

    if (typeof ease.cache[easing] === "function") {

      return ease.cache[easing](progress);

    } else {

      return ease.spline(progress, easing || ease.defaultEasing);

    }

  };

  var extend = function() {
    for (var i = 1; i < arguments.length; i++) {
      for (var j in arguments[i]) {
        arguments[0][j] = arguments[i][j];
      }
    }

    return arguments[0];
  };

  extend(ease, {

    defaultEasing: "016",

    cache: {

      linear: function(t) {
        return t
      },

      inQuad: function(t) {
        return t * t
      },
      outQuad: function(t) {
        return t * (2 - t)
      },
      inOutQuad: function(t) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      },
      inCubic: function(t) {
        return t * t * t
      },
      outCubic: function(t) {
        return (--t) * t * t + 1
      },
      inOutCubic: function(t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      },
      inQuart: function(t) {
        return t * t * t * t
      },
      outQuart: function(t) {
        return 1 - (--t) * t * t * t
      },
      inOutQuart: function(t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
      },
      inQuint: function(t) {
        return t * t * t * t * t
      },
      outQuint: function(t) {
        return 1 + (--t) * t * t * t * t
      },
      inOutQuint: function(t) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
      },
      inSine: function(t) {
        return -1 * Math.cos(t / 1 * (Math.PI * 0.5)) + 1;
      },
      outSine: function(t) {
        return Math.sin(t / 1 * (Math.PI * 0.5));
      },
      inOutSine: function(t) {
        return -1 / 2 * (Math.cos(Math.PI * t) - 1);
      },
      inExpo: function(t) {
        return (t == 0) ? 0 : Math.pow(2, 10 * (t - 1));
      },
      outExpo: function(t) {
        return (t == 1) ? 1 : (-Math.pow(2, -10 * t) + 1);
      },
      inOutExpo: function(t) {
        if (t == 0) return 0;
        if (t == 1) return 1;
        if ((t /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (t - 1));
        return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
      },
      inCirc: function(t) {
        return -1 * (Math.sqrt(1 - t * t) - 1);
      },
      outCirc: function(t) {
        return Math.sqrt(1 - (t = t - 1) * t);
      },
      inOutCirc: function(t) {
        if ((t /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
        return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
      },
      inElastic: function(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t == 0) return 0;
        if (t == 1) return 1;
        if (!p) p = 0.3;
        if (a < 1) {
          a = 1;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
      },
      outElastic: function(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t == 0) return 0;
        if (t == 1) return 1;
        if (!p) p = 0.3;
        if (a < 1) {
          a = 1;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
      },
      inOutElastic: function(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t == 0) return 0;
        if ((t /= 1 / 2) == 2) return 1;
        if (!p) p = (0.3 * 1.5);
        if (a < 1) {
          a = 1;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
      },
      inBack: function(t, s) {
        if (s == undefined) s = 1.70158;
        return 1 * t * t * ((s + 1) * t - s);
      },
      outBack: function(t, s) {
        if (s == undefined) s = 1.70158;
        return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
      },
      inOutBack: function(t, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= 1 / 2) < 1) return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
        return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
      },
      inBounce: function(t) {
        return 1 - this.outBounce(1 - t);
      },
      outBounce: function(t) {
        if ((t /= 1) < (1 / 2.75)) {
          return (7.5625 * t * t);
        } else if (t < (2 / 2.75)) {
          return (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
        } else if (t < (2.5 / 2.75)) {
          return (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
        } else {
          return (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
        }
      },
      inOutBounce: function(t) {
        if (t < 1 / 2) return this.inBounce(t * 2) * 0.5;
        return this.outBounce(t * 2 - 1) * 0.5 + 0.5;
      }
    },

    translateEasing: function(key) {

      if (!this.cache[key]) {
        var array = key.split('');

        var sign = 1;
        var signed = false;
        var trimming = false;

        for (var i = 0; i < array.length; i++) {

          var char = array[i];

          if (char === "-") {
            sign = -1;
            signed = true;
            array.splice(i--, 1);
          } else if (char === "+") {
            sign = 1;
            array.splice(i--, 1);
          } else if (char === "t") {
            trimming = !trimming;
            array.splice(i--, 1);
          } else array[i] = parseInt(array[i], 16) * sign;

        }

        var min = Math.min.apply(null, array);
        var max = Math.max.apply(null, array);
        var diff = max - min;
        var cache = [];
        var normalized = [];

        for (var i = 0; i < array.length; i++) {

          if (signed) {

            var diff = Math.max(Math.abs(min), Math.abs(max))
            var value = array[i] / diff;

          } else {

            var diff = max - min;
            var value = (array[i] - min) / diff;

          }

          if (trimming) {

            if (value < 0) value = 0;
            if (value > 1.0) value = 1.0;

          }

          normalized.push(value);

        }

        this.cache[key] = normalized;

      }

      return this.cache[key]

    },

    splineK: {},
    splineX: {},
    splineY: {},

    insertIntermediateValues: function(a) {
      var result = [];
      for (var i = 0; i < a.length; i++) {
        result.push(a[i]);

        if (i < a.length - 1) result.push(a[i + 1] + (a[i] - a[i + 1]) * 0.6);
      }

      return result;
    },

    spline: function(x, key) {

      if (!this.splineK[key]) {

        var xs = [];
        var ys = this.translateEasing(key);

        // ys = this.insertIntermediateValues(ys);

        if (!ys.length) return 0;

        for (var i = 0; i < ys.length; i++) xs.push(i * (1 / (ys.length - 1)));

        var ks = xs.map(function() {
          return 0
        });

        ks = this.getNaturalKs(xs, ys, ks);

        this.splineX[key] = xs;
        this.splineY[key] = ys;
        this.splineK[key] = ks;

      }

      if (x > 1) return this.splineY[key][this.splineY[key].length - 1];

      var ks = this.splineK[key];
      var xs = this.splineX[key];
      var ys = this.splineY[key];

      var i = 1;

      while (xs[i] < x) i++;

      var t = (x - xs[i - 1]) / (xs[i] - xs[i - 1]);
      var a = ks[i - 1] * (xs[i] - xs[i - 1]) - (ys[i] - ys[i - 1]);
      var b = -ks[i] * (xs[i] - xs[i - 1]) + (ys[i] - ys[i - 1]);
      var q = (1 - t) * ys[i - 1] + t * ys[i] + t * (1 - t) * (a * (1 - t) + b * t);

      /*
      var py = ys[i - 2];
      var cy = ys[i - 1];
      var ny = (i < ys.length - 1) ? ys[i] : ys[i - 1];

      if (q > ny) {
        var diff = (q - py);
        //q = py + diff;

      }

    if (cy === ny && cy === py) q = py;
    */


      return q;
    },

    getNaturalKs: function(xs, ys, ks) {
      var n = xs.length - 1;
      var A = this.zerosMat(n + 1, n + 2);

      for (var i = 1; i < n; i++) // rows
      {
        A[i][i - 1] = 1 / (xs[i] - xs[i - 1]);
        A[i][i] = 2 * (1 / (xs[i] - xs[i - 1]) + 1 / (xs[i + 1] - xs[i]));
        A[i][i + 1] = 1 / (xs[i + 1] - xs[i]);
        A[i][n + 1] = 3 * ((ys[i] - ys[i - 1]) / ((xs[i] - xs[i - 1]) * (xs[i] - xs[i - 1])) + (ys[i + 1] - ys[i]) / ((xs[i + 1] - xs[i]) * (xs[i + 1] - xs[i])));
      }

      A[0][0] = 2 / (xs[1] - xs[0]);
      A[0][1] = 1 / (xs[1] - xs[0]);
      A[0][n + 1] = 3 * (ys[1] - ys[0]) / ((xs[1] - xs[0]) * (xs[1] - xs[0]));

      A[n][n - 1] = 1 / (xs[n] - xs[n - 1]);
      A[n][n] = 2 / (xs[n] - xs[n - 1]);
      A[n][n + 1] = 3 * (ys[n] - ys[n - 1]) / ((xs[n] - xs[n - 1]) * (xs[n] - xs[n - 1]));

      return this.solve(A, ks);
    },

    solve: function(A, ks) {
      var m = A.length;
      for (var k = 0; k < m; k++) // column
      {
        // pivot for column
        var i_max = 0;
        var vali = Number.NEGATIVE_INFINITY;
        for (var i = k; i < m; i++)
          if (A[i][k] > vali) {
            i_max = i;
            vali = A[i][k];
          }
        this.splineSwapRows(A, k, i_max);

        // for all rows below pivot
        for (var i = k + 1; i < m; i++) {
          for (var j = k + 1; j < m + 1; j++)
            A[i][j] = A[i][j] - A[k][j] * (A[i][k] / A[k][k]);
          A[i][k] = 0;
        }
      }
      for (var i = m - 1; i >= 0; i--) // rows = columns
      {
        var v = A[i][m] / A[i][i];
        ks[i] = v;
        for (var j = i - 1; j >= 0; j--) // rows
        {
          A[j][m] -= A[j][i] * v;
          A[j][i] = 0;
        }
      }
      return ks;
    },

    zerosMat: function(r, c) {
      var A = [];
      for (var i = 0; i < r; i++) {
        A.push([]);
        for (var j = 0; j < c; j++) A[i].push(0);
      }
      return A;
    },

    splineSwapRows: function(m, k, l) {
      var p = m[k];
      m[k] = m[l];
      m[l] = p;
    }
  });

  window.ease = ease;

})();

/* file: src/Playground.js */

window.PLAYGROUND = {};

PLAYGROUND.MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function playground(args) {

  return new PLAYGROUND.Application(args);

};

PLAYGROUND.data = {};
PLAYGROUND.images = {};
PLAYGROUND.atlases = {};

/* file: src/Utils.js */

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

  throttle: function(fn, delay) {

    var timeout;
    var last = 0;

    return function() {

      var args = [];

      for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);

      var context = this;

      if (Date.now() - last > delay) {

        last = Date.now();

        fn.apply(context, args);

        clearTimeout(timeout);

      } else {

        clearTimeout(timeout);

        timeout = setTimeout(function() {

          fn.apply(context, args);

          last = Date.now();

        }, Date.now() - last);

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

  },

  classInParents: function(element, className) {

    var parent = element;

    while (parent) {

      if (parent.classList.contains(className)) {

        return true;

      }

      parent = parent.parentElement;

    }

    return false;

  }


};

PLAYGROUND.Utils.ease = ease;

/* file: src/Events.js */

/** Base class for objects emmiting events.
 *
 * An associative array for listners is maintained internally.
 * The keys are the names of the event while the values are
 * lists of listners objects with three properties:
 * - once: is this a one time event or a recurring one
 * - callback: function to call
 * - context: the value for *this* inside *callback*.
 *
 * A special event is called `event`. The listners for
 * this event will receive all broadcasted events
 * with three arguments: `context`, `event name`, `data`.
 * Callbacks for other events are simply called with
 * `context` and `data`.
 */

PLAYGROUND.Events = function() {

  this.listeners = {};

};

PLAYGROUND.Events.prototype = {

  /** Add a listner for an event.
   *
   * @param event name of the event or an associative array
   *              where keys are event names and values are
   *              callbacks to use
   * @param callback the function to call for this listner; if
   *                 *event* is an object this parameter is ignored
   * @param context *this* when calling the callback(s)
   *
   * @returns the listner object
   */

  on: function(event, callback, context) {

    if (typeof event === "object") {
      var result = {};
      for (var key in event) {
        result[key] = this.on(key, event[key], context)
      }
      return result;
    }

    if (!this.listeners[event]) this.listeners[event] = [];

    var listener = {
      once: false,
      callback: callback,
      context: context
    };

    this.listeners[event].push(listener);

    return listener;
  },

  /** Add a listner for an event.
   *
   * @param event name of the event or an associative array
   *              where keys are event names and values are
   *              callbacks to use
   * @param callback the function to call for this listner; if
   *                 *event* is an object this parameter is ignored
   * @param context *this* when calling the callback(s)
   *
   * @returns the listner object
   */

  once: function(event, callback, context) {

    if (typeof event === "object") {
      var result = {};
      for (var key in event) {
        result[key] = this.once(key, event[key], context)
      }
      return result;
    }

    if (!this.listeners[event]) this.listeners[event] = [];

    var listener = {
      once: true,
      callback: callback,
      context: context
    };

    this.listeners[event].push(listener);

    return listener;
  },

  /** Remove an event listner from an event.
   *
   * The function will remove all occurences that use that particular
   * callback (will be a single instance in well behaved applications).
   *
   * @param event the name of the event
   * @param callback identifying the listner
   */

  off: function(event, callback) {

    for (var i = 0, len = this.listeners[event].length; i < len; i++) {

      if (this.listeners[event][i] === callback) {
      
        this.listeners[event].splice(i--, 1);
        len--;
      
      }

    }

  },

  /** Raise an event.
   *
   *  If the listner is only to be raised once this function
   * removes it from the list of listners.
   *
   * @param event the name of the event being raised
   * @param data array of arguments for the callbacks
   *
   */

  trigger: function(event, data) {

    /* if you prefer events pipe */

    if (this.listeners["event"]) {

      for (var i = 0, len = this.listeners["event"].length; i < len; i++) {

        var listener = this.listeners["event"][i];

        listener.callback.call(listener.context || this, event, data);

      }

    }

    /* or subscribed to a single event */

    if (this.listeners[event]) {
      
      for (var i = 0, len = this.listeners[event].length; i < len; i++) {

        var listener = this.listeners[event][i];

        listener.callback.call(listener.context || this, data);

        if (listener.once) {
          this.listeners[event].splice(i--, 1);
          len--;
        } 

      }
      
    }

  }

};

/* file: src/States.js */

/** Manages the states the application can be in.
 *
 * A state can be an object or a function that
 * creates the object. Current state is in `current`.
 *
 * Properties of a state:
 * - __created: is managed by `step` function;
 *   if not found the state is set up and `create()`
 *   method of the state is called.
 * - locked: if current state has this set to `true`
 *   current state can't be changed
 * - app: the main application object
 * - create: if this function exists it is called
 *   the first time a state is encountered
 * - enter: if this function exists it is called
 *   when the state becomes current
 * - leave: if this function exists it is called
 *   when the state is no longer the current one
 *
 * Events generated by this object:
 * - createstate: first time an state is encountered
 * - enterstate: a state is entered
 * - leavestate: a state is no longer current
 *
 * Reference: http://playgroundjs.com/playground-states
 */

PLAYGROUND.States = function(app) {

  this.app = app;

  PLAYGROUND.Events.call(this);

  app.on("step", this.step.bind(this));

};

PLAYGROUND.States.prototype = {

  /** Called each frame to update logic. */

  step: function(delta) {

    if (!this.next) return;

    if (this.current && this.current.locked) return;

    var state = this.next;

    if(typeof state === "function") state = new state;

    /* create state if object has never been used as a state before */

    if (!state.__created) {

      state.__created = true;

      state.app = this.app;

      this.trigger("createstate", {
        state: state
      });

      if (state.create) state.create();

    }

    /* enter new state */

    if (this.current) {
      this.trigger("leavestate", {
        prev: this.current,
        next: state,
        state: this.current
      });
    }

    this.trigger("enterstate", {
      prev: this.current,
      next: state,
      state: state
    });

    this.current = state;

    if (this.current && this.current.enter) {
      this.current.enter();
    }

    this.app.state = this.current;

    this.next = false;


  },

  /** Used by application to set the state.
   *
   * Don't call this function directly. Instead, use
   * `PLAYGROUND.Application.setState()`.
   */
   
  set: function(state) {

    if (this.current && this.current.leave) this.current.leave();

    this.next = state;

    this.step(0);

  }


};

PLAYGROUND.Utils.extend(PLAYGROUND.States.prototype, PLAYGROUND.Events.prototype);

/* file: src/Application.js */

PLAYGROUND.Application = function(args) {

  var app = this;

  this.killed = false;

  this.dataSource = {};

  /* events */

  PLAYGROUND.Events.call(this);

  /* defaults */

  PLAYGROUND.Utils.merge(this, this.defaults, args);

  /* guess scaling mode */

  this.autoWidth = this.width ? false : true;
  this.autoHeight = this.height ? false : true;
  this.autoScale = this.scale ? false : true;

  /* get container */

  if (!this.container) this.container = document.body;

  if (this.container !== document.body) this.customContainer = true;

  if (typeof this.container === "string") this.container = document.querySelector(this.container);

  if (args.background !== false) this.container.style.background = this.background;

  this.updateSize();

  /* events */

  // this.emitLocalEvent = this.emitLocalEvent.bind(this);
  // this.emitGlobalEvent = this.emitGlobalEvent.bind(this);

  /* states manager */

  this.states = new PLAYGROUND.States(this);
  this.states.on("event", this.emitLocalEvent, this);

  /* mouse */

  this.mouse = new PLAYGROUND.Mouse(this, this.container);
  this.mouse.on("event", this.emitGlobalEvent, this);

  /* touch */

  this.touch = new PLAYGROUND.Touch(this, this.container);
  this.touch.on("event", this.emitGlobalEvent, this);

  /* keyboard */

  this.keyboard = new PLAYGROUND.Keyboard(this);
  this.keyboard.on("event", this.emitGlobalEvent, this);

  /* gamepads */

  this.gamepads = new PLAYGROUND.Gamepads(this);
  this.gamepads.on("event", this.emitGlobalEvent, this);

  /* tweens */

  this.tweens = new PLAYGROUND.TweenManager(this);

  /* ease */

  this.ease = PLAYGROUND.Utils.ease;

  /* local storage event */

  window.addEventListener("storage", this.handleLocalStorage.bind(this));

  /* video recorder */

  // this.videoRecorder = new PLAYGROUND.VideoRecorder(this);

  /* sound */

  PLAYGROUND.Sound(this);

  /* visibility API */

  document.addEventListener("visibilitychange", function() {

    app.handleVisibilityChange(document.hidden);

  });

  window.addEventListener("blur", this.handleBlur.bind(this));
  window.addEventListener("focus", this.handleFocus.bind(this));

  /* window resize */

  this.resizelistener = PLAYGROUND.Utils.throttle(this.handleResize.bind(this), 100);

  window.addEventListener("resize", this.resizelistener);

  /* assets containers */

  this.images = PLAYGROUND.images;
  this.atlases = PLAYGROUND.atlases;
  this.data = PLAYGROUND.data;

  this.loader = new PLAYGROUND.Loader(this);

  this.loadFoo(0.25);

  /* create plugins in the same way */

  this.plugins = [];

  for (var key in PLAYGROUND) {

    var property = PLAYGROUND[key];

    if (property.plugin) this.plugins.push(new property(this));

  }

  /* flow */

  this.emitLocalEvent("preload");

  this.firstBatch = true;

  if (this.disabledUntilLoaded) this.skipEvents = true;

  function onPreloadEnd() {

    app.loadFoo(0.25);

    /* run everything in the next frame */

    setTimeout(function() {

      app.emitLocalEvent("create");

      app.setState(PLAYGROUND.DefaultState);
      app.handleResize();

      if (PLAYGROUND.LoadingScreen) app.setState(PLAYGROUND.LoadingScreen);

      /* game loop */

      PLAYGROUND.GameLoop(app);

      /* stage proper loading step */

      app.loader.once("ready", function() {

        app.firstBatch = false;

        if (app.disabledUntilLoaded) app.skipEvents = false;

        app.setState(PLAYGROUND.DefaultState);

        app.emitLocalEvent("ready");
        app.handleResize();

      });

    });

  };

  this.loader.once("ready", onPreloadEnd);

};

PLAYGROUND.Application.prototype = {

  defaults: {
    background: "#272822",
    smoothing: 1,
    paths: {
      base: "",
      images: "images/",
      fonts: "fonts/",
      rewrite: {},
      rewriteURL: {}
    },
    offsetX: 0,
    offsetY: 0,
    skipEvents: false,
    disabledUntilLoaded: true,
    mouseThrottling: 15
  },

  /**
      Change active state.
      Simply forwarded to PLAYGROUND.States.  

  */

  setState: function(state) {

    this.states.set(state);

  },

  /**

    Expand string "path/to/something" into objects path.to.something
    and insert the asset in the end

  */

  insertAsset: function(asset, collection, path) {

    var pathArray = path.split("/");

    var current = collection;

    for (var i = 0; i < pathArray.length - 1; i++) {

      var segment = pathArray[i];

      if (!current[segment]) current[segment] = {};

      current = current[segment];

    }

    current[pathArray.pop()] = asset;

    collection[path] = asset;

  },

  /* Compute a fully qualified path.
   *
   * `paths.base` is always prepended to the result.
   *
   * @param to a key in `paths` or a string (without ending `/`).
   */

  getPath: function(to) {

    return this.paths.base + (this.paths[to] || (to + "/"));

  },

  /** Create a standardised representation for an asset.
   *
   * The result contains:
   *   - key: a unique string that identifies this resource
   *   - url: full path for this asset
   *   - path: the directory where the asset resides
   *   - ext: the extension for the file (without a leading dot)
   *
   * @returns a dictionary with standardised information
   */

  rewriteURL: function(url) {

    return this.paths.rewriteURL[url] || url;

  },

  getAssetEntry: function(path, folder, defaultExtension) {

    /* translate folder according to user provided paths
       or leave it as is */

    var key;
    var url;
    var absolute = false;

    if (path[0] === "<") {

      absolute = true;

      var abslimit = path.indexOf(">");

      url = path.substr(1, abslimit - 1);
      key = path.substr(abslimit + 1).trim();
      path = url;

      url = this.rewriteURL(url);

    }

    var folder = this.paths[folder] || (folder + "/");

    var fileinfo = path.match(/(.*)\..*/);

    if (!key) key = fileinfo ? fileinfo[1] : path;

    var temp = path.split(".");
    var basename = path;

    if (temp.length > 1) {

      var ext = temp.pop();
      path = temp.join(".");

    } else {

      var ext = defaultExtension;
      basename += "." + defaultExtension;

    }

    if (!url) url = this.rewriteURL(this.paths.base + folder + basename);

    /*
      key: key to store
      url: url to load
      path: url without extension.. pretty much useless?
      ext: extension
    */

    return {
      key: key,
      url: url,
      path: this.paths.base + folder + path,
      ext: ext
    };

  },

  /** Emits events that shouldn't flow down to the state. */

  emitLocalEvent: function(event, data) {

    this.trigger(event, data);

    if ((event !== "render" || !this.skipEvents || this.loader.ready) && this[event]) this[event](data);

  },

  /** Emits events that should be passed to the state. */

  emitGlobalEvent: function(event, data) {

    if (!this.state) return this.emitLocalEvent(event, data);

    this.trigger(event, data);

    if ((event !== "render" || !this.skipEvents || this.loader.ready) && this.event) this.event(event, data);

    if ((event !== "render" || !this.skipEvents || this.loader.ready) && this[event]) this[event](data);

    if (this.state.event) this.state.event(event, data);

    if (this.state[event]) this.state[event](data);

    this.trigger("after" + event, data);

    // if (this.state.proxy) this.state.proxy(event, data);

  },

  /** Responds to a resize event by updating some internal variables.
   *
   * `offsetX`, `offsetY` and `center` are always updated.
   * `width`, `height` and `scale` may also be updated.
   */

  updateSize: function() {

    if (this.customContainer) {

      var containerWidth = this.container.offsetWidth;
      var containerHeight = this.container.offsetHeight;

    } else {

      var containerWidth = window.innerWidth;
      var containerHeight = window.innerHeight;

    }

    if (!this.autoScale && !this.autoWidth && !this.autoHeight) {

    } else if (!this.autoHeight && this.autoWidth) {

      if (this.autoScale) this.scale = containerHeight / this.height;

      this.width = Math.ceil(containerWidth / this.scale);

    } else if (!this.autoWidth && this.autoHeight) {

      if (this.autoScale) this.scale = containerWidth / this.width;

      this.height = Math.ceil(containerHeight / this.scale);

    } else if (this.autoWidth && this.autoHeight && this.autoScale) {

      this.scale = 1;
      this.width = containerWidth;
      this.height = containerHeight;

    } else if (this.autoWidth && this.autoHeight) {

      this.width = Math.ceil(containerWidth / this.scale);
      this.height = Math.ceil(containerHeight / this.scale);

    } else {

      this.scale = Math.min(containerWidth / this.width, containerHeight / this.height);

    }

    this.offsetX = (containerWidth - this.width * this.scale) / 2 | 0;
    this.offsetY = (containerHeight - this.height * this.scale) / 2 | 0;

    this.center = {
      x: this.width / 2 | 0,
      y: this.height / 2 | 0
    };


  },

  handleLocalStorage(e) {

    this.emitGlobalEvent("localstorage", e);

  },

  handleVisibilityChange: function(e) {

    this.emitGlobalEvent("visibilitychange", {
      visible: !e.hidden,
      hidden: e.hidden
    });

  },

  handleBlur: function(e) {

    this.emitGlobalEvent("blur", {});

  },

  handleFocus: function(e) {

    this.emitGlobalEvent("focus", {});

  },

  /** Responds to windows resize event. */

  handleResize: function() {

    this.updateSize();

    this.emitGlobalEvent("beforeresize", {});

    this.mouse.handleResize();
    this.touch.handleResize();

    this.emitGlobalEvent("resize", {});

  },

  /** Request a file over http.
   *
   * It shall be later an abstraction using 'fs' in node-webkit
   *
   * @returns a promise
   */

  request: function(url) {

    var app = this;

    function promise(resolve, reject) {

      var baseurl = url.split("?")[0];

      if (app.dataSource[baseurl]) {

        return resolve({
          responseText: app.dataSource[baseurl]
        });

      }

      var request = new XMLHttpRequest();

      request.open("GET", url, true);

      request.onload = function(event) {

        var xhr = event.target;

        if (xhr.status !== 200 && xhr.status !== 0) {

          return reject(new Error("Failed to get " + url));

        }

        resolve(xhr);

      }

      request.send();

    }

    return new Promise(promise);

  },

  /** Imaginary timeout to delay loading. */

  loadFoo: function(timeout) {

    var loader = this.loader;

    this.loader.add("foo " + timeout);

    setTimeout(function() {

      loader.success("foo " + timeout);

    }, timeout * 1000);


  },

  /** Loads assets as data/json or text.
   *
   * The list may be nested.
   */
  loadData: function() {

    for (var i = 0; i < arguments.length; i++) {

      var arg = arguments[i];

      if (typeof arg === "object") {

        for (var key in arg) this.loadData(arg[key]);

      } else {

        this.loadDataItem(arg);

      }

    }

  },

  /** Loads one asset as data/json or text (internal). */

  loadDataItem: function(name) {

    var entry = this.getAssetEntry(name, "data", "json");

    var app = this;

    this.loader.add();

    this.request(entry.url + (this.purgeCache ? ("?" + Date.now()) : "")).then(processData);

    function processData(request) {

      // entry.ext === "json" && entry.key.indexOf("/") > -1;

      if (entry.ext === "json") {

        try {

          var data = JSON.parse(request.responseText);

        } catch (e) {

          console.error("JSON file corrupt " + name);

          return;

        }

        app.insertAsset(data, app.data, entry.key);

      } else {

        app.insertAsset(request.responseText, app.data, entry.key);

      }

      app.loader.success(entry.url);

    }

  },

  loadImage: function() {

    return this.loadImages.apply(this, arguments);

  },

  /*

    Loads images.
   
    The list may be nested.

  */

  loadImages: function() {

    var promises = [];

    for (var i = 0; i < arguments.length; i++) {

      var arg = arguments[i];

      /* polymorphism at its finest */

      if (typeof arg === "object") {

        for (var key in arg) promises = promises.concat(this.loadImages(arg[key]));

      } else {

        promises.push(this.loadOneImage(arg));

      }

    }

    return Promise.all(promises);

  },


  /** Loads a single image (internal). */

  loadOneImage: function(name) {

    var app = this;

    if (!this._imageLoaders) this._imageLoaders = {};

    if (!this._imageLoaders[name]) {

      var promise = function(resolve, reject) {

        /* if argument is not an object/array let's try to load it */

        var loader = app.loader;

        var entry = app.getAssetEntry(name, "images", "png");

        app.loader.add(entry.url);

        var image = new Image;

        image.addEventListener("load", function() {

          app.images[entry.key] = image;

          resolve(image);
          loader.success(entry.url);

          entry.image = image;

          app.insertAsset(image, app.images, entry.key);

          app.emitLocalEvent("imageready", entry);

        });

        image.addEventListener("error", function() {

          reject("can't load " + entry.url);
          loader.error(entry.url);

        });

        image.src = entry.url;

      };

      app._imageLoaders[name] = new Promise(promise);

    }

    return this._imageLoaders[name];

  },

  /* 
    Load a single font.
   
    At this point it doesn't really load font
    it just ensures the font has been loaded (use css font-face)

  */

  loadFont: function() {

    var promises = [];

    for (var i = 0; i < arguments.length; i++) {

      var arg = arguments[i];

      promises.push(this.loadFontItem(arg));

    }

    return Promise.all(promises);

  },

  loadFonts: function() {

    return this.loadFont.apply(this, arguments);

  },

  /* 

    Load a single font (internal).  
    It actually doesn't load any font - just ensures it has been loaded (with css)

  */

  loadFontItem: function(name) {

    /* insert font into a stylesheet */

    if (!this.fontStyleSheet) {

      var style = document.createElement("style");

      document.head.appendChild(style);

      this.fontStyleSheet = style;

    }

    var entry = this.getAssetEntry(name, "fonts", "ttf");

    var format = {
      woff: "woff",
      otf: "opentype",
      ttf: "truetype"
    }[entry.ext];

    var raw = "@font-face { font-family: '{name}'; font-style: 'normal'; font-weight: 400, 800; src: url(fonts/{name}.{ext}) format('{format}'); }";

    var rule = PLAYGROUND.Utils.sprintf(raw, {
      name: name,
      ext: entry.ext,
      format: format
    });

    this.fontStyleSheet.innerHTML += rule;

    /* wait until font has been loaded */

    var app = this;

    if (!this._fontPromises) this._fontPromises = {};

    if (!this._fontPromises[name]) {

      var promise = function(resolve, reject) {

        app.loader.add("font " + name);

        var checkingTimer = setInterval(function() {

          var base = cq(100, 32).font("14px somethingrandom").fillStyle("#fff").textBaseline("top");
          base.context.fillText("lorem ipsum dolores sit", 0, 4);

          var test = cq(100, 32).font("14px '" + name + "'").fillStyle("#fff").textBaseline("top");
          test.context.fillText("lorem ipsum dolores sit", 0, 4);

          if (!cq.compare(base, test)) {

            app.loader.success("font" + name);

            clearInterval(checkingTimer);

            resolve();

          }

        }, 100);

      }

      this._fontPromises[name] = new Promise(promise);

    }

    return this._fontPromises[name];

  },

  render: function() {},

  enableInputs: function() {

    this.mouse.enabled = true;
    this.touch.enabled = true;
    this.keyboard.enabled = true;

  },

  disableInputs: function() {

    this.mouse.enabled = false;
    this.touch.enabled = false;
    this.keyboard.enabled = false;

  },

  kill: function() {

    this.killed = true;

    this.trigger("kill");

    window.removeEventListener("resize", this.resizelistener);

  }



};

PLAYGROUND.Utils.extend(PLAYGROUND.Application.prototype, PLAYGROUND.Events.prototype);

/* file: src/GameLoop.js */

PLAYGROUND.GameLoop = function(app) {

  app.lifetime = 0;
  app.ops = 0;
  app.opcost = 0;

  var lastTick = Date.now();
  var frame = 0;

  function render(dt) {

    app.emitGlobalEvent("prerender", dt)
    app.emitGlobalEvent("render", dt)
    app.emitGlobalEvent("postrender", dt)

  };

  function step(dt) {

    app.emitGlobalEvent("step", dt)

  };

  function gameLoop() {

    if (app.killed) return;

    requestAnimationFrame(gameLoop);

    if (app.frameskip) {
      frame++;
      if (frame === app.frameskip) {
        frame = 0;
      } else return;
    }

    var delta = Date.now() - lastTick;

    lastTick = Date.now();

    if (delta > 1000) return;

    var dt = delta / 1000;

    app.lifetime += dt;
    app.elapsed = dt;

    // app.emitLocalEvent("framestart", dt);

    step(dt);

    // app.emitLocalEvent("framemid", dt);

    render(dt);

    // app.emitLocalEvent("frameend", dt);

    app.opcost = delta / 1000;
    app.ops = 1000 / app.opcost;

  };

  requestAnimationFrame(gameLoop);

};

/* file: src/Gamepads.js */

/* THIS HAS TO BE REWRITEN! */
/* add method .getGamepad() */
/* hold gamepad state in this[0], [1] and so on */
/* (dpad) buttons 12-14 are currently overwriten - check step method */

/** Gamepads related functionality.
 *
 * The object also works as an array of gamepads, thus
 * PLAYGROUND.Gamepads[0] is the first one.
 *
 * Properties:
 * - app: the main application object
 * - buttons: maps numeric ids to button names
 * - gamepads:
 * - gamepadmoveEvent: cached event
 * - gamepaddownEvent: cached event
 * - gamepadupEvent: cached event
 *
 * Events generated by this object:
 * - gamepadmove: change in position
 * - gamepaddown:
 * - gamepadup:
 *
 * Reference: http://playgroundjs.com/playground-gamepads
 */

PLAYGROUND.Gamepads = function(app) {

  this.app = app;

  PLAYGROUND.Events.call(this);

  this.getGamepads = navigator.getGamepads || navigator.webkitGetGamepads;

  this.gamepadmoveEvent = {};
  this.gamepaddownEvent = {};
  this.gamepadupEvent = {};
  this.gamepadholdEvent = {};

  this.gamepads = {};

  this.app.on("step", this.step.bind(this));

};

PLAYGROUND.Gamepads.prototype = {

  buttons: {
    0: "1",
    1: "2",
    2: "3",
    3: "4",
    4: "l1",
    5: "r1",
    6: "l2",
    7: "r2",
    8: "select",
    9: "start",
    10: "stick1",
    11: "stick2",
    12: "up",
    13: "down",
    14: "left",
    15: "right",
    16: "super"
  },

  zeroState: function() {

    var buttons = [];

    for (var i = 0; i <= 15; i++) {
      buttons.push({
        pressed: false,
        value: 0
      });
    }

    return {
      axes: [],
      buttons: buttons
    };

  },

  createGamepad: function() {

    var result = {
      buttons: {},
      sticks: [{
        x: 0,
        y: 0
      }, {
        x: 0,
        y: 0
      }]
    };


    for (var i = 0; i < 16; i++) {
      var key = this.buttons[i];
      result.buttons[key] = false;
    }

    return result;

  },

  step: function() {

    if (!navigator.getGamepads) return;

    var gamepads = navigator.getGamepads();

    for (var i = 0; i < gamepads.length; i++) {

      var current = gamepads[i];

      if (!current) continue;

      if (!this[i]) this[i] = this.createGamepad();

      /* have to concat the current.buttons because the are read-only */

      var buttons = [].concat(current.buttons);

      /* hack for missing  dpads */
      /*
            for (var h = 12; h <= 15; h++) {

              // if (!buttons[h]) 

              buttons[h] = {
                pressed: false,
                value: 0
              };
            }
      */
      var previous = this[i];

      /* axes (sticks) to buttons */

      if (current.axes) {

        /*
                if (Math.abs(current.axes[0]) > 0.01) {
                  if (current.axes[0] < 0) buttons[14].pressed = true;
                  if (current.axes[0] > 0) buttons[15].pressed = true;
                }

                if (Math.abs(current.axes[1]) > 0.01) {
                  if (current.axes[1] < 0) buttons[12].pressed = true;
                  if (current.axes[1] > 0) buttons[13].pressed = true;
                }
                */

        var stickChanged = false;
        var stickA = false;
        var stickB = false;

        if (previous.sticks[0].x !== current.axes[0]) {

          stickChanged = true;
          stickA = true;

        }

        if (previous.sticks[0].y !== current.axes[1]) {

          stickChanged = true;
          stickA = true;

        }

        if (previous.sticks[1].x !== current.axes[2]) {

          stickChanged = true;
          stickB = true;

        }

        if (previous.sticks[1].y !== current.axes[3]) {

          stickChanged = true;
          stickB = true;

        }

        if (stickChanged) {

          this.gamepadmoveEvent.old = [
            PLAYGROUND.Utils.extend({}, previous.sticks[0]),
            PLAYGROUND.Utils.extend({}, previous.sticks[1])
          ];

          previous.sticks[0].x = current.axes[0];
          previous.sticks[0].y = current.axes[1];
          previous.sticks[1].x = current.axes[2];
          previous.sticks[1].y = current.axes[3];

          this.gamepadmoveEvent.sticks = previous.sticks;
          this.gamepadmoveEvent.gamepad = i;

          if (stickA) {

            this.gamepadmoveEvent.b = false;
            this.gamepadmoveEvent.a = previous.sticks[0];
            this.trigger("gamepadmove", this.gamepadmoveEvent);

          }

          if (stickB) {

            this.gamepadmoveEvent.a = false;
            this.gamepadmoveEvent.b = previous.sticks[1];
            this.trigger("gamepadmove", this.gamepadmoveEvent);

          }


        }


      }

      /* check buttons changes */

      for (var j = 0; j < buttons.length; j++) {

        var key = this.buttons[j];

        /* gamepad down */

        if (buttons[j].pressed && !previous.buttons[key]) {

          previous.buttons[key] = true;
          this.gamepaddownEvent.button = this.buttons[j];
          this.gamepaddownEvent.gamepad = i;
          this.trigger("gamepaddown", this.gamepaddownEvent);
          this.trigger("keydown", {
            key: "gamepad" + this.gamepaddownEvent.button,
            gamepad: i
          });

        }

        /* gamepad hold */

        if (buttons[j].pressed) {

          this.gamepadholdEvent.button = this.buttons[j];
          this.gamepadholdEvent.gamepad = i;
          this.gamepadholdEvent.dt = this.app.elapsed;
          this.trigger("gamepadhold", this.gamepadholdEvent);

        }

        /* gamepad up */
        else if (!buttons[j].pressed && previous.buttons[key]) {

          previous.buttons[key] = false;
          this.gamepadupEvent.button = this.buttons[j];
          this.gamepadupEvent.gamepad = i;
          this.trigger("gamepadup", this.gamepadupEvent);
          this.trigger("keyup", {
            key: "gamepad" + this.gamepadupEvent.button,
            gamepad: i
          });

        }

      }

    }

  }
};

PLAYGROUND.Utils.extend(PLAYGROUND.Gamepads.prototype, PLAYGROUND.Events.prototype);

/* file: src/Keyboard.js */

/** Keyboard related functionality.
 *
 * A key name is computed by either taking the ASCII representation or
 * using the `keycodes` array to assign a name. To get corresponding code
 * use `original.which` in event handler.
 *
 * Properties:
 * - keys: associative array that maps key names to either true or false
 *   if a key is not in this array it was never pressed
 * - preventDefault: stop event propagation
 * - bypassKeys: `preventDefault` will not act on these keys
 * - keydownEvent: caches information about last key down event
 *     - key: name of the key
 *     - original: original event
 * - keyupEvent: caches information about last key up event
 *     - key: name of the key
 *     - original: original event
 *
 * Events generated by this object:
 * - keydown: a key was pressed (handler receives `keydownEvent` object)
 * - keyup: a key was released (handler receives `keyupEvent` object)
 *
 * Reference: http://playgroundjs.com/playground-keyboard
 */

PLAYGROUND.Keyboard = function(app) {

  PLAYGROUND.Events.call(this);

  this.app = app;
  this.keys = {};
  this.timestamps = {};
  this.any = false;
  this.lastKey = -1;

  this.keydownlistener = this.keydown.bind(this);
  this.keyuplistener = this.keyup.bind(this);
  this.keypresslistener = this.keypress.bind(this);

  document.addEventListener("keydown", this.keydownlistener);
  document.addEventListener("keyup", this.keyuplistener);
  document.addEventListener("keypress", this.keypresslistener);

  this.keydownEvent = {};
  this.keyupEvent = {};
  this.keypressEvent = {};

  this.preventDefault = true;

  this.enabled = true;

  this.app.on("kill", this.kill.bind(this));
  this.app.on("blur", this.blur.bind(this));

  this.mapping = {};

  this.keyToCode = {};

  for (var code in this.keycodes) this.keyToCode[this.keycodes[code]] = code;

};

PLAYGROUND.Keyboard.prototype = {

  doubleTimeframe: 0.25,

  kill: function() {

    document.removeEventListener("keydown", this.keydownlistener);
    document.removeEventListener("keyup", this.keyuplistener);
    document.removeEventListener("keypress", this.keypresslistener);

  },

  keycodes: {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    45: "insert",
    46: "delete",
    8: "backspace",
    9: "tab",
    13: "enter",
    16: "shift",
    17: "ctrl",
    18: "alt",
    19: "pause",
    20: "capslock",
    27: "escape",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    96: "numpad0",
    97: "numpad1",
    98: "numpad2",
    99: "numpad3",
    100: "numpad4",
    101: "numpad5",
    102: "numpad6",
    103: "numpad7",
    104: "numpad8",
    105: "numpad9",
    106: "numpadmul",
    107: "numpadadd",
    109: "numpadsub",
    110: "numpaddec",
    111: "numpaddiv",
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",
    144: "numlock",
    145: "scrolllock",
    186: "semicolon",
    187: "equal",
    188: "comma",
    189: "dash",
    190: "period",
    191: "slash",
    192: "graveaccent",
    219: "openbracket",
    220: "backslash",
    221: "closebracket",
    222: "singlequote"
  },

  bypassKeys: ["f12", "f11", "f5", "ctrl", "alt", "shift"],

  keydown: function(e) {

    if (!this.enabled) return;

    if (e.which >= 48 && e.which <= 90) var keyName = String.fromCharCode(e.which).toLowerCase();
    else var keyName = this.keycodes[e.which];

    if (this.mapping[keyName]) keyName = this.mapping[keyName];

    if (this.keys[keyName]) return;

    this.any++;

    this.keydownEvent.key = keyName;
    this.keydownEvent.original = e;

    this.keys[keyName] = true;

    if (keyName === this.lastKey && Date.now() - this.timestamps[keyName] < this.doubleTimeframe * 1000) {

      this.timestamps[keyName] = Date.now() - this.doubleTimeframe;
      this.keydownEvent.double = true;

    } else {

      this.timestamps[keyName] = Date.now();
      this.keydownEvent.double = false;

    }


    this.trigger("keydown", this.keydownEvent);

    if (this.preventDefault && document.activeElement === document.body) {

      var bypass = e.metaKey;

      if (!bypass) {

        for (var i = 0; i < this.bypassKeys.length; i++) {

          if (this.keys[this.bypassKeys[i]]) {
            bypass = true;
            break
          }

        }

      }

      if (!bypass) {
        // e.returnValue = false;
        // e.keyCode = 0;
        e.preventDefault();
        e.stopPropagation();
      }

    }

    this.lastKey = keyName;

  },

  keyup: function(e) {

    if (!this.enabled) return;

    if (e.which >= 48 && e.which <= 90) var keyName = String.fromCharCode(e.which).toLowerCase();
    else var keyName = this.keycodes[e.which];

    if (this.mapping[keyName]) keyName = this.mapping[keyName];

    this.any--;

    this.keyupEvent.key = keyName;
    this.keyupEvent.original = e;

    this.keys[keyName] = false;

    this.trigger("keyup", this.keyupEvent);

  },

  keypress: function(e) {

    if (!this.enabled) return;

    if (e.which >= 48 && e.which <= 90) var keyName = String.fromCharCode(e.which).toLowerCase();
    else var keyName = this.keycodes[e.which];

    if (this.mapping[keyName]) keyName = this.mapping[keyName];

    this.keypressEvent.key = keyName;
    this.keypressEvent.original = e;

    this.trigger("keypress", this.keypressEvent);

  },

  blur: function(e) {

    for (var key in this.keys) {

      var state = this.keys[key];

      if (!state) continue;

      this.keyup({
        which: this.keyToCode[key]
      });

    }

  }


};

PLAYGROUND.Utils.extend(PLAYGROUND.Keyboard.prototype, PLAYGROUND.Events.prototype);


/* file: src/Pointer.js */

/** Abstracts away differences between mouse and touches.
 *
 * The object simply listens to global events raised by application and
 * raises new (global) events on behalf of the application.
 *
 * Following events are raised:
 * - pointerdown:mouse button down or start tracking touch point
 * - pointerup: mouse button release or touch point release
 * - pointermove: mouse pointer or touch point moved
 * - pointerwheel: mouse wheel rotated
 *
 * Reference: http://playgroundjs.com/playground-pointer
 */

PLAYGROUND.Pointer = function(app) {

  this.app = app;

  this.x = 0;
  this.y = 0;

  app.on("touchstart", this.touchstart, this);
  app.on("touchend", this.touchend, this);
  app.on("touchmove", this.touchmove, this);

  app.on("mousemove", this.mousemove, this);
  app.on("mousedown", this.mousedown, this);
  app.on("mouseup", this.mouseup, this);
  app.on("mousewheel", this.mousewheel, this);

  this.pointers = app.pointers = {};

  this.app.pointer = this;

  this.lastTap = 0;

};

PLAYGROUND.Pointer.plugin = true;

PLAYGROUND.Pointer.prototype = {

  updatePointer: function(e) {

    if (!this.pointers[e.id]) this.pointers[e.id] = {};

    var pointer = this.pointers[e.id];

    pointer.x = e.x;
    pointer.y = e.y;
    // pointer.touch = e.touch;
    // pointer.mouse = e.mouse;    
    pointer.id = e.id;

    return pointer;

  },

  removePointer: function(e) {

    delete this.pointers[e.id];

  },

  touchstart: function(e) {

    e.touch = true;

    this.updatePointer(e);

    this.pointerdown(e);

    this.app.emitGlobalEvent("pointerdown", e);

  },

  touchend: function(e) {

    e.touch = true;

    this.pointerup(e);

    this.removePointer(e);

    this.app.emitGlobalEvent("pointerup", e);

  },

  touchmove: function(e) {

    e.touch = true;

    this.updatePointer(e);

    this.pointermove(e);

    this.x = this.app.touch.x;
    this.y = this.app.touch.y;

    this.app.emitGlobalEvent("pointermove", e);

  },

  mousemove: function(e) {

    e.mouse = true;

    this.updatePointer(e);

    this.pointermove(e);

    this.x = this.app.mouse.x;
    this.y = this.app.mouse.y;

    this.app.emitGlobalEvent("pointermove", e);

  },

  mousedown: function(e) {

    e.mouse = true;

    this.pressed = true;

    this.updatePointer(e);

    this.app.emitGlobalEvent("pointerdown", e);

    this.pointerdown(e);

  },

  mouseup: function(e) {

    e.mouse = true;

    this.pressed = false;

    this.pointerup(e);

    this.app.emitGlobalEvent("pointerup", e);

  },

  mousewheel: function(e) {

    e.mouse = true;

    this.app.emitGlobalEvent("pointerwheel", e);

  },

  pointerdown: function(e) {

    var pointer = this.pointers[e.id];

    pointer.pressed = true;
    this.pressed = true;

    var timeFrame = this.app.lifetime - pointer.lastTap;

    pointer.lastTap = this.app.lifetime;

    if (timeFrame < 0.4 && pointer.tapPosition && PLAYGROUND.Utils.distance(pointer, pointer.tapPosition) < 5) {

      this.app.emitGlobalEvent("pointerdoubletap", pointer);

      pointer.lastTap = 0;

    }

    pointer.tapPosition = {
      x: e.x,
      y: e.y
    };

  },

  pointermove: function(e) {

    var pointer = this.pointers[e.id];

    if (!pointer.dragging && pointer.pressed && PLAYGROUND.Utils.distance(pointer.tapPosition, e) > 5) {

      pointer.dragging = true;

    }

    e.dragging = pointer.dragging;

  },

  pointerup: function(e) {

    var pointer = this.pointers[e.id];

    pointer.pressed = false;
    pointer.dragging = false;
    this.pressed = false;

  }



};

/* file: src/Loader.js */

/** Resources loading.
 *
 * This object - despite its name - does not load anything. Instead, it
 * acts as a central hub for reporting and tracking the progress of
 * resource loading. Each load element is given an unique id by the caller
 * and that id is used when events are raised.
 *
 * Properties:
 * - app: the main application object
 * - queue: number of elements to be loaded
 * - count: total number of elements (loading and loaded)
 * - ready: true if all requested elements were retrieved
 * - progress: [0..1] fraction of resources loaded so far
 *     - id, identifier: event id for compatibility with touches
 *     - x, y: the absolute position in pixels
 *     - original: original event
 *     - mozMovementX, mozMovementY: change in position from previous event
 * - mousedownEvent and mouseupEvent: last button press or release event
 *     - id, identifier: event id for compatibility with touches
 *     - x, y: the absolute position in pixels
 *     - original: original event
 *     - button: one of `left`, `middle`, `right`
 * - x, y: alias for mousemoveEvent.x, .y
 *
 * Events generated by this object (PLAYGROUND.Application.mouseToTouch
 * decides the variant to trigger):
 * - add: an element was added to the queue
 * - load: an element was successfully loaded
 * - error: an element could not be loaded
 * - ready: *all* elements were successfully loaded; this *is not* triggered
 *   if any element reported an error.
 */

PLAYGROUND.Loader = function(app) {

  this.app = app;

  PLAYGROUND.Events.call(this);

  this.reset();

};

PLAYGROUND.Loader.prototype = {

  /** Start retreiving an element */

  add: function(id) {

    this.queue++;
    this.count++;
    this.ready = false;
    this.trigger("add", id);

    return id;

  },

  /** Report an error to the loader. */

  error: function(id) {

    this.trigger("error", id);

  },

  /** Report a success to the loader. */

  success: function(id) {

    this.queue--;

    this.progress = 1 - this.queue / this.count;

    this.trigger("load", id);

    if (this.queue <= 0) {
      this.reset();
      this.trigger("ready");
    }

  },

  /** Bring loader back to the ground state */

  reset: function() {

    this.progress = 0;
    this.queue = 0;
    this.count = 0;
    this.ready = true;

  }
};

PLAYGROUND.Utils.extend(PLAYGROUND.Loader.prototype, PLAYGROUND.Events.prototype);

/* file: src/Mouse.js */

PLAYGROUND.Mouse = function(app, element) {

  var self = this;

  this.app = app;

  PLAYGROUND.Events.call(this);

  this.element = element;

  this.preventContextMenu = true;

  this.enabled = true;

  this.mousemoveEvent = {};
  this.mousedownEvent = {};
  this.mouseupEvent = {};
  this.mousewheelEvent = {};

  this.x = 0;
  this.y = 0;


  if (app.mouseThrottling) {

    this.mousemove = PLAYGROUND.Utils.throttle(this.mousemove, app.mouseThrottling);

  }

  this.mousemovelistener = this.mousemove.bind(this);
  this.mousedownlistener = this.mousedown.bind(this);
  this.mouseuplistener = this.mouseup.bind(this);
  this.mouseoutlistener = this.mouseout.bind(this);
  this.contextmenulistener = function(e) {

    if (self.preventContextMenu && !e.metaKey) e.preventDefault();

  };

  element.addEventListener("mousemove", this.mousemovelistener);
  element.addEventListener("mousedown", this.mousedownlistener);
  element.addEventListener("mouseup", this.mouseuplistener);
  element.addEventListener("mouseout", this.mouseoutlistener);
  element.addEventListener("contextmenu", this.contextmenulistener);

  this.app.on("kill", this.kill.bind(this));

  this.enableMousewheel();

  element.requestPointerLock = element.requestPointerLock ||
    element.mozRequestPointerLock ||
    element.webkitRequestPointerLock;

  document.exitPointerLock = document.exitPointerLock ||
    document.mozExitPointerLock ||
    document.webkitExitPointerLock;


  this.handleResize();


};

PLAYGROUND.Mouse.prototype = {

  kill: function() {

    this.element.removeEventListener("mousemove", this.mousemovelistener);
    this.element.removeEventListener("mousedown", this.mousedownlistener);
    this.element.removeEventListener("mouseup", this.mouseuplistener);
    this.element.removeEventListener("mouseout", this.mouseoutlistener);
    this.element.removeEventListener("contextmenu", this.contextmenulistener);

  },

  mouseout: function(button) {

    for (var i = 0; i < 3; i++) {

      this.mouseup({
        button: i
      });

    }

  },

  lock: function() {

    this.locked = true;
    this.element.requestPointerLock();

  },

  unlock: function() {

    this.locked = false;
    document.exitPointerLock();

  },

  getElementOffset: function(element) {

    var offsetX = 0;
    var offsetY = 0;

    do {

      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;

    }

    while ((element = element.offsetParent));

    return {
      x: offsetX,
      y: offsetY
    };

  },

  handleResize: function() {

    this.elementOffset = this.getElementOffset(this.element);

  },

  mousemove: function(e) {

    if (!this.enabled) return;

    this.x = this.mousemoveEvent.x = (e.pageX - this.elementOffset.x - this.app.offsetX) / this.app.scale | 0;
    this.y = this.mousemoveEvent.y = (e.pageY - this.elementOffset.y - this.app.offsetY) / this.app.scale | 0;

    this.mousemoveEvent.original = e;

    if (this.locked) {

      this.mousemoveEvent.movementX = e.movementX ||
        e.mozMovementX ||
        e.webkitMovementX ||
        0;

      this.mousemoveEvent.movementY = e.movementY ||
        e.mozMovementY ||
        e.webkitMovementY ||
        0;
    }

    if (this.app.mouseToTouch) {
      //      if (this.left) {
      this.mousemoveEvent.id = this.mousemoveEvent.identifier = 255;
      this.trigger("touchmove", this.mousemoveEvent);
      //      }
    } else {
      this.mousemoveEvent.id = this.mousemoveEvent.identifier = 255;
      this.trigger("mousemove", this.mousemoveEvent);
    }

  },

  mousedown: function(e) {

    if (!this.enabled) return;

    var buttonName = ["left", "middle", "right"][e.button];

    this.mousedownEvent.x = this.mousemoveEvent.x;
    this.mousedownEvent.y = this.mousemoveEvent.y;
    this.mousedownEvent.button = buttonName;
    this.mousedownEvent.original = e;

    this[buttonName] = true;

    this.mousedownEvent.id = this.mousedownEvent.identifier = 255;

    if (this.app.mouseToTouch) {
      this.trigger("touchmove", this.mousedownEvent);
      this.trigger("touchstart", this.mousedownEvent);
    } else {
      this.trigger("mousedown", this.mousedownEvent);
    }

    this.trigger("keydown", {
      key: "mouse" + buttonName
    });

  },

  mouseup: function(e) {

    if (!this.enabled) return;

    var buttonName = ["left", "middle", "right"][e.button];

    if (!this[buttonName]) return;

    this.mouseupEvent.x = this.mousemoveEvent.x;
    this.mouseupEvent.y = this.mousemoveEvent.y;
    this.mouseupEvent.button = buttonName;
    this.mouseupEvent.original = e;

    this.mouseupEvent.id = this.mouseupEvent.identifier = 255;

    if (this.app.mouseToTouch) {

      this.trigger("touchend", this.mouseupEvent);

    } else {

      this.trigger("mouseup", this.mouseupEvent);

    }

    this.trigger("keyup", {

      key: "mouse" + buttonName

    });

    this[buttonName] = false;

  },

  mousewheel: function(e) {

    this.mousewheelEvent.x = this.mousemoveEvent.x;
    this.mousewheelEvent.y = this.mousemoveEvent.y;
    this.mousewheelEvent.button = ["none", "left", "middle", "right"][e.button];
    this.mousewheelEvent.original = e;
    this.mousewheelEvent.id = this.mousewheelEvent.identifier = 255;

    this[e.button] = false;

    this.trigger("mousewheel", this.mousewheelEvent);

    this.trigger("keydown", {
      key: e.delta > 0 ? "mousewheelup" : "mousewheeldown"
    });

  },


  enableMousewheel: function() {

    var eventNames = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
    var callback = this.mousewheel.bind(this);
    var self = this;

    var throttled = PLAYGROUND.Utils.throttle(function(event) {

      var orgEvent = event || window.event,
        args = [].slice.call(arguments, 1),
        delta = 0,
        deltaX = 0,
        deltaY = 0,
        absDelta = 0,
        absDeltaXY = 0,
        fn;

      // orgEvent.type = "mousewheel";

      // Old school scrollwheel delta
      if (orgEvent.wheelDelta) {
        delta = orgEvent.wheelDelta;
      }

      if (orgEvent.detail) {
        delta = orgEvent.detail * -1;
      }

      // New school wheel delta (wheel event)
      if (orgEvent.deltaY) {
        deltaY = orgEvent.deltaY * -1;
        delta = deltaY;
      }

      // Webkit
      if (orgEvent.wheelDeltaY !== undefined) {
        deltaY = orgEvent.wheelDeltaY;
      }

      var result = delta ? delta : deltaY;

      self.mousewheelEvent.x = self.mousemoveEvent.x;
      self.mousewheelEvent.y = self.mousemoveEvent.y;
      self.mousewheelEvent.delta = result / Math.abs(result);
      self.mousewheelEvent.original = orgEvent;

      callback(self.mousewheelEvent);

      orgEvent.preventDefault();

    }, 40);

    for (var i = eventNames.length; i;) {

      self.element.addEventListener(eventNames[--i], function(event) {

        throttled(event);

        var prevent = !PLAYGROUND.Utils.classInParents(event.target, "scroll");

        if (prevent) {

          event.preventDefault();
          event.stopPropagation();

        }

      }, false);
      /*
            self.element.addEventListener(eventNames[--i], function(event) {

              e.preventDefault();
              e.stopPropagation();

            });
            */

    }
  
  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Mouse.prototype, PLAYGROUND.Events.prototype);

/* file: src/Sound.js */

/** Factory that creates sound related objects in application.
 *
 * The back-end is either PLAYGROUND.SoundWebAudioAPI or PLAYGROUND.SoundAudio.
 *
 * The application object will have tow (identical) objects inserted:
 * `sound` and `music`.
 */
PLAYGROUND.Sound = function(app) {

  var audioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

  if (audioContext && !app.forceAudioFallback) {

    if (!PLAYGROUND.audioContext) PLAYGROUND.audioContext = new audioContext;

    app.audioContext = PLAYGROUND.audioContext;
    app.sound = new PLAYGROUND.SoundWebAudioAPI(app, app.audioContext);
    app.music = new PLAYGROUND.SoundWebAudioAPI(app, app.audioContext);

  } else {

    app.sound = new PLAYGROUND.SoundAudio(app);
    app.music = new PLAYGROUND.SoundAudio(app);

  }

};

/** Play a sound */
PLAYGROUND.Application.prototype.playSound = function(key, loop) {

  return this.sound.play(key, loop);

};

/** Stop a sound from playing */
PLAYGROUND.Application.prototype.stopSound = function(sound) {

  this.sound.stop(sound);

};

/** Load the sound */
PLAYGROUND.Application.prototype.loadSound = function() {

  return this.loadSounds.apply(this, arguments);

};

/** Load multiple sounds */
PLAYGROUND.Application.prototype.loadSounds = function() {

  for (var i = 0; i < arguments.length; i++) {

    var arg = arguments[i];

    /* polymorphism at its finest */

    if (typeof arg === "object") {

      for (var key in arg) this.loadSounds(arg[key]);

    } else {
      this.sound.load(arg);
    }
  }

};

/* file: src/SoundWebAudioAPI.js */

/* Stereo panner SHIM */

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n ? n : e)
      }, l, l.exports, e, t, n, r)
    }
    return n[o].exports
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s
})({
  1: [function(require, module, exports) {
    (function(global) {
      "use strict";
      var AudioContext = global.AudioContext || global.webkitAudioContext;
      var StereoPannerNode = require("stereo-panner-node");
      if (AudioContext && !AudioContext.prototype.createStereoPanner) {
        AudioContext.prototype.createStereoPanner = function() {
          return new StereoPannerNode(this)
        }
      }
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
  }, {
    "stereo-panner-node": 4
  }],
  2: [function(require, module, exports) {
    "use strict";
    var WS_CURVE_SIZE = 4096;
    var curveL = new Float32Array(WS_CURVE_SIZE);
    var curveR = new Float32Array(WS_CURVE_SIZE);
    (function() {
      for (var i = 0; i < WS_CURVE_SIZE; i++) {
        curveL[i] = Math.cos(i / WS_CURVE_SIZE * Math.PI * .5);
        curveR[i] = Math.sin(i / WS_CURVE_SIZE * Math.PI * .5)
      }
    })();
    module.exports = {
      L: curveL,
      R: curveR
    }
  }, {}],
  3: [function(require, module, exports) {
    (function(global) {
      "use strict";
      var curve = require("./curve");

      function StereoPannerImpl(audioContext) {
        this.audioContext = audioContext;
        this.inlet = audioContext.createChannelSplitter(2);
        this._pan = audioContext.createGain();
        this.pan = this._pan.gain;
        this._wsL = audioContext.createWaveShaper();
        this._wsR = audioContext.createWaveShaper();
        this._L = audioContext.createGain();
        this._R = audioContext.createGain();
        this.outlet = audioContext.createChannelMerger(2);
        this.inlet.channelCount = 2;
        this.inlet.channelCountMode = "explicit";
        this._pan.gain.value = 0;
        this._wsL.curve = curve.L;
        this._wsR.curve = curve.R;
        this._L.gain.value = 0;
        this._R.gain.value = 0;
        this.inlet.connect(this._L, 0);
        this.inlet.connect(this._R, 1);
        this._L.connect(this.outlet, 0, 0);
        this._R.connect(this.outlet, 0, 1);
        this._pan.connect(this._wsL);
        this._pan.connect(this._wsR);
        this._wsL.connect(this._L.gain);
        this._wsR.connect(this._R.gain);
        this._isConnected = false;
        this._dc1buffer = null;
        this._dc1 = null
      }
      StereoPannerImpl.prototype.connect = function(destination) {
        var audioContext = this.audioContext;
        if (!this._isConnected) {
          this._isConnected = true;
          this._dc1buffer = audioContext.createBuffer(1, 2, audioContext.sampleRate);
          this._dc1buffer.getChannelData(0).set([1, 1]);
          this._dc1 = audioContext.createBufferSource();
          this._dc1.buffer = this._dc1buffer;
          this._dc1.loop = true;
          this._dc1.start(audioContext.currentTime);
          this._dc1.connect(this._pan)
        }
        global.AudioNode.prototype.connect.call(this.outlet, destination)
      };
      StereoPannerImpl.prototype.disconnect = function() {
        var audioContext = this.audioContext;
        if (this._isConnected) {
          this._isConnected = false;
          this._dc1.stop(audioContext.currentTime);
          this._dc1.disconnect();
          this._dc1 = null;
          this._dc1buffer = null
        }
        global.AudioNode.prototype.disconnect.call(this.outlet)
      };
      module.exports = StereoPannerImpl
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
  }, {
    "./curve": 2
  }],
  4: [function(require, module, exports) {
    "use strict";
    var StereoPannerImpl = require("./stereo-panner-impl");

    function StereoPanner(audioContext) {
      var impl = new StereoPannerImpl(audioContext);
      Object.defineProperties(impl.inlet, {
        pan: {
          value: impl.pan,
          enumerable: true
        },
        connect: {
          value: function(node) {
            return impl.connect(node)
          }
        },
        disconnect: {
          value: function() {
            return impl.disconnect()
          }
        }
      });
      return impl.inlet
    }
    module.exports = StereoPanner
  }, {
    "./stereo-panner-impl": 3
  }]
}, {}, [1]);


/** Sound back-end using Web Audio API
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
 */


PLAYGROUND.SoundWebAudioAPI = function(app, audioContext) {

  this.app = app;

  var canPlayMp3 = (new Audio).canPlayType("audio/mp3");
  var canPlayOgg = (new Audio).canPlayType('audio/ogg; codecs="vorbis"');

  if (this.app.preferedAudioFormat === "mp3") {

    if (canPlayMp3) this.audioFormat = "mp3";
    else this.audioFormat = "ogg";

  } else {

    if (canPlayOgg) this.audioFormat = "ogg";
    else this.audioFormat = "mp3";

  }

  this.context = audioContext;

  this.gainNode = this.context.createGain()
  this.gainNode.connect(this.context.destination);

  this.compressor = this.context.createDynamicsCompressor();
  this.compressor.connect(this.gainNode);

  this.output = this.compressor;

  this.gainNode.gain.value = 1.0;

  this.pool = [];
  this.volume = 1.0;

  this.loops = [];

  this.app.on("step", this.step.bind(this));

};

PLAYGROUND.SoundWebAudioAPI.prototype = {

  buffers: {},
  aliases: {},

  alias: function(alias, source, volume, rate) {

    this.aliases[alias] = {
      source: source,
      volume: volume,
      rate: rate
    };

  },

  setMaster: function(volume) {

    this.volume = volume;

    this.gainNode.gain.value = volume;

  },

  load: function(file) {

    var entry = this.app.getAssetEntry(file, "sounds", this.audioFormat);

    var sampler = this;

    var request = new XMLHttpRequest();

    request.open("GET", entry.url, true);
    request.responseType = "arraybuffer";

    var id = this.app.loader.add(entry.url);

    request.onload = function() {

      sampler.context.decodeAudioData(this.response, function(decodedBuffer) {
        sampler.buffers[entry.key] = decodedBuffer;
        sampler.app.loader.success(entry.url);
      });

    }

    request.send();

  },

  cleanArray: function(array, property) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (array[i] === null || (property && array[i][property])) {
        array.splice(i--, 1);
        len--;
      }
    }
  },

  getSoundBuffer: function() {

    if (!this.pool.length) {
      for (var i = 0; i < 100; i++) {

        var buffer, gain, panner;

        var nodes = [
          buffer = this.context.createBufferSource(),
          gain = this.context.createGain(),
          panner = this.context.createStereoPanner()
        ];

        this.pool.push(nodes);


        if (!PLAYGROUND.MOBILE) {

          nodes[0].connect(nodes[1]);
          nodes[1].connect(nodes[2]);
          nodes[2].connect(this.output);

        } else {

          nodes[0].connect(nodes[1]);
          nodes[1].connect(this.gainNode);

        }

      }
    }

    return this.pool.pop();
  },

  play: function(name, loop) {

    var alias = this.aliases[name];

    var nodes = this.getSoundBuffer();

    if (alias) name = alias.source;

    bufferSource = nodes[0];
    bufferSource.gainNode = nodes[1];
    bufferSource.pannerNode = nodes[2];
    bufferSource.buffer = this.buffers[name];
    bufferSource.loop = loop || false;
    bufferSource.key = name;

    bufferSource.alias = alias;

    this.setVolume(bufferSource, 1.0);
    this.setPlaybackRate(bufferSource, 1.0);

    if (this.loop) {
      //  bufferSource.loopStart = this.loopStart;
      // bufferSource.loopEnd = this.loopEnd;
    }


    bufferSource.start(0);

    bufferSource.volumeLimit = 1;

    return bufferSource;
  },

  stop: function(what) {

    if (!what) return;

    what.stop(0);

  },

  setPlaybackRate: function(sound, rate) {

    if (!sound) return;

    if (sound.alias) rate *= sound.alias.rate;

    return sound.playbackRate.value = rate;
  },

  getVolume: function(sound) {

    if (!sound) return;

    return sound.gainNode.gain.value;

  },

  setVolume: function(sound, volume) {

    if (!sound) return;

    if (sound.alias) volume *= sound.alias.volume;

    return sound.gainNode.gain.value = Math.max(0, volume);
  },

  setPanning: function(sound, pan) {

    sound.pannerNode.pan.value = pan;

  },

  getPanning: function(sound) {

    return sound.pannerNode.pan.value;

  },

  fadeOut: function(sound) {

    if (!sound) return;

    sound.fadeOut = true;

    this.loops.push(sound);

    return sound;

  },

  fadeIn: function(sound) {

    if (!sound) return;

    sound.fadeIn = true;

    this.loops.push(sound);
    this.setVolume(sound, 0);


    return sound;

  },

  step: function(delta) {

    for (var i = 0; i < this.loops.length; i++) {

      var loop = this.loops[i];

      if (loop.fadeIn) {
        var volume = this.getVolume(loop);
        volume = this.setVolume(loop, Math.min(1.0, volume + delta * 0.5));

        if (volume >= 1.0) {
          this.loops.splice(i--, 1);
        }
      }

      if (loop.fadeOut) {
        var volume = this.getVolume(loop);
        volume = this.setVolume(loop, Math.min(1.0, volume - delta * 0.5));

        if (volume <= 0) {
          this.loops.splice(i--, 1);
          this.stop(loop);
        }
      }

    }

  }

};

/* file: src/SoundAudio.js */

/** Sound back-end using HTML DOM Audio object.
 *
 */
PLAYGROUND.SoundAudio = function(app) {

  this.app = app;

  var canPlayMp3 = (new Audio).canPlayType("audio/mp3");
  var canPlayOgg = (new Audio).canPlayType('audio/ogg; codecs="vorbis"');

  if (this.app.preferedAudioFormat === "mp3") {

    if (canPlayMp3) this.audioFormat = "mp3";
    else this.audioFormat = "ogg";

  } else {

    if (canPlayOgg) this.audioFormat = "ogg";
    else this.audioFormat = "mp3";

  }

};

PLAYGROUND.SoundAudio.prototype = {

  samples: {},

  setMaster: function(volume) {

    this.volume = volume;

  },

  setMasterPosition: function() {

  },

  setPosition: function(x, y, z) {
    return;
  },

  load: function(file) {

    console.log(file, this.audioFormat)

    var url = "sounds/" + file + "." + this.audioFormat;

    var loader = this.app.loader;

    this.app.loader.add(url);

    var audio = this.samples[file] = new Audio;

    audio.addEventListener("canplay", function() {

      console.log("CANPLAY");

      this.pause();
      loader.success(url);


    });
    /*
        audio.addEventListener("canplaythrough", function() {

          console.log("CANPLAYTHROUGH");

          loader.success(url);

        });

        audio.addEventListener("load", function() {

          console.log("LOAD");

          loader.success(url);

        });
    */
    audio.addEventListener("error", function() {

      loader.error(url);

    });

    audio.src = url;
    audio.play();


  },

  play: function(key, loop) {

    var sound = this.samples[key];

    sound.currentTime = 0;
    sound.loop = loop;
    sound.play();

    return sound;

  },

  stop: function(what) {

    if (!what) return;

    what.pause();

  },

  step: function(delta) {

  },

  setPlaybackRate: function(sound, rate) {

    return;
  },

  setVolume: function(sound, volume) {

    sound.volume = volume * this.volume;

  },

  setPosition: function() {

  },

  setPanning: function(sound, pan) {

  }

};

/* file: src/Touch.js */

/** Touch related functionality.
 *
 * The object keeps track of active touches using an unique id
 * provided by the browser. When a touch starts an entry is added
 * to the `touches` associative array with the key being the
 * unique identifier and the value an object with following members:
 * - x: horizontal position in pixels/scale
 * - y: vertical position in pixels/scale
 *
 * When the tracking point changes location the values are updated and
 * when the touches ends the entry is removed from the `touches` array.
 *
 * Properties:
 * - app: the main application object
 * - element: the DOM element we're handling events for
 * - touches: list of active touches
 * - x, y: last changed position across all touches
 *
 * Events generated by this object:
 * - touchmove: a touch changed its position
 * - touchstart: a touch was added
 * - touchend: a touch ended
 *
 * Event handlers receive the position (x, y), the id (identifier) and
 * original event.
 *
 * Reference: http://playgroundjs.com/playground-touch
 */
PLAYGROUND.Touch = function(app, element) {

  PLAYGROUND.Events.call(this);

  this.app = app;

  this.element = element;

  this.touches = {};

  this.enabled = true;

  this.x = 0;
  this.y = 0;

  this.touchmovelistener = this.touchmove.bind(this);
  this.touchstartlistener = this.touchstart.bind(this);
  this.touchendlistener = this.touchend.bind(this);

  element.addEventListener("touchmove", this.touchmovelistener, {passive: false});
  element.addEventListener("touchstart", this.touchstartlistener, {passive: false});
  element.addEventListener("touchend", this.touchendlistener, {passive: false});

  this.app.on("kill", this.kill.bind(this));

};

PLAYGROUND.Touch.prototype = {

  kill: function() {

    this.element.removeEventListener("touchmove", this.touchmovelistener);
    this.element.removeEventListener("touchstart", this.touchstartlistener);
    this.element.removeEventListener("touchend", this.touchendlistener);

  },

  getElementOffset: function(element) {

    var offsetX = 0;
    var offsetY = 0;

    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    }

    while ((element = element.offsetParent));

    return {
      x: offsetX,
      y: offsetY
    };

  },

  handleResize: function() {

    this.elementOffset = this.getElementOffset(this.element);

  },

  touchmove: function(e) {

    if (!this.enabled) return;

    for (var i = 0; i < e.changedTouches.length; i++) {

      var touch = e.changedTouches[i];

      touchmoveEvent = {}

      this.x = touchmoveEvent.x = (touch.pageX - this.elementOffset.x - this.app.offsetX) / this.app.scale | 0;
      this.y = touchmoveEvent.y = (touch.pageY - this.elementOffset.y - this.app.offsetY) / this.app.scale | 0;

      touchmoveEvent.original = touch;
      touchmoveEvent.id = touchmoveEvent.identifier = touch.identifier;

      this.touches[touch.identifier].x = touchmoveEvent.x;
      this.touches[touch.identifier].y = touchmoveEvent.y;

      this.trigger("touchmove", touchmoveEvent);

    }

    var prevent = !PLAYGROUND.Utils.classInParents(e.target, "ui");

    if (prevent) e.preventDefault();

  },

  touchstart: function(e) {

    if (!this.enabled) return;


    for (var i = 0; i < e.changedTouches.length; i++) {

      var touch = e.changedTouches[i];

      var touchstartEvent = {}

      this.x = touchstartEvent.x = (touch.pageX - this.elementOffset.x - this.app.offsetX) / this.app.scale | 0;
      this.y = touchstartEvent.y = (touch.pageY - this.elementOffset.y - this.app.offsetY) / this.app.scale | 0;

      touchstartEvent.original = e.touch;
      touchstartEvent.id = touchstartEvent.identifier = touch.identifier;

      this.touches[touch.identifier] = {
        x: touchstartEvent.x,
        y: touchstartEvent.y
      };

      this.trigger("touchstart", touchstartEvent);

    }

    var prevent = !PLAYGROUND.Utils.classInParents(e.target, "ui");

    if (prevent) e.preventDefault();

  },

  touchend: function(e) {

    if (!this.enabled) return;

    for (var i = 0; i < e.changedTouches.length; i++) {

      var touch = e.changedTouches[i];
      var touchendEvent = {};

      touchendEvent.x = (touch.pageX - this.elementOffset.x - this.app.offsetX) / this.app.scale | 0;
      touchendEvent.y = (touch.pageY - this.elementOffset.y - this.app.offsetY) / this.app.scale | 0;

      touchendEvent.original = touch;
      touchendEvent.id = touchendEvent.identifier = touch.identifier;

      delete this.touches[touch.identifier];

      this.trigger("touchend", touchendEvent);

    }

    var prevent = !PLAYGROUND.Utils.classInParents(e.target, "ui");

    if (prevent) e.preventDefault();
    
  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Touch.prototype, PLAYGROUND.Events.prototype);

/* file: src/Tween.js */

PLAYGROUND.Tween = function(manager, context) {

  PLAYGROUND.Events.call(this);

  this.manager = manager;
  this.context = context;
  this.auto = true;

  PLAYGROUND.Utils.extend(this, {

    prevEasing: "linear",
    prevDuration: 0.5

  });

  this.clear();

};

PLAYGROUND.Tween.prototype = {

  manual: function() {

    this.auto = false;

    return this;

  },

  /* 

    Add an action to the end of the list
     
    @param properties
    @param duration in miliseconds (optional, default is 0.5)
    @param easing (optional, default is linear)
    @returns `this` object so that calls can be chained.

  */

  add: function(properties, duration, easing) {

    if (typeof duration !== "undefined") this.prevDuration = duration;
    else duration = 0.5;

    if (easing) this.prevEasing = easing;
    else easing = "linear";

    this.actions.push([properties, duration, easing]);

    return this;

  },

  /* Clear animations */

  clear: function() {

    this.actions = [];
    this.index = -1;
    this.current = false;

    return this;

  },

  /* Discard all other tweens associated with same context as ours */

  discard: function() {

    this.manager.discard(this.context, this);

    return this;

  },

  /* Alias for `add()` */

  to: function(properties, duration, easing) {

    return this.add(properties, duration, easing);

  },

  /* Enqueue a method call */

  call: function(methodName, context) {

    var action = ["call", methodName, context || this.context];

    for (var i = 2; i < arguments.length; i++) action.push(arguments[i]);

    this.actions.push(action);

    return this;

  },

  /* Mark the instance as being a repeated tween */

  loop: function() {

    this.looped = true;

    return this;

  },

  /* Add a repeat action for specified number of times */

  repeat: function(times) {

    this.actions.push(["repeat", times]);

    return this;

  },

  /* Add a wait action for specified number of miliseconds */

  wait: function(time) {

    this.actions.push(["wait", time]);

    return this;

  },

  /* Alias for `wait()` */

  delay: function(time) {

    this.actions.push(["wait", time]);

    return this;

  },

  /* Remove this tween from the manager */

  stop: function() {

    this.manager.remove(this);

    return this;

  },

  /* Inserts the tween into the manager if not already inside. */

  play: function() {

    this.manager.add(this);

    this.finished = false;

    return this;

  },

  /* Performs last step in the animation list. */

  end: function() {

    var lastAnimationIndex = 0;

    for (var i = this.index + 1; i < this.actions.length; i++) {
      if (typeof this.actions[i][0] === "object") lastAnimationIndex = i;
    }

    this.index = lastAnimationIndex - 1;
    this.next();
    this.delta = this.duration;
    this.step(0);

    return this;

  },

  /* TBD */

  forward: function() {

    this.delta = this.duration;
    this.step(0);

  },

  /* TBD */

  rewind: function() {

    this.delta = 0;
    this.step(0);

  },

  /* 

    Perform one animation step
   
    Advances the index and, if the index reached the end of the
    `actions` array, either restarts it (for looped tweens) or terminates it.
   
    The function will set a string in `currentAction` indicating what it
    should be done next but it does not perform the action itself.

  */

  next: function() {

    this.delta = 0;

    this.index++;

    if (this.index >= this.actions.length) {

      if (this.looped) {

        this.trigger("loop", {
          tween: this
        });

        this.index = 0;

      } else {

        this.manager.remove(this);

        return;

      }
    }

    this.current = this.actions[this.index];

    if (this.current[0] === "call") {

      var args = this.current.slice(2);

      var methodName = this.current[1];
      var context = this.current[2];
      var method = context[methodName];

      method.apply(context, args);

    } else if (this.current[0] === "wait") {

      this.duration = this.current[1];
      this.currentAction = "wait";

    } else {

      /* calculate changes */

      var properties = this.current[0];

      /* keep keys as array for 0.0001% performance boost */

      this.keys = Object.keys(properties);

      this.change = [];
      this.before = [];
      this.types = [];

      for (var i = 0; i < this.keys.length; i++) {

        var key = this.keys[i];
        var value = this.context[key];

        if (typeof properties[key] === "number") {

          value = value || 0;

          this.before.push(value);
          this.change.push(properties[key] - value);
          this.types.push(0);

        } else if (typeof properties[key] === "string" && properties[key].indexOf("rad") > -1) {

          value = value || 0;

          this.before.push(value);
          this.change.push(PLAYGROUND.Utils.circWrappedDistance(value, parseFloat(properties[key])));
          this.types.push(2);

        } else {

          value = value || "#000";

          var before = cq.color(value);

          this.before.push(before);

          var after = cq.color(properties[key]);

          var temp = [];

          for (var j = 0; j < 3; j++) {
            temp.push(after[j] - before[j]);
          }

          this.change.push(temp);

          this.types.push(1);

        }

      }

      this.currentAction = "animate";

      this.duration = this.current[1];
      this.easing = this.current[2];

    }


  },

  /* TBD */

  prev: function() {

  },

  /* Select an action if none is current then perform required steps. */

  step: function(delta) {

    this.delta += delta;

    if (!this.current) this.next();

    switch (this.currentAction) {

      case "animate":
        this.doAnimate(delta);
        break;

      case "wait":
        this.doWait(delta);
        break;

    }

  },

  doAnimate: function(delta) {

    this.progress = this.duration ? Math.min(1, this.delta / this.duration) : 1.0;

    var mod = PLAYGROUND.Utils.ease(this.progress, this.easing);

    for (var i = 0; i < this.keys.length; i++) {

      var key = this.keys[i];

      switch (this.types[i]) {

        /* number */

        case 0:

          this.context[key] = this.before[i] + this.change[i] * mod;

          break;

          /* color */

        case 1:

          var change = this.change[i];
          var before = this.before[i];
          var color = [];

          for (var j = 0; j < 3; j++) {
            color.push(before[j] + change[j] * mod | 0);
          }

          this.context[key] = "rgb(" + color.join(",") + ")";

          break;

          /* angle */

        case 2:

          this.context[key] = PLAYGROUND.Utils.circWrap(this.before[i] + this.change[i] * mod);

          break;
      }
    }

    if (this.progress >= 1) {

      this.next();

    }

    if (this.listeners["step"]) {

      this.trigger("step", {
        tween: this,
        dt: delta
      });

    }

  },

  /* 

    Advances the animation if enough time has passed
   
    The function is called in response to `step()`; it will advance the
    index to next slot in the animation if

  */

  doWait: function(delta) {

    if (this.delta >= this.duration) this.next();

  },

  onremove: function() {

    this.trigger("finished", {
      tween: this
    });

    this.trigger("finish", {
      tween: this
    });

    this.finished = true;

  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Tween.prototype, PLAYGROUND.Events.prototype);


/* 

  Manager for easing effects (transition between various states).
 
  If `app` is provided the manager becomes application's manager
  for tween effects. The constructor inserts a `tween()` function
  in application for simplicity.
 
  Properties:
  - delta:
  - defaultEasing:
  - tweens: the list of active animations

*/

PLAYGROUND.TweenManager = function(app) {

  this.tweens = [];

  if (app) {
    this.app = app;
    this.app.tween = this.tween.bind(this);
  }

  this.delta = 0;

  this.app.on("step", this.step.bind(this));

};

PLAYGROUND.TweenManager.prototype = {

  defaultEasing: "128",

  /* TBD */

  circ: function(value) {

    return {
      type: "circ",
      value: value
    };

  },

  /* 

    Marks the tween for removing.
   
    The tween is actually removed in `step()` function.
   
    @param object the object associated with the tween
    @param safe if the tween located using `object` is `safe` then it is not removed.

  */

  discard: function(object, safe) {

    for (var i = 0; i < this.tweens.length; i++) {

      var tween = this.tweens[i];

      if (tween.context === object && tween !== safe) this.remove(tween);

    }

  },

  /* 

    Create a new tween.
   
    The tween is also added to internal list (you don't have to call
    `add()` yourself).
   
    @param context the object to associate with the new tween
    @returns a new PLAYGROUND.Tween object
  
  */

  tween: function(context) {

    var tween = new PLAYGROUND.Tween(this, context);

    this.add(tween);

    return tween;

  },

  /* 

    Called each frame to update logic.
   
    The function updates all active tweens and removes the ones
    tagged as such.
   
  */

  step: function(delta) {

    this.delta += delta;

    for (var i = 0; i < this.tweens.length; i++) {

      var tween = this.tweens[i];

      if (!tween.auto) continue;

      if (!tween._remove) tween.step(delta);

      if (tween._remove) this.tweens.splice(i--, 1);

    }

  },

  /* Add a tween to internal list. */

  add: function(tween) {

    tween._remove = false;

    var index = this.tweens.indexOf(tween);

    if (index === -1) this.tweens.push(tween);

  },

  /* Marks a tween for removing during next step(). */

  remove: function(tween) {

    if (tween._remove) return;

    tween._remove = true;

    tween.onremove();

  }

};

/* file: src/Atlases.js */

/** Extend Application object with a function to load any number of atlases
 *
 * Each atlas consists of a pair of image file and a json file
 *
 * The application is extended with an `atlases` associative array.
 * The keys are file keys generated by `getAssetEntry()` and
 * values have following structure:
 * - image: the image object
 * - frames: array of objects:
 *     - region: [x, y, w, h],
 *     - offset: [x, y],
 *     - width
 *     - height
 *
 * Default renderer can draw such an atlas using
 * `drawAtlasFrame(atlas, frame, x, y)` function.
 *
 * Reference: http://playgroundjs.com/playground-atlases
 */
PLAYGROUND.Application.prototype.loadAtlases = function() {

  for (var i = 0; i < arguments.length; i++) {

    var arg = arguments[i];

    /* polymorphism at its finest */

    if (typeof arg === "object") {

      for (var key in arg) this.loadAtlases(arg[key]);

    } else {

      /* if argument is not an object/array let's try to load it */

      this._loadAtlas(arg)

    }
  }

};

/** Alias for `loadAtlases()`. */
PLAYGROUND.Application.prototype.loadAtlas = function() {

  return this.loadAtlases.apply(this, arguments);

};

/** Load a single atlas (internal). */
PLAYGROUND.Application.prototype._loadAtlas = function(filename) {

  var entry = this.getAssetEntry(filename, "atlases", "png");

  this.loader.add(entry.url);

  var atlas = this.atlases[entry.key] = {};

  var image = atlas.image = new Image;

  image.addEventListener("load", function() {
    loader.success(entry.url);
  });

  image.addEventListener("error", function() {
    loader.error(entry.url);
  });

  image.src = entry.url;

  /* data */

  var request = new XMLHttpRequest();

  request.open("GET", entry.path + ".json", true);

  this.loader.add(entry.path + ".json");

  var loader = this.loader;

  request.onload = function() {

    var data = JSON.parse(this.response);

    atlas.frames = [];

    for (var i = 0; i < data.frames.length; i++) {
      var frame = data.frames[i];

      atlas.frames.push({
        region: [frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h],
        offset: [frame.spriteSourceSize.x || 0, frame.spriteSourceSize.y || 0],
        width: frame.sourceSize.w,
        height: frame.sourceSize.h
      });
    }

    loader.success(entry.path + ".json");

  }

  request.send();
};

/* file: src/Fonts.js */

/** Load a font.
 * @deprecated Use `Application.loadFont()` instead.
 */
PLAYGROUND.Application.prototype.loadFontOld = function(name) {

  var styleNode = document.createElement("style");
  styleNode.type = "text/css";

  var formats = {
    "woff": "woff",
    "ttf": "truetype"
  };

  var sources = "";

  for (var ext in formats) {
    var type = formats[ext];
    sources += " url(\"fonts/" + name + "." + ext + "\") format('" + type + "');"
  }

  styleNode.textContent = "@font-face { font-family: '" + name + "'; src: " + sources + " }";

  document.head.appendChild(styleNode);

  var layer = cq(32, 32);

  layer.font("10px Testing");
  layer.fillText(16, 16, 16).trim();

  var width = layer.width;
  var height = layer.height;

  this.loader.add("font " + name);

  var self = this;

  function check() {

    var layer = cq(32, 32);

    layer.font("10px " + name).fillText(16, 16, 16);
    layer.trim();

    if (layer.width !== width || layer.height !== height) {

      self.loader.ready("font " + name);

    } else {

      setTimeout(check, 250);

    }

  };

  check();

};

/* file: src/DefaultState.js */

/** State used while initializing the application */
PLAYGROUND.DefaultState = {

};

/* file: src/LoadingScreen.js */

/** Basic loading screen using DOM
 *
 * Loading screen is a state like any other except that
 * it is loaded from `PLAYGROUND.LoadingScreen`. To override
 * simply define a `PLAYGROUND.LoadingScreen` in your code after
 * playground.js was imported.
 */
PLAYGROUND.LoadingScreen = {

  logoRaw: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAASBAMAAADPiN0xAAAAGFBMVEUAAQAtLixHSUdnaGaJioimqKXMzsv7/fr5shgVAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB98EAwkeA4oQWJ4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB9klEQVQ4y72UvW+rMBDAz+FrpVKrrFmesmapWNOlrKjSe1kZ+uoVAvj+/frujG1SaJcqJwU7voOf7xMQzQmsIDi5NPTMsLRntH3U+F6SAZo3NlCvcgBFJz8o+vkDiE63lI95Y/UmpinsZWkgJWJiDbAVQ16htptxSTNloIlugwaw001Ey3ASF3so6L1qLNXzQS5S0UGKL/CI5wWNriE0UH9Yty37LqIVg+wsqu7Ix0MwVBSF/dU+jv2SNnma021LEdPqVnMeU3xAu0kXcSGjmq7Ox4E2Wn88LZ2+EFj3avjixzai6VPVyuYveZLHF2XfdDnvAq27DIHGuq+0DJFsE30OtB1KqOwd8Dr7PcM4b+jfj2g5lp4WyntBK66qua3JzEA+uXJpwH/NlVuzRVPY/kTLB2mjuN+KwdZ8FOy8j2gDbEUSqumnSCY4lf4ibq3IhVM4ycZQRnv+zFqVdJQVn6BxvUqebGpuaNo3sZxwBzjajiMZOoBiwyVF+kCr+nUaJOaGpnAeRPPJZTr4FqmHRXcneEo4DqQ/ftfdnLeDrUAME8xWKPeKCwW6YkEpXfs3p1EWJhdcUAYP0TI/uYaV8cgjwBovaeyWwji2T9rTFIdS/cP/MnkTLRUWxgNNZVin7bT5fqT9miDcUVJzR1gRpfIONMmulU+5Qqr6zXAUqAAAAABJRU5ErkJggg==",

  create: function() {

    var self = this;

    this.logo = new Image;

    this.logo.addEventListener("load", function() {
      self.ready = true;
      self.createElements();
    });

    this.logo.src = this.logoRaw;

    this.background = "#000";

    if (window.getComputedStyle) {
      this.background = window.getComputedStyle(document.body).backgroundColor || "#000";
    }


  },

  enter: function() {

    this.current = 0;

  },

  leave: function() {

    this.locked = true;

    this.animation = this.app.tween(this)
      .to({
        current: 1
      }, 0.5);

  },

  step: function(delta) {

    if (this.locked) {

      if (this.animation.finished) {
        this.locked = false;
        this.wrapper.parentNode.removeChild(this.wrapper);
      }

    } else {

      this.current = this.current + Math.abs(this.app.loader.progress - this.current) * delta;
    }

  },

  createElements: function() {

    this.width = window.innerWidth * 0.6 | 0;
    this.height = window.innerHeight * 0.1 | 0;

    this.wrapper = document.createElement("div");
    this.wrapper.style.width = this.width + "px";
    this.wrapper.style.height = this.height + "px";
    this.wrapper.style.background = "#000";
    this.wrapper.style.border = "4px solid #fff";
    this.wrapper.style.position = "absolute";
    this.wrapper.style.left = (window.innerWidth / 2 - this.width / 2 | 0) + "px";
    this.wrapper.style.top = (window.innerHeight / 2 - this.height / 2 | 0) + "px";
    this.wrapper.style.zIndex = 100;

    this.app.container.appendChild(this.wrapper);

    this.progressBar = document.createElement("div");
    this.progressBar.style.width = "0%";
    this.progressBar.style.height = this.height + "px";
    this.progressBar.style.background = "#fff";

    this.wrapper.appendChild(this.progressBar);

  },


  render: function() {

    if (!this.ready) return;

    this.progressBar.style.width = (this.current * 100 | 0) + "%";


  }

};

/* file: src/Pool.js */

(function() {

  var lib = {

    pools: new Map,

    resetMethod: "reset",

    getPool: function(constructor) {

      var pool = this.pools.get(constructor);

      if (!pool) {

        this.pools.set(constructor, []);

        return this.getPool(constructor);

      }

      return pool;

    },

    pull: function(constructor, args) {

      var pool = this.getPool(constructor);

      if (!pool.length) {

        for (var i = 0; i < 10; i++) {

          pool.push(new constructor());

        }

      }

      var result = pool.pop();

      result[this.resetMethod](args);

      return result;

    },

    push: function(object) {

      var pool = this.getPool(object.constructor);

      pool.push(object);

    }

  };

  /* API */

  var api = function() {

    if (typeof arguments[0] === "function") {

      return lib.pull(arguments[0], arguments[1]);

    } else {

      return lib.push(arguments[0]);

    }

  };

  api.pull = lib.pull.bind(lib);
  api.push = lib.push.bind(lib);

  PLAYGROUND.Application.prototype.pool = api;

})();