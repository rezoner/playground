{

}

<style>
  #content a {
    background: #666;
    box-shadow: 0 4px 0 #222;
    border-radius: 3px;
    color: #aaa;
    border-top: 1px solid #888;
    border-left: 1px solid #888;
    border-right: 1px solid #888;
    margin-right: 8px;    
  }  
</style>

## What is Playground.js?

Playground.js is a game oriented javascript framework that gives you access to essentials like mouse, keyboard, sound and well designed architecture. The rest is up to you. Whether you prefer to roll your own physics library or use Box2D - playground will not get into your way.

<?=cms::compose('documents/intro/intro-example.js')?>

[download](<?=cms::url('standalone/playground.zip')?>) Template project with &lt;canvas&gt; based renderer

[download](<?=cms::url('standalone/playground-base.zip')?>) Template without any renderer.

[download](https://github.com/rezoner/playground/tree/master/build) Standalone on GitHub

## What does it do? 

At the very core it provides out-of-box surface with all essential events.

```javascript
playground({

  width: 640,
  height: 480,
  scale: 2,

  create: function() { },
  ready: function() { },
  resize: function() { },

  step: function(dt) { },
  render: function() { },

  keydown: function(data) { },
  keyup: function(data) { },
  
  mousedown: function(data) { },
  mouseup: function(data) { },
  mousemove: function(data) { },

  touchstart: function(data) { },
  touchend: function(data) { },
  touchmove: function(data) { },

  gamepaddown: function(data) { },
  gamepadup: function(data) { },
  gamepadmove: function(data) { }

});
```

or 
```javascript
new PLAYGROUND.Application(...);
```

## What else?

Optional basics like `sound`, `states`, `canvas`, `easing`, `tweening` and `loaders`

## The goal is to provide a framework that:

* Takes care of basic APIs
* Lets developer use **his own** solutions for **physics**, **collisions**, **entities**...
* Makes a good base regarding both **prototyping** and **scalability**
* Provides sane defaults out-of-box

## Target platforms:

* Games in cutting edge browsers
* Games on desktop with [NW.js](http://nwjs.io/)


## It is especially for you if:

* You spend more and more time bending some engine to your will rather than implementing what you need.
* The voices in your head are telling you to participate in Ludum Dare

## Not convinced. Show me something cool.

<div class="showcase">
  <a href="http://playgroundjs.com/demos/space/"><img src="<?=cms::url("files/thumbs/space.png")?>"></a>
  <a href="http://store.steampowered.com/app/329320/"><img src="<?=cms::url("files/thumbs/qbqbqb.png")?>"></a>
  <a href="http://feiss.be/ld31/"><img src="<?=cms::url("files/thumbs/orion.png")?>"></a>
  <a href="http://rezoner.net/labs/limbs/"><img src="<?=cms::url("files/thumbs/limbs.png")?>"></a>
  <a href="http://hotlinetrail.rezoner.net/"><img src="<?=cms::url("files/thumbs/hotlinetrail.png")?>"></a>
  <a href="http://rezoner.net/labs/3d/a4/"><img src="<?=cms::url("files/thumbs/boats.png")?>"></a>
  <a href="http://playgroundjs.com/demos/threejs/"><img src="<?=cms::url("files/thumbs/three-boat.png")?>"></a>
  <a href="http://playgroundjs.com/three"><img src="<?=cms::url("files/thumbs/three-car.png")?>"></a>
  <a href="http://jackrugile.com/pongoo/"><img src="<?=cms::url("files/thumbs/jack-pong.png")?>"></a>

</div>

## I want to give it a go

Straight ahead to [Getting Started](<?=cms::url("intro/getting-started")?>)

