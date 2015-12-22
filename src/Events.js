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