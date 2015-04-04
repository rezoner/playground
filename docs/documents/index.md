{

}

## What is Playground.js?

Playground.js is a game oriented javascript framework that gives you access to essentials like mouse, keyboard, sound and well designed architecture. The rest is up to you. Whether you prefer to roll your own physics library or use Box2D - playground will not get into your way.

<?=cms::compose('documents/intro/intro-example.js')?>

## How does it look like?

```javascript
var app = new PLAYGROUND.Application({

  create: function() {

    /* put your loaders here */
    /* playground provides some for loading images and sound */

  },

  ready: function() {

    /* assets has been loaded - do something */

  },

  step: function(dt) {

    /* update game logic here */

  },

  render: function() {

    /* render your game */

  },

  keydown: function(data) {

    /* the key has been pressed */
    /* playground will give you human readable data key names such as
       shift, ctrl, alt, a, b, c, 1, 2, 3 */

  }

});
```

## Is it for me? 

Yes, if:

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
</div>

## I want to give it a go

Straight ahead to [Getting Started](<?=cms::url("intro/getting-started")?>)

