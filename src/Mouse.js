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