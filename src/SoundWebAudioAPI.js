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