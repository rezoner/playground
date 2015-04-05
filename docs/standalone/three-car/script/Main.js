var app = new PLAYGROUND.Application({

  pixelate: 6,

  create: function() {

    this.renderer = new THREE.WebGLRenderer({ 
      antialiasing: false
    });

    this.container.appendChild(this.renderer.domElement);

    /* tell CSS not interpolate when resizing things */

    this.container.style.imageRendering = "pixelated";

    this.renderer.setClearColor(0x552200);

    /* load a car object */

    this.loadObject("car");
    this.loadSound("midnight");

  },

  resize: function() {

    /* tell three.js that logical size is this.pixelate 
       times smaller than application size */

    this.renderer.setSize(
      this.width / this.pixelate, 
      this.height / this.pixelate
    );

    /* nevertheless resize application to expected size */

    this.renderer.domElement.style.width = this.width + "px";
    this.renderer.domElement.style.height = this.height + "px";

  },

  ready: function() {

    this.setState(ENGINE.Game);

    var music = this.music.play("midnight", true);
    this.music.fadeIn(music);

  }

});
