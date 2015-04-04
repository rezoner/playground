(function() {

  var $ = {};

  $.Particle = function(opt) {
    this.radius = 7;
    this.x = opt.x;
    this.y = opt.y;
    this.angle = opt.angle;
    this.speed = opt.speed;
    this.accel = opt.accel;
    this.decay = 0.01;
    this.life = 1;
  };

  $.Particle.prototype.step = function(i) {
    this.speed += this.accel;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.angle += $.PI / 64;
    this.accel *= 1.01;
    this.life -= this.decay;

    if (this.life <= 0) {
      $.particles.splice(i, 1);
    }
  };

  $.Particle.prototype.draw = function(i) {
    $.ctx.fillStyle = $.ctx.strokeStyle = 'hsla(' + ($.tick + (this.life * 120)) + ', 100%, 60%, ' + this.life + ')';
    $.ctx.beginPath();
    if ($.particles[i - 1]) {
      $.ctx.moveTo(this.x, this.y);
      $.ctx.lineTo($.particles[i - 1].x, $.particles[i - 1].y);
    }
    $.ctx.stroke();

    $.ctx.beginPath();
    $.ctx.arc(this.x, this.y, Math.max(0.001, this.life * this.radius), 0, $.TWO_PI);
    $.ctx.fill();

    var size = Math.random() * 1.25;
    $.ctx.fillRect(~~(this.x + ((Math.random() - 0.5) * 35) * this.life), ~~ (this.y + ((Math.random() - 0.5) * 35) * this.life), size, size);
  }

  $.step = function() {
    $.particles.push(new $.Particle({
      x: $.width / 2 + Math.cos($.tick / 20) * $.min / 2,
      y: $.height / 2 + Math.sin($.tick / 20) * $.min / 2,
      angle: $.globalRotation + $.globalAngle,
      speed: 0,
      accel: 0.01
    }));

    $.particles.forEach(function(elem, index) {
      elem.step(index);
    });

    $.globalRotation += $.PI / 6;
    $.globalAngle += $.PI / 6;
  };

  $.draw = function() {
    // $.ctx.clearRect(0, 0, $.width, $.height);

    $.ctx.save();

    $.ctx.globalCompositeOperation = 'lighter';

    $.particles.forEach(function(elem, index) {
      elem.draw(index);
    });

    $.ctx.restore();

  };

  $.init = function(canvas, context) {

    $.initialized = true;

    $.canvas = canvas;
    $.ctx = context;
    $.width = $.canvas.width;
    $.height = $.canvas.height;
    $.min = $.width * 0.5;
    $.particles = [];
    $.globalAngle = 0;
    $.globalRotation = 0;
    $.tick = 0;
    $.PI = Math.PI;
    $.TWO_PI = $.PI * 2;
    $.loop();
    $.rtick = 0;
  };

  $.loop = function(delta) {
    $.step();
    $.draw();
    $.rtick += delta * 40;
    $.tick = $.rtick | 0;
  };

  window.prettyEffectByJackRugile = function(playground, delta) {
    
    if(!$.initialized) $.init(playground.layer.canvas, playground.layer.context);
   
    $.loop(delta);

  }; 

})();