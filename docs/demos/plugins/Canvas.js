PLAYGROUND.Canvas = {

  plugin: true,

  app: {

    create: function(app, data) {

      app.canvas = document.createElement("canvas");
      
      this.container.appendChild(app.canvas);

    },

    resize: function(app, data) {

      var canvas = app.canvas;

      canvas.width = app.width;
      canvas.height = app.height;

      canvas.canvas.style.transformOrigin = "0 0";
      canvas.canvas.style.transform = "translate(" + app.offsetX + "px," + app.offsetY + "px) scale(" + app.scale + ", " + app.scale + ")";

    }

  }

};