{

}

# Foreword

Hiya. You have reached the most boring part of playground documentation in which I will explain you how playground works internally.

This has the most value for people who:

* Want to develop their own framework
* Want to develop plugins for playground
* Use playground as immutable part of their workshop and need deeper understanding

# EVENT EXECUTION ORDER

Example:

* Application is listening to mouse. 
* Mouse emits `mousedown` event

All the playground is really about - is distributing this event to proper objects. From end-user perspective playground job is to get rid of risky events driven architecture and turn it into predictable `input -> application -> state` hierarchy which is easy to manage and prevents application to develop as a spaghetti made of listeners.

Playground categorizes events into two gorups:

Local events: `create`, `ready`, `createstate`, `enterstate`, `leavestate`

```
local event (such as create) should not flow to the state

1. Retrigger the event in context of application. 
   (modules and plugins are listening)

2. If application has a method named same as object it gets called
```

Global events: `everything else`

```
global event (such as mousedown) should flow down to the state

1. Retrigger the event in context of application. 
   (modules and plugins are listening)

2. If application has a method named same as object it gets called
   (however if loader is loading this step is not executed)

3. If current STATE has a method named same as object it gets called   

4. Retrigger the event in context of application with `post` prefix
   (it gives plugins possibility to apply post-rendering or any
    other form of final manipulation)
```



# APPLICATION EXECUTION ORDER

```javascript
new PLAYGROUND.Application(args) {
```
* Create mouse, keyboard, tween and other default modules
* Determine size and scale of application
* Instantiate plugins (new PLAYGROUND.MyPlugin)
* Create loader and give it fake object to keep it busy for a second

```javascript
}
```


```
^
| Wait one cycle so the rest of script gets parsed and 
| user have a chance to fill his namespaces 
| disregarding order of execution.
v
```

* emit create event (local)
* emit resize event (global)
* set application state to PLAYGROUND.LoadingScreen

```
^
| Loader is loading...
| at this point Application is not handling events
| however plugins and states do their job normally
v
```

* set application state to PLAYGROUND.DefaultState (it does nothing)
* emit ready event (global)

# WHAT HAPPENS WHEN APPLICATION CHANGES ITS STATE?

* if entering new state for the first time
  * emit local `createstate` event with new state
  * if new state has `create` method - invoke it


* emit local `leavestate` event with old state
* if old state has `leave` method - invoke it
* at this point old state can set itself to `locked` and force application to wait until the lock is gone. This gives it opportunity to visually prepare for a transition (for example - loading bar will finish its animation despite loading has already ended)

* emit local `enterstate` event with new and old state
* if new state has `enter` method - invoke it
 
