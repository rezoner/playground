/*
  purpose of this library is not to be as clever and hacky as possible
  but to be readable so it could serve for basic javascript examples
*/


loadImages = function() {
  /* config */

  var path = loadImages.path;
  var count = arguments.length - 1;
  var images = {};

  /* last argument should be onready callback */

  var onready = arguments[arguments.length - 1];

  /* 
    rest of the arguments should be image names
    .png extension will be added automatically
  */

  for (var i = 0; i < arguments.length - 1; i++) {

    var image = new Image();
    var key = arguments[i];

    image.addEventListener("load", function() {

      if (--count <= 0) {

        if (loadImages.onready) {
          setTimeout(function() {
            loadImages.onready();
            loadImages.onready = null;
          }, 1);
        }

        onready(images);

      }

    });

    image.src = path + key + ".png";

    images[key] = image;
  }

};

loadImages.path = "images/";