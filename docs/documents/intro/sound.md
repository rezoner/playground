{

}

# Sound and Music

Playground prefers `ogg` then `mp3`. 

For the best consistency you should provide both.

You can also perform `preferedAudioFormat: "mp3"`

Click the mouse around.

run
```javascript
var ENGINE = { };

ENGINE.Game = {

  enter: function() {
    
    this.app.music.play("music", true);

  },

  render: function() {

    this.app.layer.clear("#088");

  },

  mousedown: function() {

    this.app.sound.play("laser");

  }

};

app = playground({

  create: function() {

    this.loadSounds("laser", "music")

  },

  ready: function() {

    this.setState(ENGINE.Game);

  },

  container: exampleContainer

});
```

[Read more](<?=cms::url('playground-sound')?>) about sound and music in playground.