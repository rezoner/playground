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