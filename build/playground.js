

/* file: license.txt */

/*     

  PlaygroundJS r11 (WIP)
  
  http://playgroundjs.com
  
  (c) 2012-2016 http://rezoner.net
  
  Playground may be freely distributed under the MIT license.

  latest major changes:

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

  Ease 1.0
  
  http://canvasquery.com
  
  (c) 2015 by Rezoner - http://rezoner.net

  `ease` may be freely distributed under the MIT license.

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

    /* 
      
      Cubic-spline interpolation by Ivan Kuckir

      http://blog.ivank.net/interpolation-with-cubic-splines.html

      With slight modifications by Morgan Herlocker

      https://github.com/morganherlocker/cubic-spline

    */

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

PLAYGROUND = {};

function playground(args) {

  return new PLAYGROUND.Application(args);

};

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

  this.container.style.background = this.background;

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

  /* video recorder */

  // this.videoRecorder = new PLAYGROUND.VideoRecorder(this);

  /* sound */

  PLAYGROUND.Sound(this);

  /* window resize */

  this.resizelistener = PLAYGROUND.Utils.throttle(this.handleResize.bind(this), 100);

  window.addEventListener("resize", this.resizelistener);

  /* assets containers */

  this.images = {};
  this.atlases = {};
  this.data = {};

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
      fonts: "fonts/"
    },
    offsetX: 0,
    offsetY: 0,
    skipEvents: false,
    disabledUntilLoaded: true
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

  getAssetEntry: function(path, folder, defaultExtension) {

    /* translate folder according to user provided paths
       or leave it as is */

    var folder = this.paths[folder] || (folder + "/");

    var fileinfo = path.match(/(.*)\..*/);
    var key = fileinfo ? fileinfo[1] : path;

    var temp = path.split(".");
    var basename = path;

    if (temp.length > 1) {
      var ext = temp.pop();
      path = temp.join(".");
    } else {
      var ext = defaultExtension;
      basename += "." + defaultExtension;
    }

    return {
      key: key,
      url: this.paths.base + folder + basename,
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

  /** Responds to windows resize event. */

  handleResize: function() {

    this.updateSize();

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

    function promise(success, fail) {

      var request = new XMLHttpRequest();

      var app = this;

      request.open("GET", url, true);

      request.onload = function(event) {

        var xhr = event.target;

        if (xhr.status !== 200 && xhr.status !== 0) {

          return fail(new Error("Failed to get " + url));

        }

        success(xhr);

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

    this.request(entry.url).then(processData);

    function processData(request) {

      var extend = entry.key.indexOf("/") > -1;

      if (entry.ext === "json") {

        var data = JSON.parse(request.responseText);

        if (extend) {

          var key = entry.key.split("/")[0];

          if (!app.data[key]) app.data[key] = {};

          PLAYGROUND.Utils.extend(app.data[key], data);

        } else {

          if (!app.data[entry.key]) app.data[entry.key] = {};

          PLAYGROUND.Utils.defaults(app.data[entry.key], data);

        }

      } else {

        if (extend) {

          var key = entry.key.split("/")[0];

          if (!app.data[key]) app.data[key] = "";

          app.data[entry.key] += request.responseText;

        } else {

          app.data[entry.key] = request.responseText;

        }

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

        app.loader.add(entry.path);

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

          var base = cq(100, 32).font("14px somethingrandom").fillStyle("#fff").textBaseline("top").fillText("lorem ipsum dolores sit", 0, 4);
          var test = cq(100, 32).font("14px '" + name + "'").fillStyle("#fff").textBaseline("top").fillText("lorem ipsum dolores sit", 0, 4);

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

/** Game loop.
 *
 * The application object is updated with following properties:
 * - lifetime: number of seconds since the game loop was entered
 * - opcost: seconds last opperation took
 * - ops: opperations per second.
 *
 * The game loop requests updats using standard
 * `requestAnimationFrame()` function. On each callback
 * time-related values are updated, logical update is requested using
 * `step()` and display update using `render()`.
 *
 * A number of (global) events are raised on behalf of the application:
 * - step: update the logic on each frame
 * - prerender: first step in refreshing the screen
 * - render: second step in refreshing the screen
 * - postrender: third step in refreshing the screen
 */
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

    step(dt);
    render(dt);

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
    12: "up",
    13: "down",
    14: "left",
    15: "right"
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

      for (var h = 12; h <= 15; h++) {

        // if (!buttons[h]) 

        buttons[h] = {
          pressed: false,
          value: 0
        };
      }

      var previous = this[i];

      /* axes (sticks) to buttons */

      if (current.axes) {

        if (Math.abs(current.axes[0]) > 0.01) {
          if (current.axes[0] < 0) buttons[14].pressed = true;
          if (current.axes[0] > 0) buttons[15].pressed = true;
        }

        if (Math.abs(current.axes[1]) > 0.01) {
          if (current.axes[1] < 0) buttons[12].pressed = true;
          if (current.axes[1] > 0) buttons[13].pressed = true;
        }

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

          if (stickA) this.gamepadmoveEvent.a = previous.sticks[0];
          else this.gamepadmoveEvent.a = false;

          if (stickB) this.gamepadmoveEvent.b = previous.sticks[1];
          else this.gamepadmoveEvent.b = false;

          this.gamepadmoveEvent.gamepad = i;
          this.trigger("gamepadmove", this.gamepadmoveEvent);

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
  this.any = false;

  this.keydownlistener = this.keydown.bind(this);
  this.keyuplistener = this.keyup.bind(this);
  this.keypresslistener = this.keypress.bind(this);

  document.addEventListener("keydown", this.keydownlistener);
  document.addEventListener("keyup", this.keyuplistener);
  document.addEventListener("keypress", this.keypresslistener);

  this.keydownEvent = {};
  this.keyupEvent = {};

  this.preventDefault = true;

  this.enabled = true;

  this.app.on("kill", this.kill.bind(this));

};

PLAYGROUND.Keyboard.prototype = {

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
    221: "closebraket",
    222: "singlequote"
  },

  keypress: function(e) {

  },

  bypassKeys: ["f12", "f5", "ctrl", "alt", "shift"],

  keydown: function(e) {

    if (!this.enabled) return;

    if (e.which >= 48 && e.which <= 90) var keyName = String.fromCharCode(e.which).toLowerCase();
    else var keyName = this.keycodes[e.which];

    if (this.keys[keyName]) return;

    this.any++;

    this.keydownEvent.key = keyName;
    this.keydownEvent.original = e;

    this.keys[keyName] = true;

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

  },

  keyup: function(e) {

    if (!this.enabled) return;

    if (e.which >= 48 && e.which <= 90) var keyName = String.fromCharCode(e.which).toLowerCase();
    else var keyName = this.keycodes[e.which];

    this.any--;

    this.keyupEvent.key = keyName;
    this.keyupEvent.original = e;

    this.keys[keyName] = false;

    this.trigger("keyup", this.keyupEvent);

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

  app.on("touchstart", this.touchstart, this);
  app.on("touchend", this.touchend, this);
  app.on("touchmove", this.touchmove, this);

  app.on("mousemove", this.mousemove, this);
  app.on("mousedown", this.mousedown, this);
  app.on("mouseup", this.mouseup, this);
  app.on("mousewheel", this.mousewheel, this);

  this.pointers = app.pointers = {};

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

    this.app.emitGlobalEvent("pointermove", e);

  },

  mousemove: function(e) {

    e.mouse = true;

    this.updatePointer(e);

    this.pointermove(e);

    this.app.emitGlobalEvent("pointermove", e);

  },

  mousedown: function(e) {

    e.mouse = true;

    this.app.emitGlobalEvent("pointerdown", e);

    this.pointerdown(e);

  },

  mouseup: function(e) {

    e.mouse = true;

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

/** 

  Mouse related functionality.

  Properties:
  - app: the main application object
  - element: the DOM element we're handling events for
  - preventContextMenu: don't show default menu
  - mousemoveEvent: last mouse move event is cached in this
      - id, identifier: event id for compatibility with touches
      - x, y: the absolute position in pixels
      - original: original event
      - mozMovementX, mozMovementY: change in position from previous event
  - mousedownEvent and mouseupEvent: last button press or release event
      - id, identifier: event id for compatibility with touches
      - x, y: the absolute position in pixels
      - original: original event
      - button: one of `left`, `middle`, `right`
  - x, y: alias for mousemoveEvent.x, .y
  Events generated by this object (PLAYGROUND.Application.mouseToTouch
  decides the variant to trigger):
  - touchmove or mousemove: change in position
  - touchstart or mousedown: action starts
  - touchend or mouseup: action ends
  - mousewheel: wheel event
 
  Reference: http://playgroundjs.com/playground-mouse

 */

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

  mousemove: PLAYGROUND.Utils.throttle(function(e) {

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

  }, 16),

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

  },


  enableMousewheel: function() {

    var eventNames = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
    var callback = this.mousewheel.bind(this);
    var self = this;

    for (var i = eventNames.length; i;) {

      self.element.addEventListener(eventNames[--i], PLAYGROUND.Utils.throttle(function(event) {

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

      }, 40), false);
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

  if (audioContext) {

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

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){(function(global){"use strict";var AudioContext=global.AudioContext||global.webkitAudioContext;var StereoPannerNode=require("stereo-panner-node");if(AudioContext&&!AudioContext.prototype.createStereoPanner){AudioContext.prototype.createStereoPanner=function(){return new StereoPannerNode(this)}}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"stereo-panner-node":4}],2:[function(require,module,exports){"use strict";var WS_CURVE_SIZE=4096;var curveL=new Float32Array(WS_CURVE_SIZE);var curveR=new Float32Array(WS_CURVE_SIZE);(function(){for(var i=0;i<WS_CURVE_SIZE;i++){curveL[i]=Math.cos(i/WS_CURVE_SIZE*Math.PI*.5);curveR[i]=Math.sin(i/WS_CURVE_SIZE*Math.PI*.5)}})();module.exports={L:curveL,R:curveR}},{}],3:[function(require,module,exports){(function(global){"use strict";var curve=require("./curve");function StereoPannerImpl(audioContext){this.audioContext=audioContext;this.inlet=audioContext.createChannelSplitter(2);this._pan=audioContext.createGain();this.pan=this._pan.gain;this._wsL=audioContext.createWaveShaper();this._wsR=audioContext.createWaveShaper();this._L=audioContext.createGain();this._R=audioContext.createGain();this.outlet=audioContext.createChannelMerger(2);this.inlet.channelCount=2;this.inlet.channelCountMode="explicit";this._pan.gain.value=0;this._wsL.curve=curve.L;this._wsR.curve=curve.R;this._L.gain.value=0;this._R.gain.value=0;this.inlet.connect(this._L,0);this.inlet.connect(this._R,1);this._L.connect(this.outlet,0,0);this._R.connect(this.outlet,0,1);this._pan.connect(this._wsL);this._pan.connect(this._wsR);this._wsL.connect(this._L.gain);this._wsR.connect(this._R.gain);this._isConnected=false;this._dc1buffer=null;this._dc1=null}StereoPannerImpl.prototype.connect=function(destination){var audioContext=this.audioContext;if(!this._isConnected){this._isConnected=true;this._dc1buffer=audioContext.createBuffer(1,2,audioContext.sampleRate);this._dc1buffer.getChannelData(0).set([1,1]);this._dc1=audioContext.createBufferSource();this._dc1.buffer=this._dc1buffer;this._dc1.loop=true;this._dc1.start(audioContext.currentTime);this._dc1.connect(this._pan)}global.AudioNode.prototype.connect.call(this.outlet,destination)};StereoPannerImpl.prototype.disconnect=function(){var audioContext=this.audioContext;if(this._isConnected){this._isConnected=false;this._dc1.stop(audioContext.currentTime);this._dc1.disconnect();this._dc1=null;this._dc1buffer=null}global.AudioNode.prototype.disconnect.call(this.outlet)};module.exports=StereoPannerImpl}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./curve":2}],4:[function(require,module,exports){"use strict";var StereoPannerImpl=require("./stereo-panner-impl");function StereoPanner(audioContext){var impl=new StereoPannerImpl(audioContext);Object.defineProperties(impl.inlet,{pan:{value:impl.pan,enumerable:true},connect:{value:function(node){return impl.connect(node)}},disconnect:{value:function(){return impl.disconnect()}}});return impl.inlet}module.exports=StereoPanner},{"./stereo-panner-impl":3}]},{},[1]);


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

  this.output = this.gainNode;

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

        nodes[0].connect(nodes[1]);
        nodes[1].connect(nodes[2]);
        nodes[2].connect(this.output);
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

    var url = "sounds/" + file + "." + this.audioFormat;

    var loader = this.app.loader;

    this.app.loader.add(url);

    var audio = this.samples[file] = new Audio;

    audio.addEventListener("canplay", function() {
      loader.success(url);
    });

    audio.addEventListener("error", function() {
      loader.error(url);
    });

    audio.src = url;

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

  element.addEventListener("touchmove", this.touchmovelistener);
  element.addEventListener("touchstart", this.touchstartlistener);
  element.addEventListener("touchend", this.touchendlistener);

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

    e.preventDefault();

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

    e.preventDefault();

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

    e.preventDefault();

  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Touch.prototype, PLAYGROUND.Events.prototype);

/* file: src/Tween.js */

PLAYGROUND.Tween = function(manager, context) {

  if (!context) debugger;

  PLAYGROUND.Events.call(this);

  this.manager = manager;
  this.context = context;

  PLAYGROUND.Utils.extend(this, {

    actions: [],
    index: -1,
    prevEasing: "045",
    prevDuration: 0.5

  });

  this.current = false;

};

PLAYGROUND.Tween.prototype = {

  /* 

    Add an action to the end of the list
     
    @param properties
    @param duration in miliseconds (optional, default is 0.5)
    @param easing (optional, default is 045)
    @returns `this` object so that calls can be chained.

  */

  add: function(properties, duration, easing) {

    if (typeof duration !== "undefined") this.prevDuration = duration;
    else duration = 0.5;

    if (easing) this.prevEasing = easing;
    else easing = "045";

    this.actions.push([properties, duration, easing]);

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

      for (i = 0; i < this.keys.length; i++) {

        var key = this.keys[i];
        var value = this.context[key];

        if (typeof properties[key] === "number") {

          this.before.push(value);
          this.change.push(properties[key] - value);
          this.types.push(0);

        } else if (typeof properties[key] === "string" && properties[key].indexOf("rad") > -1) {

          this.before.push(value);
          this.change.push(PLAYGROUND.Utils.circWrappedDistance(value, parseFloat(properties[key])));
          this.types.push(2);

        } else {

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

/* file: src/lib/CanvasQuery.js */

/*     

  Canvas Query r8
  
  http://canvasquery.com
  
  (c) 2012-2016 http://rezoner.net
  
  Canvas Query may be freely distributed under the MIT license.

  r8

  + improved matchPalette performance
  + defaultFont

  r7

  + more accurate fontHeight()
  + fillText respects no antialiasing when using pixel font
  + textBaseline("top") consistent among browsers
  + align state is added to the stack
  + new canvases are pulled from the pool  
  + filter (experimetnal)

  r6

  + ImageBitmap support
  + drawImageCentered
  + drawRegionCentered
  + default textBaseline
  + resizeBounds

  r5

  ! fixed: leaking arguments in fastApply bailing out optimization
  + cacheText
  + compare
  + checkerboard

*/


(function() {

  var COCOONJS = false;

  var Canvas = window.HTMLCanvasElement;
  var orgImage = window.Image;
  var Image = window.HTMLImageElement;
  var ImageBitmap = window.ImageBitmap || window.HTMLImageElement;
  var COCOONJS = navigator.isCocoonJS;

  var cq = function(selector) {

    if (arguments.length === 0) {

      var canvas = cq.pool();

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

    } else if (typeof selector === "string") {

      var canvas = document.querySelector(selector);

    } else if (typeof selector === "number") {

      var canvas = cq.pool();

      canvas.width = arguments[0];
      canvas.height = arguments[1];

    } else if (selector instanceof Image) {

      var canvas = cq.pool();

      canvas.width = selector.width;
      canvas.height = selector.height;
      canvas.getContext("2d").drawImage(selector, 0, 0);

    } else if (selector instanceof ImageBitmap) {

      canvas.width = selector.width;
      canvas.height = selector.height;
      canvas.getContext("2d").drawImage(selector, 0, 0);

    } else if (selector instanceof cq.Layer) {

      return selector;

    } else {

      var canvas = selector;

    }

    return new cq.Layer(canvas);

  };

  cq.lineSpacing = 1.0;
  cq.defaultFont = "";
  cq.textBaseline = "alphabetic";
  cq.matchPalettePrecision = 10;

  cq.palettes = {

    db16: ["#140c1c", "#442434", "#30346d", "#4e4a4e", "#854c30", "#346524", "#d04648", "#757161", "#597dce", "#d27d2c", "#8595a1", "#6daa2c", "#d2aa99", "#6dc2ca", "#dad45e", "#deeed6"],
    db32: ["#000000", "#222034", "#45283c", "#663931", "#8f563b", "#df7126", "#d9a066", "#eec39a", "#fbf236", "#99e550", "#6abe30", "#37946e", "#4b692f", "#524b24", "#323c39", "#3f3f74", "#306082", "#5b6ee1", "#639bff", "#5fcde4", "#cbdbfc", "#ffffff", "#9badb7", "#847e87", "#696a6a", "#595652", "#76428a", "#ac3232", "#d95763", "#d77bba", "#8f974a", "#8a6f30"],
    c64: ["#000000", "#6a5400", "#68ae5c", "#8a8a8a", "#adadad", "#636363", "#c37b75", "#c9d684", "#ffffff", "#984b43", "#a3e599", "#79c1c8", "#9b6739", "#9b51a5", "#52429d", "#8a7bce"],
    gameboy: ["#0f380f", "#306230", "#8bac0f", "#9bbc0f"],
    sega: ["#000000", "#555500", "#005500", "#555555", "#55aa00", "#550000", "#aaffaa", "#aaaaaa", "#ff5555", "#005555", "#550055", "#aaaa55", "#ffffaa", "#aa5555", "#ffaa55", "#ffff55", "#ffffff", "#ffaaaa", "#000055", "#55aaaa", "#aa0000", "#ff5500", "#ffaa00", "#aa5500", "#ff0000", "#ffaaff", "#aa55aa", "#aaaa00", "#aaff00", "#aaaaff", "#5555aa", "#aaffff"],
    cga: ["#000000", "#ff5555", "#55ff55", "#ffff55"],
    nes: ["#7C7C7C", "#0000FC", "#0000BC", "#4428BC", "#940084", "#A80020", "#A81000", "#881400", "#503000", "#007800", "#006800", "#005800", "#004058", "#000000", "#000000", "#000000", "#BCBCBC", "#0078F8", "#0058F8", "#6844FC", "#D800CC", "#E40058", "#F83800", "#E45C10", "#AC7C00", "#00B800", "#00A800", "#00A844", "#008888", "#000000", "#000000", "#000000", "#F8F8F8", "#3CBCFC", "#6888FC", "#9878F8", "#F878F8", "#F85898", "#F87858", "#FCA044", "#F8B800", "#B8F818", "#58D854", "#58F898", "#00E8D8", "#787878", "#000000", "#000000", "#FCFCFC", "#A4E4FC", "#B8B8F8", "#D8B8F8", "#F8B8F8", "#F8A4C0", "#F0D0B0", "#FCE0A8", "#F8D878", "#D8F878", "#B8F8B8", "#B8F8D8", "#00FCFC", "#F8D8F8", "#000000"],

  };

  /*

    cq.loadImages();

    cq.run(function(){

    });

  */

  /* Micro framework */

  cq.images = {};
  cq.atlases = {};
  cq.loaderscount = 0;
  cq.loadercallback = function() {

    cq.loaderscount--;

  };

  cq.loadImages = function(keys) {

    var promises = [];

    for (var key in keys) {

      cq.loaderscount++;

      var path = keys[key];

      var image = new orgImage();

      cq.images[key] = image;
      cq.loaderscount++;

      var promise = new Promise(function(resolve, reject) {

        image.addEventListener("load", function() {

          cq.loadercallback();

          resolve();

        });

        image.addEventListener("error", function() {

          throw ("unable to load " + this.src);

        });

      });

      image.src = path;

    }

    return Promise.all(promises);

  };

  cq.loadAtlases = function() {

  };

  /* WIP */

  cq.run = function(callback) {

    var lasTick = Date.now();

    var frame = function() {

      requestAnimationFrame(frame);

      var dt = Date.now() - lastTick;
      lastTick = Date.now();

      if (cq.loaderscount === 0) callback(dt);

    }

    requestAnimationFrame(frame);

  };

  /* WIP */

  cq.viewport = function() {

    if (!cq.layer) {

      cq.layer = cq();
      cq.layer.appendTo(document.body);

    }

  };

  /* WIP */
  cq.mouse = function(callback) {

    document.addEventListener('mousedown', function(e) {

      console.log(e);

    });

  }

  cq.cocoon = function(selector) {
    if (arguments.length === 0) {
      var canvas = cq.createCocoonCanvas(window.innerWidth, window.innerHeight);
      window.addEventListener("resize", function() {});
    } else if (typeof selector === "string") {
      var canvas = document.querySelector(selector);
    } else if (typeof selector === "number") {
      var canvas = cq.createCocoonCanvas(arguments[0], arguments[1]);
    } else if (selector instanceof Image) {
      var canvas = cq.createCocoonCanvas(selector);
    } else if (selector instanceof cq.Layer) {
      return selector;
    } else {
      var canvas = selector;
    }

    return new cq.Layer(canvas);
  }


  cq.extend = function() {
    for (var i = 1; i < arguments.length; i++) {
      for (var j in arguments[i]) {
        arguments[0][j] = arguments[i][j];
      }
    }

    return arguments[0];
  };

  cq.augment = function() {
    for (var i = 1; i < arguments.length; i++) {
      _.extend(arguments[0], arguments[i]);
      arguments[i](arguments[0]);
    }
  };

  cq.distance = function(x1, y1, x2, y2) {
    if (arguments.length > 2) {
      var dx = x1 - x2;
      var dy = y1 - y2;

      return Math.sqrt(dx * dx + dy * dy);
    } else {
      return Math.abs(x1 - y1);
    }
  };

  /* fast.js */

  cq.fastApply = function(subject, thisContext, args) {

    switch (args.length) {
      case 0:
        return subject.call(thisContext);
      case 1:
        return subject.call(thisContext, args[0]);
      case 2:
        return subject.call(thisContext, args[0], args[1]);
      case 3:
        return subject.call(thisContext, args[0], args[1], args[2]);
      case 4:
        return subject.call(thisContext, args[0], args[1], args[2], args[3]);
      case 5:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4]);
      case 6:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
      case 8:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
      case 9:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
      default:
        return subject.apply(thisContext, args);
    }

  };

  cq.extend(cq, {

    smoothing: true,

    blend: function(below, above, mode, mix) {

      if (typeof mix === "undefined") mix = 1;

      var below = cq(below);
      var mask = below.clone();
      var above = cq(above);

      below.save();
      below.globalAlpha(mix);
      below.globalCompositeOperation(mode);
      below.drawImage(above.canvas, 0, 0);
      below.restore();

      mask.save();
      mask.globalCompositeOperation("source-in");
      mask.drawImage(below.canvas, 0, 0);
      mask.restore();

      return mask;
    },

    matchColor: function(color, palette) {
      var rgbPalette = [];

      for (var i = 0; i < palette.length; i++) {
        rgbPalette.push(cq.color(palette[i]));
      }

      var imgData = cq.color(color);

      var difList = [];
      for (var j = 0; j < rgbPalette.length; j++) {
        var rgbVal = rgbPalette[j];
        var rDif = Math.abs(imgData[0] - rgbVal[0]),
          gDif = Math.abs(imgData[1] - rgbVal[1]),
          bDif = Math.abs(imgData[2] - rgbVal[2]);
        difList.push(rDif + gDif + bDif);
      }

      var closestMatch = 0;
      for (var j = 0; j < palette.length; j++) {
        if (difList[j] < difList[closestMatch]) {
          closestMatch = j;
        }
      }

      return palette[closestMatch];
    },

    temp: function(width, height) {

      if (!this.tempLayer) {

        this.tempLayer = cq(1, 1);

      }

      if (width instanceof Image || width instanceof ImageBitmap) {
        this.tempLayer.width = width.width;
        this.tempLayer.height = width.height;
        this.tempLayer.context.drawImage(width, 0, 0);
      } else if (width instanceof Canvas) {
        this.tempLayer.width = width.width;
        this.tempLayer.height = width.height;
        this.tempLayer.context.drawImage(width, 0, 0);
      } else if (width instanceof CanvasQuery.Layer) {
        this.tempLayer.width = width.width;
        this.tempLayer.height = width.height;
        this.tempLayer.context.drawImage(width.canvas, 0, 0);
      } else {
        this.tempLayer.width = width;
        this.tempLayer.height = height;
      }

      return this.tempLayer;
    },

    wrapValue: function(value, min, max) {
      if (value < min) return max + (value % max);
      if (value >= max) return value % max;
      return value;
    },

    limitValue: function(value, min, max) {
      return value < min ? min : value > max ? max : value;
    },

    mix: function(a, b, amount) {
      return a + (b - a) * amount;
    },

    hexToRgb: function(hex) {
      if (hex.length === 7) return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
      else return ['0x' + hex[1] + hex[1] | 0, '0x' + hex[2] + hex[2] | 0, '0x' + hex[3] + hex[3] | 0];
    },

    rgbToHex: function(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7);
    },

    extractCanvas: function(o) {

      if (o.canvas) return o.canvas;
      else return o;

    },

    compare: function(a, b) {

      a = this.extractCanvas(a);
      b = this.extractCanvas(b);

      a = a.getContext("2d").getImageData(0, 0, a.width, a.height).data;
      b = b.getContext("2d").getImageData(0, 0, b.width, b.height).data;

      if (a.length !== b.length) return false;

      for (var i = 0; i < a.length; i++) {

        if (a[i] !== b[i]) return false;

      }

      return true;

    },

    /* author: http://mjijackson.com/ */

    rgbToHsl: function(r, g, b) {

      if (r instanceof Array) {
        b = r[2];
        g = r[1];
        r = r[0];
      }

      r /= 255, g /= 255, b /= 255;
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return [h, s, l];
    },

    /* author: http://mjijackson.com/ */

    hue2rgb: function(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    },

    hslToRgb: function(h, s, l) {
      var r, g, b;

      if (s == 0) {
        r = g = b = l; // achromatic
      } else {

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = this.hue2rgb(p, q, h + 1 / 3);
        g = this.hue2rgb(p, q, h);
        b = this.hue2rgb(p, q, h - 1 / 3);
      }

      return [r * 255 | 0, g * 255 | 0, b * 255 | 0];
    },

    rgbToHsv: function(r, g, b) {
      if (r instanceof Array) {
        b = r[2];
        g = r[1];
        r = r[0];
      }

      r = r / 255, g = g / 255, b = b / 255;
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      var h, s, v = max;

      var d = max - min;
      s = max == 0 ? 0 : d / max;

      if (max == min) {
        h = 0; // achromatic
      } else {
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return [h, s, v];
    },

    hsvToRgb: function(h, s, v) {
      var r, g, b;

      var i = Math.floor(h * 6);
      var f = h * 6 - i;
      var p = v * (1 - s);
      var q = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          r = v, g = t, b = p;
          break;
        case 1:
          r = q, g = v, b = p;
          break;
        case 2:
          r = p, g = v, b = t;
          break;
        case 3:
          r = p, g = q, b = v;
          break;
        case 4:
          r = t, g = p, b = v;
          break;
        case 5:
          r = v, g = p, b = q;
          break;
      }

      return [r * 255, g * 255, b * 255];
    },

    color: function() {
      var result = new cq.Color();
      result.parse(arguments[0], arguments[1]);
      return result;
    },

    poolArray: [],

    pool: function() {

      if (!this.poolArray.length) {
        for (var i = 0; i < 100; i++) {
          this.poolArray.push(this.createCanvas(1, 1));
        }
      }

      return this.poolArray.pop();

    },

    reuse: function(object) {

      return this.recycle(object);

    },

    recycle: function(object) {

      if (object instanceof CanvasQuery.Layer) {

        this.poolArray.push(object.canvas);

      } else {

        this.poolArray.push(object);

      }

    },

    setContextSmoothing: function(context, smoothing) {

      context.mozImageSmoothingEnabled = smoothing;
      context.msImageSmoothingEnabled = smoothing;
      context.webkitImageSmoothingEnabled = smoothing;
      context.imageSmoothingEnabled = smoothing;

    },

    createCanvas: function(width, height) {

      var result = document.createElement("canvas");

      if (arguments[0] instanceof Image || arguments[0] instanceof Canvas || arguments[0] instanceof ImageBitmap) {

        var image = arguments[0];

        result.width = image.width;
        result.height = image.height;

        result.getContext("2d").drawImage(image, 0, 0);

      } else {

        result.width = width;
        result.height = height;

      }

      return result;

    },

    createCocoonCanvas: function(width, height) {

      var result = document.createElement("screencanvas");

      if (arguments[0] instanceof Image) {
        var image = arguments[0];
        result.width = image.width;
        result.height = image.height;
        result.getContext("2d").drawImage(image, 0, 0);
      } else {
        result.width = width;
        result.height = height;
      }

      return result;

    },

    createImageData: function(width, height) {

      return cq.createCanvas(width, height).getContext("2d").createImageData(width, height);

    }

  });

  cq.Layer = function(canvas) {

    this.context = canvas.getContext("2d");
    this.canvas = canvas;
    this.prevAlignX = [];
    this.prevAlignY = [];
    this.alignX = 0;
    this.alignY = 0;
    this.aligned = false;
    this.update();

  };

  cq.Layer.prototype = {

    constructor: cq.Layer,

    update: function() {

      var smoothing = cq.smoothing;

      if (typeof this.smoothing !== "undefined") smoothing = this.smoothing;

      this.context.mozImageSmoothingEnabled = smoothing;
      this.context.msImageSmoothingEnabled = smoothing;
      this.context.webkitImageSmoothingEnabled = smoothing;
      this.context.imageSmoothingEnabled = smoothing;

      if (cq.defaultFont) this.context.font = cq.defaultFont;

      this.context.textBaseline = cq.textBaseline;

      if (COCOONJS) Cocoon.Utils.setAntialias(smoothing);
    },

    appendTo: function(selector) {

      if (typeof selector === "object") {

        var element = selector;

      } else {

        var element = document.querySelector(selector);

      }

      element.appendChild(this.canvas);

      return this;
    },

    a: function(a) {

      if (arguments.length) {

        this.previousAlpha = this.globalAlpha();

        return this.globalAlpha(a);

      } else {

        return this.globalAlpha();

      }

    },

    ra: function() {

      return this.a(this.previousAlpha);

    },
    /*
        drawImage: function() {

          if (!this.alignX && !this.alignY) {
            this.context.call
          }

            return this;


        },

        restore: function() {
          this.context.restore();
          this.alignX = 0;
          this.alignY = 0;
        },
        */

    realign: function() {

      this.alignX = this.prevAlignX[this.prevAlignX.length - 1];
      this.alignY = this.prevAlignY[this.prevAlignY.length - 1];

      return this;

    },

    align: function(x, y) {

      if (typeof y === "undefined") y = x;

      this.alignX = x;
      this.alignY = y;

      return this;
    },


    /* save translate align rotate scale */

    stars: function(x, y, alignX, alignY, rotation, scaleX, scaleY) {

      if (typeof alignX === "undefined") alignX = 0.5;
      if (typeof alignY === "undefined") alignY = 0.5;
      if (typeof rotation === "undefined") rotation = 0;
      if (typeof scaleX === "undefined") scaleX = 1.0;
      if (typeof scaleY === "undefined") scaleY = scaleX;

      this.save();
      this.translate(x, y);
      this.align(alignX, alignY);
      this.rotate(rotation);
      this.scale(scaleX, scaleY);

      return this;
    },

    tars: function(x, y, alignX, alignY, rotation, scaleX, scaleY) {

      if (typeof alignX === "undefined") alignX = 0.5;
      if (typeof alignY === "undefined") alignY = 0.5;
      if (typeof rotation === "undefined") rotation = 0;
      if (typeof scaleX === "undefined") scaleX = 1.0;
      if (typeof scaleY === "undefined") scaleY = scaleX;

      this.translate(x, y);
      this.align(alignX, alignY);
      this.rotate(rotation);
      this.scale(scaleX, scaleY);

      return this;

    },

    fillText: function(text, x, y) {

      var webkitHack = !cq.smoothing && (this.fontHeight() <= 64) && ('WebkitAppearance' in document.documentElement.style);

      if (webkitHack) {

        var scale = 4;

        var canvas = cq.pool();
        var context = canvas.getContext("2d");

        context.font = this.context.font;

        var width = Math.ceil(context.measureText(text).width);
        var height = this.fontHeight();

        canvas.width = width * scale;
        canvas.height = height * scale;

        cq.setContextSmoothing(context, false);

        // context.fillStyle = "#fff"; 
        // context.fillRect(0,0,canvas.width, canvas.height);

        context.font = this.context.font;
        context.fillStyle = this.context.fillStyle;
        context.textBaseline = "top";

        context.scale(scale, scale);
        context.fillText(text, 0, -this.fontTop());

        if (this.context.textAlign === "center") x -= width * 0.5;
        else if (this.context.textAlign === "right") x -= width;

        this.drawImage(canvas, 0, 0, canvas.width, canvas.height, x, y, canvas.width / scale, canvas.height / scale);

      } else {

        this.context.fillText(text, x, y - this.fontTop());

      }

      return this;

    },

    fillRect: function() {

      if (this.alignX || this.alignY) {

        this.context.fillRect(arguments[0] - arguments[2] * this.alignX | 0, arguments[1] - arguments[3] * this.alignY | 0, arguments[2], arguments[3]);

      } else {

        this.context.fillRect(arguments[0], arguments[1], arguments[2], arguments[3]);

      }

      // cq.fastApply(this.context.fillRect, this.context, arguments);

      return this;

    },

    strokeRect: function() {

      if (this.alignX || this.alignY) {

        this.context.strokeRect(arguments[0] - arguments[2] * this.alignX | 0, arguments[1] - arguments[3] * this.alignY | 0, arguments[2], arguments[3]);

      } else {

        this.context.strokeRect(arguments[0], arguments[1], arguments[2], arguments[3]);

      }

      // cq.fastApply(this.context.strokeRect, this.context, arguments);

      return this;

    },

    drawImage: function(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {

      if (this.alignX || this.alignY) {

        if (sWidth == null) {
          sx -= image.width * this.alignX | 0;
          sy -= image.height * this.alignY | 0;
        } else {
          dx -= dWidth * this.alignX | 0;
          dy -= dHeight * this.alignY | 0;
        }

      }

      if (sWidth == null) {

        this.context.drawImage(image, sx, sy);

      } else if (dx == null) {

        this.context.drawImage(image, sx, sy, sWidth, sHeight);

      } else {

        this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

      }

      // cq.fastApply(this.context.drawImage, this.context, arguments);

      return this;

    },

    drawImageCentered: function(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {

      if (sWidth == null) {
        sx -= image.width * 0.5 | 0;
        sy -= image.height * 0.5 | 0;
      } else {
        dx -= dWidth * 0.5 | 0;
        dy -= dHeight * 0.5 | 0;
      }

      if (sWidth == null) {

        this.context.drawImage(image, sx, sy);

      } else if (dx == null) {

        this.context.drawImage(image, sx, sy, sWidth, sHeight);

      } else {

        this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

      }

      return this;

    },

    save: function() {

      this.prevAlignX.push(this.alignX);
      this.prevAlignY.push(this.alignY);

      this.context.save();

      return this;

    },

    restore: function() {

      this.realign();
      this.alignX = this.prevAlignX.pop();
      this.alignY = this.prevAlignY.pop();
      this.context.restore();

      return this;

    },

    drawTile: function(image, x, y, frameX, frameY, frameWidth, frameHeight, frames, frame) {

    },

    checkerboard: function(x, y, w, h, grid, colorA, colorB) {

      var tx = w / grid | 0;
      var ty = h / grid | 0;

      this.save();
      this.rect(x, y, w, h).clip();

      for (var i = 0; i <= tx; i++) {
        for (var j = 0; j <= ty; j++) {


          if (j % 2) var color = i % 2 ? colorA : colorB;
          else var color = i % 2 ? colorB : colorA;

          this.fillStyle(color);
          this.fillRect(x + i * grid, y + j * grid, grid, grid);

        }
      }

      this.restore();

    },

    drawAtlasFrame: function(atlas, frame, x, y) {

      var frame = atlas.frames[frame];

      this.drawRegion(
        atlas.image,
        frame.region,
        x - frame.width * this.alignX + frame.offset[0] + frame.region[2] * this.alignX,
        y - frame.height * this.alignY + frame.offset[1] + frame.region[3] * this.alignY
      );

      return this;

    },


    imageFill: function(image, width, height) {

      var scale = Math.max(width / image.width, height / image.height);

      this.save();
      this.scale(scale, scale);
      this.drawImage(image, 0, 0);
      this.restore();

    },

    drawRegion: function(image, region, x, y, scale) {

      scale = scale || 1;

      return this.drawImage(
        image, region[0], region[1], region[2], region[3],
        x | 0, y | 0, region[2] * scale | 0, region[3] * scale | 0
      );

    },

    drawRegionCentered: function(image, region, x, y, scale) {

      scale = scale || 1;

      return this.drawImageCentered(
        image, region[0], region[1], region[2], region[3],
        x | 0, y | 0, region[2] * scale | 0, region[3] * scale | 0
      );

    },

    cache: function() {

      return this.clone().canvas;

      /* FFS .... image.src is no longer synchronous when assigning dataURL */

      var image = new Image;

      image.src = this.canvas.toDataURL();

      return image;

    },

    blendOn: function(what, mode, mix) {
      cq.blend(what, this, mode, mix);

      return this;
    },

    posterize: function(pc, inc) {
      pc = pc || 32;
      inc = inc || 4;
      var imgdata = this.getImageData(0, 0, this.width, this.height);
      var data = imgdata.data;

      for (var i = 0; i < data.length; i += inc) {
        data[i] -= data[i] % pc; // set value to nearest of 8 possibilities
        data[i + 1] -= data[i + 1] % pc; // set value to nearest of 8 possibilities
        data[i + 2] -= data[i + 2] % pc; // set value to nearest of 8 possibilities
      }

      this.putImageData(imgdata, 0, 0); // put image data to canvas

      return this;
    },


    bw: function(pc) {
      pc = 128;
      var imgdata = this.getImageData(0, 0, this.width, this.height);
      var data = imgdata.data;
      // 8-bit: rrr ggg bb
      for (var i = 0; i < data.length; i += 4) {
        var v = ((data[i] + data[i + 1] + data[i + 2]) / 3);

        v = (v / 128 | 0) * 128;
        //data[i] = v; // set value to nearest of 8 possibilities
        //data[i + 1] = v; // set value to nearest of 8 possibilities
        data[i + 2] = (v / 255) * data[i]; // set value to nearest of 8 possibilities

      }

      this.putImageData(imgdata, 0, 0); // put image data to canvas
    },

    blend: function(what, mode, mix) {
      if (typeof what === "string") {
        var color = what;
        what = cq(this.canvas.width, this.canvas.height);
        what.fillStyle(color).fillRect(0, 0, this.canvas.width, this.canvas.height);
      }

      var result = cq.blend(this, what, mode, mix);

      this.canvas = result.canvas;
      this.context = result.context;

      return this;
    },

    textWithBackground: function(text, x, y, background, padding) {
      var w = this.measureText(text).width;
      var h = this.fontHeight() * 0.8;
      var f = this.fillStyle();
      var padding = padding || 2;

      var a = this.context.textAlign;

      this.fillStyle(background).fillRect(x - padding * 2, y - padding, w + padding * 4, h + padding * 2)
      this.fillStyle(f).textAlign("left").textBaseline("top").fillText(text, x, y);

      return this;
    },

    fillCircle: function(x, y, r) {
      this.context.beginPath();
      this.context.arc(x, y, r, 0, Math.PI * 2);
      this.context.fill();
      return this;
    },

    strokeCircle: function(x, y, r) {
      this.context.beginPath();
      this.context.arc(x, y, r, 0, Math.PI * 2);
      this.context.stroke();
      return this;
    },

    circle: function(x, y, r) {
      this.context.beginPath();
      this.context.arc(x, y, r, 0, Math.PI * 2);
      return this;
    },

    crop: function(x, y, w, h) {

      if (arguments.length === 1) {

        var y = arguments[0][1];
        var w = arguments[0][2];
        var h = arguments[0][3];
        var x = arguments[0][0];
      }

      var canvas = cq.createCanvas(w, h);
      var context = canvas.getContext("2d");

      context.drawImage(this.canvas, x, y, w, h, 0, 0, w, h);
      this.canvas.width = w;
      this.canvas.height = h;

      cq.setContextSmoothing(this.context, false);

      this.clear();
      this.context.drawImage(canvas, 0, 0);

      return this;
    },

    set: function(properties) {

      cq.extend(this.context, properties);

    },

    resize: function(width, height) {

      var w = width,
        h = height;

      if (arguments.length === 1) {

        w = arguments[0] * this.canvas.width | 0;
        h = arguments[0] * this.canvas.height | 0;

      } else {

        if (height === false) {

          if (this.canvas.width > width) {

            h = this.canvas.height * (width / this.canvas.width) | 0;
            w = width;

          } else {

            w = this.canvas.width;
            h = this.canvas.height;

          }

        } else if (width === false) {

          if (this.canvas.width > width) {

            w = this.canvas.width * (height / this.canvas.height) | 0;
            h = height;

          } else {

            w = this.canvas.width;
            h = this.canvas.height;

          }

        }

      }

      var cqresized = cq(w, h).drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, 0, 0, w, h);

      this.canvas = cqresized.canvas;
      this.context = cqresized.context;

      return this;

    },

    resizeBounds: function(width, height) {

      var temp = cq(width, height);

      temp.drawImage(this.canvas, 0, 0);

      this.canvas = temp.canvas;
      this.context = temp.context;

      return this;

    },

    imageLine: function(image, region, x, y, ex, ey, scale) {

      if (!region) region = [0, 0, image.width, image.height];

      var distance = cq.distance(x, y, ex, ey);
      var count = distance / region[3] + 0.5 | 0;
      var angle = Math.atan2(ey - y, ex - x) + Math.PI / 2;

      this.save();

      this.translate(x, y);
      this.rotate(angle);

      if (scale) this.scale(scale, 1.0);

      for (var i = 0; i <= count; i++) {
        this.drawRegion(image, region, -region[2] / 2 | 0, -region[3] * (i + 1));
      }

      this.restore();

      return this;

    },

    trim: function(color, changes) {
      var transparent;

      if (color) {
        color = cq.color(color).toArray();
        transparent = !color[3];
      } else transparent = true;

      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var bound = [this.canvas.width, this.canvas.height, 0, 0];

      var width = this.canvas.width;
      var height = this.canvas.height;

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        if (transparent) {
          if (!sourcePixels[i + 3]) continue;
        } else if (sourcePixels[i + 0] === color[0] && sourcePixels[i + 1] === color[1] && sourcePixels[i + 2] === color[2]) continue;

        var x = (i / 4 | 0) % this.canvas.width | 0;
        var y = (i / 4 | 0) / this.canvas.width | 0;

        if (x < bound[0]) bound[0] = x;
        if (x > bound[2]) bound[2] = x;

        if (y < bound[1]) bound[1] = y;
        if (y > bound[3]) bound[3] = y;
      }


      if (bound[2] === 0 && bound[3] === 0) {} else {
        if (changes) {
          changes.left = bound[0];
          changes.top = bound[1];

          changes.bottom = height - bound[3];
          changes.right = width - bound[2] - bound[0];

          changes.width = bound[2] - bound[0];
          changes.height = bound[3] - bound[1];
        }

        this.crop(bound[0], bound[1], bound[2] - bound[0] + 1, bound[3] - bound[1] + 1);
      }

      return this;
    },

    matchPalette: function(palette) {

      if (!palette.matches) palette.matches = new Map;

      if (!palette.colors) {

        palette.colors = [];

        for (var i = 0; i < palette.length; i++) {

          palette.colors.push(cq.color(palette[i]));

        }
      }

      var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = imageData.data;

      for (var i = 0; i < pixels.length; i += 4) {

        var difList = [];

        if (!pixels[i + 3]) continue;

        var key =
          (pixels[i + 0] / cq.matchPalettePrecision | 0) * cq.matchPalettePrecision +
          (pixels[i + 1] / cq.matchPalettePrecision | 0) * cq.matchPalettePrecision * 1000 +
          (pixels[i + 2] / cq.matchPalettePrecision | 0) * cq.matchPalettePrecision * 1000000;


        if (!palette.matches.has(key)) {

          for (var j = 0; j < palette.colors.length; j++) {

            var rgb = palette.colors[j];
            var rDif = Math.abs(pixels[i] - rgb[0]);
            var gDif = Math.abs(pixels[i + 1] - rgb[1])
            var bDif = Math.abs(pixels[i + 2] - rgb[2]);

            difList.push(rDif + gDif + bDif);

          }

          var closestMatch = 0;

          for (var j = 0; j < palette.length; j++) {

            if (difList[j] < difList[closestMatch]) {

              closestMatch = j;

            }

          }

          palette.matches.set(key, palette.colors[closestMatch]);

        }

        var matchedColor = palette.matches.get(key);

        pixels[i] = matchedColor[0];
        pixels[i + 1] = matchedColor[1];
        pixels[i + 2] = matchedColor[2];

        /* dithering */

        //imageData.data[i + 3] = (255 * Math.random() < imageData.data[i + 3]) ? 255 : 0;

        //imageData.data[i + 3] = imageData.data[i + 3] > 128 ? 255 : 0;
        /*
        if (i % 3 === 0) {
          imageData.data[i] -= cq.limitValue(imageData.data[i] - 50, 0, 255);
          imageData.data[i + 1] -= cq.limitValue(imageData.data[i + 1] - 50, 0, 255);
          imageData.data[i + 2] -= cq.limitValue(imageData.data[i + 2] - 50, 0, 255);
        }
        */

      }

      this.context.putImageData(imageData, 0, 0);

      return this;

    },

    getPalette: function() {
      var palette = [];
      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        if (sourcePixels[i + 3]) {
          var hex = cq.rgbToHex(sourcePixels[i + 0], sourcePixels[i + 1], sourcePixels[i + 2]);
          if (palette.indexOf(hex) === -1) palette.push(hex);
        }
      }

      return palette;
    },

    mapPalette: function() {

    },

    polygon: function(array, x, y) {

      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = 0;
      }

      this.beginPath();

      this.moveTo(array[0][0] + x, array[0][1] + y);

      for (var i = 1; i < array.length; i++) {
        this.lineTo(array[i][0] + x, array[i][1] + y);
      }

      this.closePath();

      return this;

    },

    fillPolygon: function(polygon) {

      this.polygon(polygon);
      this.fill();

    },

    strokePolygon: function(polygon) {

      this.polygon(polygon);
      this.stroke();

    },

    colorToMask: function(color, inverted) {
      color = cq.color(color).toArray();
      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var mask = [];

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        if (sourcePixels[i + 3] > 0) mask.push(inverted ? false : true);
        else mask.push(inverted ? true : false);
      }

      return mask;
    },

    grayscaleToMask: function() {

      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var mask = [];

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        mask.push(((sourcePixels[i + 0] + sourcePixels[i + 1] + sourcePixels[i + 2]) / 3) / 255);
      }

      return mask;
    },

    applyMask: function(mask) {
      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var mode = typeof mask[0] === "boolean" ? "bool" : "byte";

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        var value = mask[i / 4];
        sourcePixels[i + 3] = value * 255 | 0;
      }

      this.context.putImageData(sourceData, 0, 0);
      return this;
    },

    fillMask: function(mask) {

      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var maskType = typeof mask[0] === "boolean" ? "bool" : "byte";
      var colorMode = arguments.length === 2 ? "normal" : "gradient";

      var color = cq.color(arguments[1]);
      if (colorMode === "gradient") colorB = cq.color(arguments[2]);

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        var value = mask[i / 4];

        if (maskType === "byte") value /= 255;

        if (colorMode === "normal") {
          if (value) {
            sourcePixels[i + 0] = color[0] | 0;
            sourcePixels[i + 1] = color[1] | 0;
            sourcePixels[i + 2] = color[2] | 0;
            sourcePixels[i + 3] = value * 255 | 0;
          }
        } else {
          sourcePixels[i + 0] = color[0] + (colorB[0] - color[0]) * value | 0;
          sourcePixels[i + 1] = color[1] + (colorB[1] - color[1]) * value | 0;
          sourcePixels[i + 2] = color[2] + (colorB[2] - color[2]) * value | 0;
          sourcePixels[i + 3] = 255;
        }
      }

      this.context.putImageData(sourceData, 0, 0);
      return this;
    },

    clear: function(color) {
      if (color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      } else {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }

      return this;
    },

    clone: function() {

      // var result = cq.createCanvas(this.canvas);

      var result = cq.pool();
      result.width = this.width;
      result.height = this.height;
      result.getContext("2d").drawImage(this.canvas, 0, 0);

      return cq(result);
    },

    gradientText: function(text, x, y, maxWidth, gradient) {

      var words = text.split(" ");

      var h = this.fontHeight() * 2;

      var ox = 0;
      var oy = 0;

      if (maxWidth) {
        var line = 0;
        var lines = [""];

        for (var i = 0; i < words.length; i++) {
          var word = words[i] + " ";
          var wordWidth = this.context.measureText(word).width;

          if (ox + wordWidth > maxWidth) {
            lines[++line] = "";
            ox = 0;
          }

          lines[line] += word;

          ox += wordWidth;
        }
      } else var lines = [text];

      for (var i = 0; i < lines.length; i++) {
        var oy = y + i * h * 0.6 | 0;
        var lingrad = this.context.createLinearGradient(0, oy, 0, oy + h * 0.6 | 0);

        for (var j = 0; j < gradient.length; j += 2) {
          lingrad.addColorStop(gradient[j], gradient[j + 1]);
        }

        var text = lines[i];

        this.fillStyle(lingrad).fillText(text, x, oy);
      }

      return this;
    },

    removeColor: function(color) {

      color = cq.color(color);

      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;

      for (var x = 0; x < this.canvas.width; x++) {
        for (var y = 0; y < this.canvas.height; y++) {
          var i = (y * this.canvas.width + x) * 4;

          if (pixels[i + 0] === color[0] && pixels[i + 1] === color[1] && pixels[i + 2] === color[2]) {
            pixels[i + 3] = 0;
          }


        }
      }

      this.clear();
      this.context.putImageData(data, 0, 0);

      return this;
    },

    outline: function() {
      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;

      var newData = this.createImageData(this.canvas.width, this.canvas.height);
      var newPixels = newData.data;

      var canvas = this.canvas;

      function check(x, y) {

        if (x < 0) return 0;
        if (x >= canvas.width) return 0;
        if (y < 0) return 0;
        if (y >= canvas.height) return 0;

        var i = (x + y * canvas.width) * 4;

        return pixels[i + 3] > 0;

      }

      for (var x = 0; x < this.canvas.width; x++) {
        for (var y = 0; y < this.canvas.height; y++) {

          var full = 0;
          var i = (y * canvas.width + x) * 4;

          if (!pixels[i + 3]) continue;

          full += check(x - 1, y);
          full += check(x + 1, y);
          full += check(x, y - 1);
          full += check(x, y + 1);

          if (full !== 4) {

            newPixels[i] = 255;
            newPixels[i + 1] = 255;
            newPixels[i + 2] = 255;
            newPixels[i + 3] = 255;
          }

        }
      }

      this.context.putImageData(newData, 0, 0);

      return this;
    },

    setHsl: function() {

      if (arguments.length === 1) {
        var args = arguments[0];
      } else {
        var args = arguments;
      }

      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;
      var r, g, b, a, h, s, l, hsl = [],
        newPixel = [];

      for (var i = 0, len = pixels.length; i < len; i += 4) {
        hsl = cq.rgbToHsl(pixels[i + 0], pixels[i + 1], pixels[i + 2]);

        h = args[0] === false ? hsl[0] : cq.limitValue(args[0], 0, 1);
        s = args[1] === false ? hsl[1] : cq.limitValue(args[1], 0, 1);
        l = args[2] === false ? hsl[2] : cq.limitValue(args[2], 0, 1);

        newPixel = cq.hslToRgb(h, s, l);

        pixels[i + 0] = newPixel[0];
        pixels[i + 1] = newPixel[1];
        pixels[i + 2] = newPixel[2];
      }

      this.context.putImageData(data, 0, 0);

      return this;
    },

    shiftHsl: function() {

      if (arguments.length === 1) {
        var args = arguments[0];
      } else {
        var args = arguments;
      }

      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;
      var r, g, b, a, h, s, l, hsl = [],
        newPixel = [];

      for (var i = 0, len = pixels.length; i < len; i += 4) {
        hsl = cq.rgbToHsl(pixels[i + 0], pixels[i + 1], pixels[i + 2]);

        if (pixels[i + 0] !== pixels[i + 1] || pixels[i + 1] !== pixels[i + 2]) {
          h = args[0] === false ? hsl[0] : cq.wrapValue(hsl[0] + args[0], 0, 1);
          s = args[1] === false ? hsl[1] : cq.limitValue(hsl[1] + args[1], 0, 1);
        } else {
          h = hsl[0];
          s = hsl[1];
        }

        l = args[2] === false ? hsl[2] : cq.limitValue(hsl[2] + args[2], 0, 1);

        newPixel = cq.hslToRgb(h, s, l);

        pixels[i + 0] = newPixel[0];
        pixels[i + 1] = newPixel[1];
        pixels[i + 2] = newPixel[2];
      }


      this.context.putImageData(data, 0, 0);

      return this;
    },

    applyColor: function(color) {

      if (COCOONJS) return this;
      this.save();

      this.globalCompositeOperation("source-in");
      this.clear(color);

      this.restore();

      return this;
    },

    negative: function(src, dst) {

      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;
      var r, g, b, a, h, s, l, hsl = [],
        newPixel = [];

      for (var i = 0, len = pixels.length; i < len; i += 4) {
        pixels[i + 0] = 255 - pixels[i + 0];
        pixels[i + 1] = 255 - pixels[i + 1];
        pixels[i + 2] = 255 - pixels[i + 2];
      }

      this.context.putImageData(data, 0, 0);

      return this;
    },

    roundRect: function(x, y, width, height, radius) {

      this.beginPath();
      this.moveTo(x + radius, y);
      this.lineTo(x + width - radius, y);
      this.quadraticCurveTo(x + width, y, x + width, y + radius);
      this.lineTo(x + width, y + height - radius);
      this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      this.lineTo(x + radius, y + height);
      this.quadraticCurveTo(x, y + height, x, y + height - radius);
      this.lineTo(x, y + radius);
      this.quadraticCurveTo(x, y, x + radius, y);
      this.closePath();

      return this;
    },

    markupText: function(text) {


    },


    wrappedText: function(text, x, y, maxWidth, lineHeight) {

      if (maxWidth < 0) maxWidth = 0;

      var words = text.split(" ");

      var lineHeight = lineHeight || this.fontHeight();

      var ox = 0;
      var oy = 0;

      var textAlign = this.context.textAlign;
      var textBaseline = this.context.textBaseline;

      this.textBaseline("top");

      var spaceWidth = this.context.measureText(" ").width | 0;

      if (maxWidth) {

        var line = 0;
        var lines = [""];
        var linesWidth = [0];

        for (var i = 0; i < words.length; i++) {
          var word = words[i];
          var wordWidth = this.context.measureText(word).width | 0;


          if (wordWidth > maxWidth) {

            /* 4 is still risky, it's valid as long as `-` is the delimiter */

            if (word.length <= 5) return;

            var split = word.length / 2 | 0;

            words.splice(i, 1);
            words.splice(i, 0, "-" + word.substr(split));
            words.splice(i, 0, word.substr(0, split) + "-");

            i--;

            continue;
          }

          if (ox + wordWidth > maxWidth || words[i] === "\n") {

            lines[line] = lines[line].substr(0, lines[line].length - 1);
            linesWidth[line] -= spaceWidth;

            lines[++line] = "";
            linesWidth[line] = 0;
            ox = 0;
          }

          if (words[i] !== "\n") {

            lines[line] += word + " ";

            ox += wordWidth + spaceWidth;

            linesWidth[line] += wordWidth + spaceWidth;

          }

        }

      } else {

        var lines = [text];
        var linesWidth = [this.context.measureText(text).width];

      }

      for (var i = 0; i < lines.length; i++) {

        var oy = y + i * lineHeight | 0;

        var text = lines[i];
        var width = linesWidth[i];

        this.textAlign("left");

        if (textAlign === "left" || textAlign === "start")
          this.fillText(text, x, oy);
        else if (textAlign === "center")
          this.fillText(text, x + maxWidth * 0.5 - width * 0.5 | 0, oy);
        else
          this.fillText(text, x + maxWidth - width, oy);

      }

      this.textAlign(textAlign);
      this.textBaseline(textBaseline);

      return this;

    },

    fontHeights: {},
    fontTops: {},

    fontTop: function() {

      if (!this.fontTops[this.context.font]) this.fontHeight();

      return this.fontTops[this.context.font];

    },

    fontHeight: function() {

      var font = this.font();

      if (!this.fontHeights[font]) {

        var fontStyleHeight = parseInt(font);

        var temp = cq(100, 10 + fontStyleHeight * 2 | 0);

        cq.setContextSmoothing(temp.context, false);

        temp.font(font).fillStyle("#fff");
        temp.textBaseline("top");

        /* Use direct fillText as internal inmplementation uses fontWidth() */

        temp.context.fillText("Play Moog", 20, 10);

        var data = temp.getImageData(0, 0, temp.width, temp.height).data;

        var top = temp.height;
        var bottom = 0;

        for (var i = 0; i < data.length; i += 4) {

          var x = (i / 4 | 0) % temp.width;
          var y = (i / 4 | 0) / temp.width | 0;

          if (!data[i + 3]) continue;

          if (y < top) top = y;
          if (y > bottom) bottom = y;

        }

        this.fontHeights[font] = Math.abs(top - bottom) + 2;
        this.fontTops[font] = top - 10;

      }

      return this.fontHeights[font];

    },

    textBoundaries: function(text, maxWidth) {

      if (maxWidth < 0) maxWidth = 0;

      var words = text.split(" ");

      var h = this.fontHeight();

      var ox = 0;
      var oy = 0;

      var spaceWidth = this.context.measureText(" ").width;

      if (maxWidth) {
        var line = 0;
        var lines = [""];

        for (var i = 0; i < words.length; i++) {
          var word = words[i];
          var wordWidth = this.context.measureText(word).width;

          if (wordWidth + spaceWidth > maxWidth) {

            if (word.length <= 5) continue;

            var split = word.length / 2 | 0;

            words.splice(i, 1);
            words.splice(i, 0, "-" + word.substr(split));
            words.splice(i, 0, word.substr(0, split) + "-");

            i--;

            continue;
          }

          if (ox + wordWidth > maxWidth || words[i] === "\n") {
            lines[++line] = "";
            ox = 0;
          }

          if (words[i] !== "\n") {
            lines[line] += word;
            ox += wordWidth + spaceWidth;
          }
        }

        if (lines.length > 1) {

          var width = maxWidth;

        } else {

          var width = this.measureText(text).width | 0;

        }

      } else {

        var lines = [text];

        var width = this.measureText(text).width | 0;


      }

      return {
        height: lines.length * h,
        width: width | 0,
        lines: lines.length,
        fontHeight: h
      }

    },

    repeatImageRegion: function(image, sx, sy, sw, sh, dx, dy, dw, dh) {
      this.save();
      this.rect(dx, dy, dw, dh);
      this.clip();

      for (var x = 0, len = Math.ceil(dw / sw); x < len; x++) {
        for (var y = 0, leny = Math.ceil(dh / sh); y < leny; y++) {
          this.drawImage(image, sx, sy, sw, sh, dx + x * sw, dy + y * sh, sw, sh);
        }
      }

      this.restore();

      return this;
    },

    repeatImage: function(image, x, y, w, h) {
      // if (!env.details) return this;

      if (arguments.length < 9) {

        this.repeatImageRegion(image, 0, 0, image.width, image.height, x, y, w, h);

      } else {

        this.repeatImageRegion.apply(this, arguments);

      }

      return this;
    },

    borderImageEmptyRegion: [0, 0, 0, 0],

    borderImage: function(image, x, y, w, h, t, r, b, l, fill) {

      // if (!env.details) return this;

      if (typeof t === "object") {

        var region = t.region;

        if (!region) {

          region = this.borderImageEmptyRegion;
          region[2] = image.width;
          region[3] = image.height;

        }

        if (t.outset) {

          var outset = t.outset;

          if (w > outset * 2 && h > outset * 2) {

            this.drawImage(image,
              region[0] + outset,
              region[1] + outset, (region[2] - outset * 2), (region[3] - outset * 2),
              x + outset, y + outset,
              w - outset * 2,
              h - outset * 2
            );


            this.drawImage(image, region[0], region[1] + outset, outset, region[3] - 2 * outset, x, y + outset, outset, h - outset * 2);
            this.drawImage(image, region[0] + region[2] - outset, region[1] + outset, outset, region[3] - 2 * outset, x + w - outset, y + outset, outset, h - outset * 2);
            this.drawImage(image, region[0] + outset, region[1], region[2] - outset * 2, outset, x + outset, y, w - outset * 2, outset);
            this.drawImage(image, region[0] + outset, region[1] + region[3] - outset, region[2] - outset * 2, outset, x + outset, y + h - outset, w - outset * 2, outset);

            this.drawImage(image, region[0], region[1], outset, outset, x, y, outset, outset);
            this.drawImage(image, region[0], region[1] + region[3] - outset, outset, outset, x, y + h - outset, outset, outset);
            this.drawImage(image, region[0] + region[2] - outset, region[1], outset, outset, x + w - outset, y, outset, outset);
            this.drawImage(image, region[0] + region[2] - outset, region[1] + region[3] - outset, outset, outset, x + w - outset, y + h - outset, outset, outset);

          }

        }

        /* complex */
        else {

          var bottomLeft = t.bottomLeft || [0, 0, 0, 0];
          var bottomRight = t.bottomRight || [0, 0, 0, 0];
          var topLeft = t.topLeft || [0, 0, 0, 0];
          var topRight = t.topRight || [0, 0, 0, 0];

          var clh = bottomLeft[3] + topLeft[3];
          var crh = bottomRight[3] + topRight[3];
          var ctw = topLeft[2] + topRight[2];
          var cbw = bottomLeft[2] + bottomRight[2];

          t.fillPadding = [0, 0, 0, 0];

          if (t.left) t.fillPadding[0] = t.left[2];
          if (t.top) t.fillPadding[1] = t.top[3];
          if (t.right) t.fillPadding[2] = t.right[2];
          if (t.bottom) t.fillPadding[3] = t.bottom[3];

          // if (!t.fillPadding) t.fillPadding = [0, 0, 0, 0];

          if (t.fill) {
            this.drawImage(image, t.fill[0], t.fill[1], t.fill[2], t.fill[3], x + t.fillPadding[0], y + t.fillPadding[1], w - t.fillPadding[2] - t.fillPadding[0], h - t.fillPadding[3] - t.fillPadding[1]);
          } else {
            // this.fillRect(x + t.fillPadding[0], y + t.fillPadding[1], w - t.fillPadding[2] - t.fillPadding[0], h - t.fillPadding[3] - t.fillPadding[1]);
          }

          /* sides */

          if (t.left) this[t.left[4] === "stretch" ? "drawImage" : "repeatImage"](image, t.left[0], t.left[1], t.left[2], t.left[3], x, y + topLeft[3], t.left[2], h - clh);
          if (t.right) this[t.right[4] === "stretch" ? "drawImage" : "repeatImage"](image, t.right[0], t.right[1], t.right[2], t.right[3], x + w - t.right[2], y + topRight[3], t.right[2], h - crh);
          if (t.top) this[t.top[4] === "stretch" ? "drawImage" : "repeatImage"](image, t.top[0], t.top[1], t.top[2], t.top[3], x + topLeft[2], y, w - ctw, t.top[3]);
          if (t.bottom) this[t.bottom[4] === "stretch" ? "drawImage" : "repeatImage"](image, t.bottom[0], t.bottom[1], t.bottom[2], t.bottom[3], x + bottomLeft[2], y + h - t.bottom[3], w - cbw, t.bottom[3]);

          /* corners */

          if (t.bottomLeft) this.drawImage(image, t.bottomLeft[0], t.bottomLeft[1], t.bottomLeft[2], t.bottomLeft[3], x, y + h - t.bottomLeft[3], t.bottomLeft[2], t.bottomLeft[3]);
          if (t.topLeft) this.drawImage(image, t.topLeft[0], t.topLeft[1], t.topLeft[2], t.topLeft[3], x, y, t.topLeft[2], t.topLeft[3]);
          if (t.topRight) this.drawImage(image, t.topRight[0], t.topRight[1], t.topRight[2], t.topRight[3], x + w - t.topRight[2], y, t.topRight[2], t.topRight[3]);
          if (t.bottomRight) this.drawImage(image, t.bottomRight[0], t.bottomRight[1], t.bottomRight[2], t.bottomRight[3], x + w - t.bottomRight[2], y + h - t.bottomRight[3], t.bottomRight[2], t.bottomRight[3]);

        }

      } else {


        /* top */
        if (t > 0 && w - l - r > 0) this.drawImage(image, l, 0, image.width - l - r, t, x + l, y, w - l - r, t);

        /* bottom */
        if (b > 0 && w - l - r > 0) this.drawImage(image, l, image.height - b, image.width - l - r, b, x + l, y + h - b, w - l - r, b);
        //      console.log(x, y, w, h, t, r, b, l);
        //      console.log(image, 0, t, l, image.height - b - t, x, y + t, l, h - b - t);
        /* left */
        if (l > 0 && h - b - t > 0) this.drawImage(image, 0, t, l, image.height - b - t, x, y + t, l, h - b - t);


        /* right */
        if (r > 0 && h - b - t > 0) this.drawImage(image, image.width - r, t, r, image.height - b - t, x + w - r, y + t, r, h - b - t);

        /* top-left */
        if (l > 0 && t > 0) this.drawImage(image, 0, 0, l, t, x, y, l, t);

        /* top-right */
        if (r > 0 && t > 0) this.drawImage(image, image.width - r, 0, r, t, x + w - r, y, r, t);

        /* bottom-right */
        if (r > 0 && b > 0) this.drawImage(image, image.width - r, image.height - b, r, b, x + w - r, y + h - b, r, b);

        /* bottom-left */
        if (l > 0 && b > 0) this.drawImage(image, 0, image.height - b, l, b, x, y + h - b, l, b);

        if (fill) {
          if (typeof fill === "string") {
            this.fillStyle(fill).fillRect(x + l, y + t, w - l - r, h - t - b);
          } else {
            if (w - l - r > 0 && h - t - b > 0)
              this.drawImage(image, l, t, image.width - r - l, image.height - b - t, x + l, y + t, w - l - r, h - t - b);
          }
        }
      }
    },

    setPixel: function(color, x, y) {

      /* fillRect is slow! */

      return this.fillStyle(color).fillRect(x, y, 1, 1);

      /* this is how it should work - but it does not */

      color = cq.color(color);

      var pixel = this.createImageData(1, 1);

      pixel.data[0] = color[0];
      pixel.data[1] = color[1];
      pixel.data[2] = color[2];
      pixel.data[3] = 255;

      this.putImageData(pixel, x, y);

      return this;
    },

    getPixel: function(x, y) {

      var pixel = this.context.getImageData(x, y, 1, 1).data;

      return cq.color([pixel[0], pixel[1], pixel[2], pixel[3]]);

    },

    clearRect: function(x, y, w, h) {

      this.context.clearRect(x, y, w, h);

      return this;

    },

    fill: function() {

      this.context.fill();

      return this;

    },

    stroke: function() {

      this.context.stroke();

      return this;

    },

    createImageData: function(width, height) {

      if (false && this.context.createImageData) {

        return this.context.createImageData.apply(this.context, arguments);

      } else {

        if (!this.emptyCanvas) {

          this.emptyCanvas = cq.createCanvas(width, height);
          this.emptyCanvasContext = this.emptyCanvas.getContext("2d");

        }

        this.emptyCanvas.width = width;
        this.emptyCanvas.height = height;

        return this.emptyCanvasContext.getImageData(0, 0, width, height);
      }

    },

    strokeLine: function(x1, y1, x2, y2) {

      this.beginPath();

      if (typeof x2 === "undefined") {
        this.moveTo(x1.x, x1.y);
        this.lineTo(y1.x, y1.y);
      } else {
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
      }

      this.stroke();

      return this;

    },

    shadowOffset: function(x, y) {

      this.context.shadowOffsetX = x;
      this.context.shadowOffsetY = y;

      return this;

    },

    noLineDash: [],
    tempLineDash: [2, 2],

    setLineDash: function(dash) {

      if (typeof dash === "number") {

        this.tempLineDash[0] = dash;
        this.tempLineDash[1] = dash;

        dash = this.tempLineDash;

      }

      this.context.setLineDash(dash ? dash : this.noLineDash);

      return this;

    },

    measureText: function(text) {

      return this.context.measureText(text);

    },

    getLineDash: function() {

      return this.context.getLineDash();

    },

    createRadialGradient: function(x0, y0, r0, x1, y1, r1) {

      return this.context.createRadialGradient(x0, y0, r0, x1, y1, r1);

    },

    createLinearGradient: function(x0, y0, x1, y1) {

      return this.context.createLinearGradient(x0, y0, x1, y1);

    },

    createPattern: function(image, repeat) {

      return this.context.createPattern(image, repeat);

    },

    getImageData: function(sx, sy, sw, sh) {

      return this.context.getImageData(sx, sy, sw, sh);

    },

    /* If you think that I am retarded because I use fillRect to set
       pixels - read about premultipled alpha in canvas */

    writeMeta: function(data) {

      var json = JSON.stringify(data);

      json = encodeURIComponent(json);

      var bytes = [];

      for (var i = 0; i < json.length; i++) {
        bytes.push(json.charCodeAt(i));
        //      console.log(json[i])
      }

      bytes.push(127);

      var x = this.width - 1;
      var y = this.height - 1;

      var pixel = [];

      while (bytes.length) {

        var byte = bytes.shift();

        pixel.unshift(byte * 2);
        //        console.log(x + String.fromCharCode(byte), byte);

        if (!bytes.length)
          for (var i = 0; i < 3 - pixel.length; i++) pixel.unshift(254);

        if (pixel.length === 3) {
          this.fillStyle(cq.color(pixel).toRgb()).fillRect(x, y, 1, 1);
          pixel = [];
          x--;

          if (x < 0) {
            y--;
            x = this.width - 1;
          }
        }
      }

      return this;

    },

    /* setters / getters */

    strokeStyle: function(style) {

      if (style == null) {

        return this.context.strokeStyle;

      } else {

        this.context.strokeStyle = style;

        return this;

      }

    },

    fillStyle: function(style) {

      if (style == null) {

        return this.context.fillStyle;

      } else {

        this.context.fillStyle = style;

        return this;

      }

    },

    font: function(font) {

      if (font == null) {

        return this.context.font;

      } else {

        this.context.font = font;

        return this;
      }

    },

    filter: function(filter) {

      if (filter) {

        this.context.filter = filter;

        return this;

      } else {

        return this.context.filter;

      }

      return this;

    },

    readMeta: function() {

      var bytes = [];

      var x = this.width - 1;
      var y = this.height - 1;

      while (true) {
        var pixel = this.getPixel(x, y);

        var stop = false;

        for (var i = 0; i < 3; i++) {

          if (pixel[2 - i] === 254) stop = true;

          else bytes.push(pixel[2 - i] / 2 | 0);

        }

        if (stop) break;

        x--;

        if (x < 0) {
          y--;
          x = this.width - 1;
          break;
        }
      }


      var json = "";

      while (bytes.length) {
        json += String.fromCharCode(bytes.shift());
      }

      var data = false;

      console.log(json);

      try {
        data = JSON.parse(decodeURIComponent(json));
      } catch (e) {

      }

      return data;

    },

    get width() {

      return this.canvas.width;

    },

    get height() {

      return this.canvas.height;

    },

    set width(w) {

      this.canvas.width = w;
      this.update();

      return this.canvas.width;

    },

    set height(h) {

      this.canvas.height = h;
      this.update();

      return this.canvas.height;

    }


  };

  /* extend Layer with drawing context methods */

  var methods = ["arc", "arcTo", "beginPath", "bezierCurveTo", "clip", "closePath", "createLinearGradient", "createRadialGradient", "createPattern", "drawFocusRing", "drawImage", "fill", "fillRect", "fillText", "getImageData", "isPointInPath", "lineTo", "measureText", "moveTo", "putImageData", "quadraticCurveTo", "rect", "restore", "rotate", "scale", "setTransform", "strokeRect", "strokeText", "transform", "translate", "setLineDash"];

  for (var i = 0; i < methods.length; i++) {

    var name = methods[i];

    if (cq.Layer.prototype[name]) continue;

    cq.Layer.prototype[name] = (function(method) {

      return function() {

        var args = new Array(arguments.length);

        for (var i = 0; i < args.length; ++i) {

          args[i] = arguments[i];

        }

        cq.fastApply(method, this.context, args);

        return this;
      }

    })(CanvasRenderingContext2D.prototype[name]);


    continue;


    if (!this.debug) {
      // if (!cq.Layer.prototype[name]) cq.Layer.prototype[name] = Function("this.context." + name + ".apply(this.context, arguments); return this;");

      var self = this;

      (function(name) {

        cq.Layer.prototype[name] = function() {
          // this.context[name].apply(this.context, arguments);

          cq.fastApply(this.context[name], this.context, arguments);

          return this;
        }

      })(name);

    } else {

      var self = this;

      (function(name) {

        cq.Layer.prototype[name] = function() {
          try {
            this.context[name].apply(this.context, arguments);
            return this;
          } catch (e) {
            var err = new Error();
            console.log(err.stack);
            throw (e + err.stack);

            console.log(e, name, arguments);
          }
        }

      })(name);

    }

  };

  /* create setters and getters */

  var properties = ["globalAlpha", "globalCompositeOperation", "lineCap", "lineJoin", "lineWidth", "miterLimit", "shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor", "textAlign", "textBaseline", "lineDashOffset"];

  for (var i = 0; i < properties.length; i++) {

    var name = properties[i];

    if (!cq.Layer.prototype[name]) cq.Layer.prototype[name] = Function("if(arguments.length) { this.context." + name + " = arguments[0]; return this; } else { return this.context." + name + "; }");

  };

  /* color */

  cq.Color = function(data, type) {

    if (arguments.length) this.parse(data, type);
  }

  cq.Color.prototype = {

    toString: function() {
      return this.toRgb();
    },

    parse: function(args, type) {
      if (args[0] instanceof cq.Color) {
        this[0] = args[0][0];
        this[1] = args[0][1];
        this[2] = args[0][2];
        this[3] = args[0][3];
        return;
      }

      if (typeof args === "string") {
        var match = null;

        if (args[0] === "#") {
          var rgb = cq.hexToRgb(args);
          this[0] = rgb[0];
          this[1] = rgb[1];
          this[2] = rgb[2];
          this[3] = 1.0;
        } else if (match = args.match(/rgb\((.*),(.*),(.*)\)/)) {
          this[0] = match[1] | 0;
          this[1] = match[2] | 0;
          this[2] = match[3] | 0;
          this[3] = 1.0;
        } else if (match = args.match(/rgba\((.*),(.*),(.*)\)/)) {
          this[0] = match[1] | 0;
          this[1] = match[2] | 0;
          this[2] = match[3] | 0;
          this[3] = match[4] | 0;
        } else if (match = args.match(/hsl\((.*),(.*),(.*)\)/)) {
          this.fromHsl(match[1], match[2], match[3]);
        } else if (match = args.match(/hsv\((.*),(.*),(.*)\)/)) {
          this.fromHsv(match[1], match[2], match[3]);
        }
      } else {
        switch (type) {
          case "hsl":
          case "hsla":

            this.fromHsl(args[0], args[1], args[2], args[3]);
            break;

          case "hsv":
          case "hsva":

            this.fromHsv(args[0], args[1], args[2], args[3]);
            break;

          default:
            this[0] = args[0];
            this[1] = args[1];
            this[2] = args[2];
            this[3] = typeof args[3] === "undefined" ? 1.0 : args[3];
            break;
        }
      }
    },

    a: function(a) {
      return this.alpha(a);
    },

    alpha: function(a) {
      this[3] = a;
      return this;
    },

    fromHsl: function() {
      var components = arguments[0] instanceof Array ? arguments[0] : arguments;

      var color = cq.hslToRgb(parseFloat(components[0]), parseFloat(components[1]), parseFloat(components[2]));

      this[0] = color[0];
      this[1] = color[1];
      this[2] = color[2];
      this[3] = typeof arguments[3] === "undefined" ? 1.0 : arguments[3];
    },

    fromHsv: function() {
      var components = arguments[0] instanceof Array ? arguments[0] : arguments;
      var color = cq.hsvToRgb(parseFloat(components[0]), parseFloat(components[1]), parseFloat(components[2]));

      this[0] = color[0];
      this[1] = color[1];
      this[2] = color[2];
      this[3] = typeof arguments[3] === "undefined" ? 1.0 : arguments[3];
    },

    toArray: function() {
      return [this[0], this[1], this[2], this[3]];
    },

    toRgb: function() {
      return "rgb(" + this[0] + ", " + this[1] + ", " + this[2] + ")";
    },

    toRgba: function() {
      return "rgba(" + this[0] + ", " + this[1] + ", " + this[2] + ", " + this[3] + ")";
    },

    toHex: function() {
      return cq.rgbToHex(this[0], this[1], this[2]);
    },

    toHsl: function() {
      var c = cq.rgbToHsl(this[0], this[1], this[2]);
      c[3] = this[3];
      return c;
    },

    toHsv: function() {
      var c = cq.rgbToHsv(this[0], this[1], this[2]);
      c[3] = this[3];
      return c;
    },

    gradient: function(target, steps) {
      var targetColor = cq.color(target);
    },

    shiftHsl: function() {
      var hsl = this.toHsl();

      if (this[0] !== this[1] || this[1] !== this[2]) {
        var h = arguments[0] === false ? hsl[0] : cq.wrapValue(hsl[0] + arguments[0], 0, 1);
        var s = arguments[1] === false ? hsl[1] : cq.limitValue(hsl[1] + arguments[1], 0, 1);
      } else {
        var h = hsl[0];
        var s = hsl[1];
      }

      var l = arguments[2] === false ? hsl[2] : cq.limitValue(hsl[2] + arguments[2], 0, 1);

      this.fromHsl(h, s, l);

      return this;
    },

    setHsl: function() {
      var hsl = this.toHsl();

      var h = arguments[0] === false ? hsl[0] : cq.limitValue(arguments[0], 0, 1);
      var s = arguments[1] === false ? hsl[1] : cq.limitValue(arguments[1], 0, 1);
      var l = arguments[2] === false ? hsl[2] : cq.limitValue(arguments[2], 0, 1);

      this.fromHsl(h, s, l);

      return this;
    },

    mix: function(color, amount) {

      color = cq.color(color);

      for (var i = 0; i < 4; i++) {

        this[i] = cq.mix(this[i], color[i], amount);

      }

      return this;

    }

  };

  window["cq"] = window["CanvasQuery"] = cq;

  return cq;

})();

/* file: src/layer/Layer.js */

/** 
  
  Renderer build on top of CanvasQuery library.
 
  The application is enhanced with a `layer` member that
  provides access to the canvas.
 
  Reference: http://playgroundjs.com/playground-layer

*/

PLAYGROUND.Renderer = function(app) {

  this.app = app;

  app.on("create", this.create.bind(this));
  app.on("resize", this.resize.bind(this));

  app.on("kill", this.kill.bind(this));

};

PLAYGROUND.Renderer.plugin = true;

PLAYGROUND.Renderer.prototype = {

  kill: function() {

    this.app.layer.canvas.parentNode.removeChild(this.app.layer.canvas);

  },

  create: function(data) {

    this.app.layer = cq().appendTo(this.app.container);

    if (!this.app.customContainer) {
      this.app.container.style.margin = "0px";
      this.app.container.style.overflow = "hidden";
    }

  },

  resize: function(data) {

    var app = this.app;

    var layer = app.layer;

    layer.width = app.width;
    layer.height = app.height;

    layer.canvas.style.transformOrigin = "0 0";
    layer.canvas.style.transform = "translate(" + app.offsetX + "px," + app.offsetY + "px) scale(" + app.scale + ", " + app.scale + ")";
    layer.canvas.style.transformStyle = "preserve-3d";

    layer.canvas.style.webkitTransformOrigin = "0 0";
    layer.canvas.style.webkitTransform = "translate(" + app.offsetX + "px," + app.offsetY + "px) scale(" + app.scale + ", " + app.scale + ")";
    layer.canvas.style.webkitTransformStyle = "preserve-3d";

    cq.smoothing = this.app.smoothing;

    layer.update();

    layer.canvas.style.imageRendering = this.app.smoothing ? "auto" : "pixelated";

    layer.canvas.addEventListener("mousedown", function() {

      this.focus();

    });

  }

};

/* file: src/layer/Transitions.js */

/** Animation played when changing state with canvas render.
 *
 * Reference: http://playgroundjs.com/playground-transitions
 */

PLAYGROUND.Transitions = function(app) {

  this.app = app;

  app.on("enterstate", this.enterstate.bind(this));
  app.on("afterpostrender", this.postrender.bind(this));
  app.on("step", this.step.bind(this));

  this.progress = 1;
  this.lifetime = 0;

  app.transition = app.transition ? app.transition : 'split';
  app.transitionDuration = app.transitionDuration ?
    app.transitionDuration : 0.5;

};

PLAYGROUND.Transitions.plugin = true;

PLAYGROUND.Transitions.prototype = {

  enterstate: function(data) {

    this.app.screenshot = this.screenshot = this.app.layer.cache();

    if (data.prev) {

      this.lifetime = 0;
      this.progress = 0;

    }

  },

  postrender: function() {

    if (this.progress >= 1) return;

    var transition = PLAYGROUND.Transitions[this.app.transition];

    transition(this.app, this.progress, this.screenshot);

  },

  step: function(delta) {

    if (this.progress >= 1) return;

    this.lifetime += delta;

    this.progress = Math.min(this.lifetime / this.app.transitionDuration, 1);

  }

};

PLAYGROUND.Transitions.implode = function(app, progress, screenshot) {

  progress = app.ease(progress, "outCubic");

  var negative = 1 - progress;

  app.layer.save();
  app.layer.tars(app.center.x, app.center.y, 0.5, 0.5, 0, 0.5 + 0.5 * negative, negative);
  app.layer.drawImage(screenshot, 0, 0);

  app.layer.restore();

};

PLAYGROUND.Transitions.split = function(app, progress, screenshot) {

  progress = app.ease(progress, "inOutCubic");

  var negative = 1 - progress;

  app.layer.save();

  app.layer.a(negative).clear("#fff").ra();

  app.layer.drawImage(screenshot, 0, 0, app.width, app.height / 2 | 0, 0, 0, app.width, negative * app.height / 2 | 0);
  app.layer.drawImage(screenshot, 0, app.height / 2 | 0, app.width, app.height / 2 | 0, 0, app.height / 2 + progress * app.height / 2 + 1 | 0, app.width, Math.max(1, negative * app.height * 0.5 | 0));

  app.layer.restore();

};

/* file: src/layer/LoadingScreen.js */

/** Basic loading screen using cnavas
 *
 * In playground.js build this file will be appended after
 * `src/LoadingScreen.js` and, thus, will override it.
 */

PLAYGROUND.LoadingScreen = {

  logoRaw: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAASBAMAAADPiN0xAAAAGFBMVEUAAQAtLixHSUdnaGaJioimqKXMzsv7/fr5shgVAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB98EAwkeA4oQWJ4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB9klEQVQ4y72UvW+rMBDAz+FrpVKrrFmesmapWNOlrKjSe1kZ+uoVAvj+/frujG1SaJcqJwU7voOf7xMQzQmsIDi5NPTMsLRntH3U+F6SAZo3NlCvcgBFJz8o+vkDiE63lI95Y/UmpinsZWkgJWJiDbAVQ16htptxSTNloIlugwaw001Ey3ASF3so6L1qLNXzQS5S0UGKL/CI5wWNriE0UH9Yty37LqIVg+wsqu7Ix0MwVBSF/dU+jv2SNnma021LEdPqVnMeU3xAu0kXcSGjmq7Ox4E2Wn88LZ2+EFj3avjixzai6VPVyuYveZLHF2XfdDnvAq27DIHGuq+0DJFsE30OtB1KqOwd8Dr7PcM4b+jfj2g5lp4WyntBK66qua3JzEA+uXJpwH/NlVuzRVPY/kTLB2mjuN+KwdZ8FOy8j2gDbEUSqumnSCY4lf4ibq3IhVM4ycZQRnv+zFqVdJQVn6BxvUqebGpuaNo3sZxwBzjajiMZOoBiwyVF+kCr+nUaJOaGpnAeRPPJZTr4FqmHRXcneEo4DqQ/ftfdnLeDrUAME8xWKPeKCwW6YkEpXfs3p1EWJhdcUAYP0TI/uYaV8cgjwBovaeyWwji2T9rTFIdS/cP/MnkTLRUWxgNNZVin7bT5fqT9miDcUVJzR1gRpfIONMmulU+5Qqr6zXAUqAAAAABJRU5ErkJggg==",

  create: function() {

    var self = this;

    this.logo = new Image;

    this.logo.addEventListener("load", function() {
      self.ready = true;
    });

    this.logo.src = this.logoRaw;


    if (window.getComputedStyle) {
      // this.background = window.getComputedStyle(document.body).backgroundColor || "#000";
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
      if (this.animation.finished) this.locked = false;
    } else {
      this.current = this.current + Math.abs(this.app.loader.progress - this.current) * delta;
    }

  },

  ready: function() {


  },

  render: function() {

    if (!this.ready) return;

    this.app.layer.clear(this.app.background);

    this.app.layer.fillStyle("#fff");

    this.app.layer.save();
    this.app.layer.align(0.5, 0.5);
    this.app.layer.globalCompositeOperation("lighter");
    this.app.layer.drawImage(this.logo, this.app.center.x, this.app.center.y);

    var w = this.current * this.logo.width;

    this.app.layer.fillStyle("#fff");

    this.app.layer.fillRect(this.app.center.x, this.app.center.y + 32, w, 12);
    this.app.layer.fillRect(this.app.center.x, this.app.center.y + 32, this.logo.width, 4);

    this.app.layer.restore();

  }

};