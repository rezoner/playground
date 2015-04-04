{}


* Introduction
  * [Getting started](<?=cms::url("intro/getting-started")?>)
  * [Rendering](<?=cms::url("intro/rendering")?>)
  * [Images](<?=cms::url("intro/images")?>)
  * [Mouse and Keyboard](<?=cms::url("intro/mouse-and-keyboard")?>)
  * [Logic step](<?=cms::url("intro/logic-step")?>)
  * [States](<?=cms::url("intro/states")?>)
  * [Sound and music](<?=cms::url("intro/sound")?>)
  * [Easing](<?=cms::url("intro/easing")?>)
  * [Tween](<?=cms::url("intro/tween")?>)
  * [Size and Scaling](<?=cms::url("intro/scaling")?>)

* Reference

  * [Layer](<?=cms::url("playground-layer")?>)
  * [States](<?=cms::url("playground-states")?>)
  * [Sound and music](<?=cms::url("playground-sound")?>)
* Input
  * [Mouse and touch](<?=cms::url("playground-mouse")?>)
  * [Keyboard](<?=cms::url("playground-keyboard")?>)
  * [Gamepads](<?=cms::url("playground-gamepads")?>)    
  * [Mouse lock](<?=cms::url("playground-mouse-lock")?>)
* Loaders
  * [Paths](<?=cms::url("playground-paths")?>)
  * [Images](<?=cms::url("playground-images")?>)
  * [Atlases](<?=cms::url("playground-atlases")?>)
  * [Data/JSON](<?=cms::url("playground-data")?>)
* Utils
  * [Ease](<?=cms::url("playground-ease")?>)
  * [Tween](<?=cms::url("playground-tween")?>)
* Internals
  * [Application flow](<?=cms::url("playground-flow")?>)
  

<div class="spacer"></div>

<script>
var elements = document.querySelectorAll("a");

for(var i = 0; i < elements.length; i++) {
  var element = elements[i];

  if(element.getAttribute("href") === window.location.pathname) {
    element.classList.toggle("selected", true);
  }
}
</script>