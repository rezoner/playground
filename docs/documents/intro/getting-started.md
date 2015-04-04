{

}

## What is Playground.js?

Playground.js is a framework for your javascript based games. It gives you out-of-box access to essentials like mouse, keyboard, sound and well designed architecture that you can expand to your needs.

<?=cms::compose('documents/intro/intro-example.js')?>

## Is it for me? 

Yes, if:

* You spend more and more time bending some engine to your will rather than implementing what you need.
* You have a kind of mindset that tells you have to take part in Ludum Dare

## Not convinved. Show me something cool made with it.

<div class="showcase">
  <a href="http://playgroundjs.com/demos/space/"><img src="<?=cms::url("files/thumbs/space.png")?>"></a>
  <a href="http://store.steampowered.com/app/329320/"><img src="<?=cms::url("files/thumbs/qbqbqb.png")?>"></a>
  <a href="http://feiss.be/ld31/"><img src="<?=cms::url("files/thumbs/orion.png")?>"></a>
  <a href="http://rezoner.net/labs/limbs/"><img src="<?=cms::url("files/thumbs/limbs.png")?>"></a>
  <a href="http://hotlinetrail.rezoner.net/"><img src="<?=cms::url("files/thumbs/hotlinetrail.png")?>"></a>
  <a href="http://rezoner.net/labs/3d/a4/"><img src="<?=cms::url("files/thumbs/boats.png")?>"></a>
</div>

<script>

  
</script>


## To the code

All you have to do to start an application is:

```javascript
var app = playground({

});
```

Or if this suits your code style more:

```javascript
var app = new PLAYGROUND.Application({

});
```

You might not see anything on the screen - but the application is there. It's silently running and waiting for you to describe what you want it to do.

