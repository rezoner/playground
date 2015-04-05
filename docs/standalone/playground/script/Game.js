ENGINE.Game = {

  create: function() {

  },

  step: function(dt) {

    /* update your game logic here */

  },

  render: function() {

    /* get reference to the application */

    var app = this.app;

    /* get reference to drawing surface */

    var layer = this.app.layer;

    /* clear screen */

    layer.clear("#222");

    /* save all setting of drawing pointer */
    
    layer.save();

    /* translate drawing pointer to the center of screen */

    layer.translate(app.center.x, app.center.y);

    /* set rotation point of all sprites/images to their center */

    layer.align(0.5, 0.5);

    /* tell the drawing pointer to scale everything x 3 */

    layer.scale(3, 3);

    /* draw sprite */

    layer.drawImage(app.images.giana, 0, 0);

    /* draw text - this is not affected by align */

    layer
      .fillStyle("#fff")
      .textAlign("center")
      .fillText("Do you remember me?", 0, 24)
      .fillText("Find me in script/Game.js", 0, 48);

    /* restore drawing pointer to its previous state */

    layer.restore();

  }

};
