/** Main application object for playground.js
  
  The object inherits from PLAYGROUND.Events and generates
  a number of events:

  - Local events:
    - create: the application is being constructed
    - ready: the application has been constructed
    - imageready: after an image was loaded
    - states events are broadcasted as local events.
  - Global events:
    - preload: allows loading custom resources
    - resize: window resize event
    - mouse, touch, keyboard and gamepads subcomponents
      have their events broadcasted as global events.
  The arguments that can be used to customize the application at
  initialization time are:
  - scale: the scale (may be auto-computed)
  - width: the width in pixels/scale (may be auto-computed if not specified)
  - height: the height in pixels/scale (may be auto-computed if not specified)
  - smoothing:
  - paths:
       - base: path always prepended
       - images: path relative to `base` for images
       - data: path relative to `base` for json and text files
       - atlases: texture atlases
       - sounds: music and sounds in mp3 and ogg formats
  - skipEvents: prevents core functions from emitting events
  - disabledUntilLoaded: no events in loading stage
  - LoadingScreen:
  - container: the document element hosting display area
  Internally, the application derives other variables:
  - autoWidth: adjust the width on resize
  - autoHeight: adjust the height on resize
  - autoScale: adjust the scale on resize
  - customContainer: true if the container is not the body element
  - offsetX: horizontal offset in pixels for effective drawing area
  - offsetY: vertical offset in pixels for effective drawing area
  - center: {x: , y: } in pixels/scale
  - firstBatch: set to true while initial loading is in progress
  Inner workings are logically divided into:
  - loader
  - states
  - mouse
  - touch
  - keyboard
  - gamepads
  - tweens
  - ease
  A number of arrays help manage the resources:
  - images: asset container
  - atlases: asset container
  - data: asset container
  - plugins: list of instantiated plug-ins
  - data: associative array for data objects loaded
*/

PLAYGROUND.Application = function(args) {

  var app = this;

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

  this.keyboard = new PLAYGROUND.Keyboard();
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

  window.addEventListener("resize", this.handleResize.bind(this));

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

  this.emitGlobalEvent("preload");

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
    smoothing: 1,
    paths: {
      base: "",
      images: "images/"
    },
    offsetX: 0,
    offsetY: 0,
    skipEvents: false,
    disabledUntilLoaded: true
  },

  /** Change active state.
   *
   * Simply forwarded to PLAYGROUND.States.
   */
  setState: function(state) {

    this.states.set(state);

  },

  /** Compute a fully qualified path.
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
       or leave as is */

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

    this.trigger("post" + event, data);

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

      if (entry.ext === "json") {
        app.data[entry.key] = JSON.parse(request.responseText);
      } else {
        app.data[entry.key] = request.responseText;
      }

      app.loader.success(entry.url);

    }

  },

  /** Loads a single image */

  loadImage: function() {

    return this.loadImages.apply(this, arguments);

  },

  /** Loads images.
   *
   * The list may be nested.
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

  /** Load a single font.
   *
   * At this point it doesn't really load font
   *  it just ensures the font has been loaded (use css font-face)
   */
  loadFont: function() {

    var promises = [];

    for (var i = 0; i < arguments.length; i++) {

      var arg = arguments[i];

      promises.push(this.loadFontItem(arg));

    }

    return Promise.all(promises);

  },

  /** Load fonts.  */
  loadFonts: function() {

    return this.loadFont.apply(this, arguments);

  },

  /** Load a single font (internal).  */
  loadFontItem: function(name) {

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

        });

      }

      this._fontPromises[name] = new Promise(promise);

    }

    return this._fontPromises[name];

  },

  /** Render placeholder */
  render: function() {

  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Application.prototype, PLAYGROUND.Events.prototype);