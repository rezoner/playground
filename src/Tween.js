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

      for (var i = 0; i < this.keys.length; i++) {

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
