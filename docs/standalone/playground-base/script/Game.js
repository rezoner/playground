ENGINE.Game = {

  create: function() {
    
    this.app.container.appendChild(this.app.images.giana);

    this.app.images.giana.style.width = "100px";

    var text = document.createElement("span");
    
    text.innerHTML = "There is no renderer so I am using DOM to display anything and route you to script/Game.js file"
    text.style.font = "32px arial"
    
    this.app.container.appendChild(text);

  },

  step: function(dt) {

    /* update your game logic here */

  },

  render: function() {

    /* put your render calls there */

  }

};
