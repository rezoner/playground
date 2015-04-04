{

}

# Playground - Sound and Music

Put your audio in `sounds/` directory

Prefered format is `ogg` then `mp3`

```javascript
app.loadSounds("fire", "death", "music");
```

Loader will look for `sounds/fire.ogg` or `sounds/fire.mp3` regarding audio format supported by browser.

You can change order of preference:

```javascript
playground({ 
  preferedAudioFormat: "mp3" 
});
```

## Sound vs Music

```
app.sound.play(...);
app.music.play(...);
```

Both sound and music are the same type of object. They are however split so you can adjust separate volumes.

## Play

```javascript
var sound = app.sound.play("fire", loop);
```

## Stop

```javascript
app.sound.stop(sound);
```


## Fade in

```javascript
var ambient = app.sound.play("ambient", loop);

app.sound.fadeIn(ambient);
```

## Fade out

```javascript
app.sound.fadeOut(ambient);
```

## Playback rate

Playback rate. Super useful for randomizing bullets sounds or making an engine effect.

```javascript
var loop = app.sound.play("engine", true);

app.sound.setPlaybackRate(loop, 0.5);
```

rate is a float value where `1.0` means `100%` - you can go beyond that.

Setting playback rate will change pitch/frequency of a sound.

## Volume

```javascript
var sample = app.playSound("something");

app.sound.setVolume(sample, 0.4);
```

## Master

Setting master volume

```javascript
app.sound.setMaster(0.4);
```

## Alias

Creates a new sound from existing one by modyfing its volume and playback rate.

```javascript
app.sound.alias(alias, source, volume, rate);
```

Example:

Mash `1`, `2`, `3` to get different explosions.
run
```javascript
playground({

  create: function() {

    this.loadSounds("explosion");

    this.sound.alias("small-explosion", "explosion", 0.5, 1.6);
    this.sound.alias("big-explosion", "explosion", 1.0, 0.5);

  },

  keydown: function(data) {

    this.playSound({
      1: "explosion",
      2: "small-explosion",
      3: "big-explosion"
    }[data.key]);

  },

  container: exampleContainer

});
```