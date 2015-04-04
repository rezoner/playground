PLAYGROUND.GameLoop = function(app) {

  app.lifetime = 0;

  var self = app;

  var lastTick = Date.now();

  function step() {

    requestAnimationFrame(step);

    var delta = Date.now() - lastTick;
    lastTick = Date.now();

    if (delta > 1000) return;

    var dt = delta / 1000;

    self.lifetime += dt;
    self.elapsed = dt;

    self.emitGlobalEvent("step", dt)
    self.emitGlobalEvent("render", dt)
    self.emitGlobalEvent("postrender", dt)

  };

  requestAnimationFrame(step);

};