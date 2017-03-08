PLAYGROUND.GameLoop = function(app) {

  app.lifetime = 0;
  app.ops = 0;
  app.opcost = 0;

  var lastTick = Date.now();
  var frame = 0;

  function render(dt) {

    app.emitGlobalEvent("prerender", dt)
    app.emitGlobalEvent("render", dt)
    app.emitGlobalEvent("postrender", dt)

  };

  function step(dt) {

    app.emitGlobalEvent("step", dt)

  };

  function gameLoop() {

    if (app.killed) return;

    requestAnimationFrame(gameLoop);

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

    step(dt);
    render(dt);

    app.opcost = delta / 1000;
    app.ops = 1000 / app.opcost;

  };

  requestAnimationFrame(gameLoop);

};