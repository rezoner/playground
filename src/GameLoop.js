PLAYGROUND.GameLoop = function(app) {

  app.lifetime = 0;

  var lastTick = Date.now();
  var frame = 0;

  function step() {

    requestAnimationFrame(step);

    if (app.frameskip) {
      frame++;
      if (frame === app.frameskip) {
        frame = 0;
      } else return;
    }

    var delta = Date.now() - lastTick;
    lastTick = Date.now();

    if (delta > 1000) return;

    var dt = delta / 1000;

    app.lifetime += dt;
    app.elapsed = dt;

    app.emitGlobalEvent("step", dt)
    app.emitGlobalEvent("render", dt)
    app.emitGlobalEvent("postrender", dt)

  };

  requestAnimationFrame(step);

};