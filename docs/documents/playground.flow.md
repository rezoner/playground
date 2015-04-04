# APPLICATION EXECUTION FLOW

<pre>
new PLAYGROUND.Application(args) {
  
  1. Create mouse, keyboard, tween and other default modules
  2. Determine size and scale of application
  3. Instantiate plugins
  4. Create loader and give it fake object to keep it busy for a second

}

[ wait one cycle so the rest of script gets parsed so the user have a chance
  to fill his namespaces disregarding order of execution ]

^
|
| 1 cycle later
|
v

1. emit create event (local)
2. emit resize event (global)
3. set application state to PLAYGROUND.LoadingScreen

^
|
| loader is loading...
|
v

1. set application state to PLAYGROUND.DefaultState (it does nothing)
2. emit ready event (global)
</pre>