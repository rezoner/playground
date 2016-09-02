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

  /* visibility API */

  document.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this));

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

    var url = this.rewriteURL(this.paths.base + folder + basename);

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

  handleVisibilityChange: function() {

    this.emitGlobalEvent("visibilitychange", {
      visible: !document.hidden,
      hidden: document.hidden
    });

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

      var extend = entry.key.indexOf("/") > -1;

      if (entry.ext === "json") {

        try {

          var data = JSON.parse(request.responseText);

        } catch (e) {

          console.error("JSON file corrupt " + name);

          return;

        }

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

      if (arg.constructor === Array) {

        for(var key = 0; key < arg.length; key++) {

            promises = promises.concat(this.loadImages(arg[key]));

        }

      }
      else if (typeof arg === "object") {

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
