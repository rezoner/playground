var app = playground({

  pixelate: 4,

  create: function() {

    this.stage = new PIXI.Stage(0x66FF99);

    this.renderer = PIXI.autoDetectRenderer(this.width, this.height);

    this.container.appendChild(this.renderer.view);

  },

  renderer: function() {

    renderer.render(stage);

  },

  ready: function() {

  }

});

var texture = PIXI.Texture.fromImage("bunny.png");
// create a new Sprite using the texture
var bunny = new PIXI.Sprite(texture);

// center the sprites anchor point
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// move the sprite t the center of the screen
bunny.position.x = 200;
bunny.position.y = 150;

stage.addChild(bunny);

app.game = {

};