{

}

# Naming conventions.

At some point of playground's life it looked like this. It was just an addition to CanvasQuery library.

```javascript
cq.framework({
  
  onmousedown: function() {

    this /* was the reference to the layer itself! */

  }

});
```

It was very convenient form. Out of box solution to deploy a small canvas laboratory. I've developed it because I was bored with starting every CSSDeck experiment from scratch - and you could post any mediocre particle effect and get thousands of views back then because people were still stuck with CSS.

`onmousedown` small cased - because this is how DOM does that

At some point I've turned to `onMouseDown` but I don't know neither my reasoning of doing that and reverting back. As far as I remember - I've had serious concerns what the name tells about where the event came from. 

`onModuleEvent` but what if `onModuleNameHasTwoCamelsEvent`

I have a little obsession about autoloading which I've seen in PHP.