/** Animation played when changing state with ThRend render.
 *
 * Reference: http://playgroundjs.com/playground-transitions
 */
 PLAYGROUND.Transitions = function(app) {

 	this.app = app;

 	app.on("enterstate", this.enterstate.bind(this));

 	this.transitions = 0;

 	app.transition = app.transition ? app.transition : 'split';
 	app.transitionDuration = app.transitionDuration ?
    app.transitionDuration : 0.5;

  this.default_css_rules = {
    'split': '.split_hover_top {top: -50% !important;}' +
    '.split_hover_btm {bottom: -50% !important;}' +
    '.split {position: relative;overflow: hidden;background: transparent;}' +
    '.split .content {position: absolute; top: 50%;width: 100%;'+
    ' height: 100%; margin-top: auto;margin-bottom: auto;}' +
    '.split .image {z-index: 1;position: absolute;width: 100%;'+
    ' height: 100%;background-repeat: no-repeat;}' +
    '.split .upper.image, .split .lower.image {height: 50%;}' +
    '.split .upper.image {top: 0; -webkit-transition: top =D=s ease;' +
    ' -moz-transition: top =D=s ease; -o-transition: top =D=s ease;' +
    ' -ms-transition: top =D=s ease; transition: top =D=s ease;}' +
    '.split .lower.image {bottom: 0; background-position: 0% 100%;' +
    ' -webkit-transition: bottom =D=s ease; -moz-transition: bottom =D=s ease;' +
    ' -o-transition: bottom =D=s ease; -ms-transition: bottom =D=s ease;' +
    'transition: bottom =D=s ease;}',
    'implode': '.implode {position:relative;top:0px;'+
    ' left:0px;width:100%;height:100%;margin:0px;'+
    ' padding:0px;background-size:100%;background-repeat:no-repeat;'+
    ' background-position:50% 50%;-webkit-transition:all =D=s ease;'+
    ' -moz-transition:all =D=s ease;-ms-transition:all =D=s ease;'+
    ' -o-transition:all =D=s ease;transition:all =D=s ease;}'+
    '.implode_final {top:50% !important;left:50% !important;'+
    ' width:0px !important;height:0px !important;}',
    'fade': '.fade {margin: 0px;padding: 0px;background-size: 100%;'+
    ' background-repeat:no-repeat;background-position:50% 50%;'+
    ' -webkit-opacity: 1;-moz-opacity: 1;-ms-opacity: 1;-o-opacity: 1;'+
    ' opacity: 1;-webkit-transition: all =D=s ease;'+
    ' -moz-transition: all =D=s ease;-ms-transition: all =D=s ease;'+
    ' -o-transition: all =D=s ease;transition: all =D=s ease;}'+
    '.fade_final {-webkit-opacity: 0;-moz-opacity: 0;-ms-opacity: 0;'+
    ' -o-opacity: 0;opacity: 0;}'
  };

  this.css_rules = app.transitionCssRules ?
    app.transitionCssRules : this.default_css_rules[app.transition];

  this.css_rules = this.css_rules.replace(/=D=/g, app.transitionDuration);
  this.css_id = 'thrend_transition_css';
};


PLAYGROUND.Transitions.plugin = true;

PLAYGROUND.Transitions.prototype = {

  enterstate: function(data) {
	// make sure we have the styles in place
	this.injectOwnCSS();

  	// Initial Transitions:
  	//	 null -> DefaultState
  	//	 DefaultState -> LoadingScreen
  	//	 LoadingScreen -> FirstUserState
  	++this.transitions;
  	if (this.transitions < 3) {
      return;
    }

    var self = this;
    var thrend = this.app.thrend;
    if (!thrend) {
      var err = new Error('This Transitions can only be used '+
       'with ThRend renderer.');
      throw err;
    }

  	// get a screenshot and load it as an image
  	thrend.toImage(function(dataURL) {
      var transition = PLAYGROUND.Transitions[self.app.transition];
      transition(self.app, dataURL);
    });

    // if we wait for next scheduled render the state will be changed
    // so we do an extra render here to get the screen capture
    thrend.render();

  },


  /** Creates a new style element in the document head and inserts the content.
   *
   * @param cssCode css content to insert
   *
   * References:
   * - https://stackoverflow.com/questions/707565/how-do-you-add-css-with-javascript/6211716#6211716
   */
   addCss: function (cssCode) {
     var styleElement = document.createElement("style");
     styleElement.type = "text/css";
     if (styleElement.styleSheet) {
       styleElement.styleSheet.cssText = cssCode;
     } else {
       styleElement.appendChild(document.createTextNode(cssCode));
     }
     styleElement.setAttribute("id", this.css_id);
     document.getElementsByTagName("head")[0].appendChild(styleElement);
   },

  /**
   * Checks to see if custom css is not already inserted and inserts it
   *
   * We use these css rules to
   */
   injectOwnCSS: function() {
  	// the user may provide the rules in her own file.
  	if (!this.css_rules) return;
    // check if was already inserted
    var already_in = document.getElementById(this.css_id);
    if (already_in) return;
  	// do insert
  	this.addCss(this.css_rules);
  }
};

/** Compute the position of a DOM element.
 *
 * We assume no dependency here, so we need to implement our own.
 *
 * @param  the element to compute the position for.
 * @return {x:, y: } an object with computed values
 *
 * References:
 * - http://www.kirupa.com/html5/get_element_position_using_javascript.htm
 */
PLAYGROUND.Transitions.getPosition = function(element) {
  var xPosition = 0;
  var yPosition = 0;

  while(element) {
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    element = element.offsetParent;
  }
  return { x: xPosition, y: yPosition };
}

PLAYGROUND.Transitions.createLayer = function(app, screenshot) {
  var parent_pos = PLAYGROUND.Transitions.getPosition(app.container);
  var transLayer = document.createElement('div');
  var h2 = (app.height*app.scale);

  transLayer.id = 'transitionLayer';
  transLayer.style.position = 'absolute';
  transLayer.style.left = parent_pos.x + 'px';
  transLayer.style.top = parent_pos.y + 'px';
  transLayer.style.width = (app.width*app.scale) + 'px';
  transLayer.style.height = h2 + 'px';
  transLayer.style.padding = '0px';
  return transLayer;
}

PLAYGROUND.Transitions.done = function(tLayer, app, selector, final_class) {
  // setting the class directly does not work so we add a small delay
  setTimeout(function(){
    var subdiv = document.querySelector(selector);
    subdiv.className = subdiv.className + ' ' + final_class;

    // the timeout must be large enough toi allow for the transition
    // to reach final value
    setTimeout(function(){tLayer.remove(); }, app.transitionDuration+100);
  }, 10);
}


PLAYGROUND.Transitions.implode = function(app, screenshot) {
  var transLayer = PLAYGROUND.Transitions.createLayer(app, screenshot);
  transLayer.style.background = 'transparent';
  var img_sty = 'style="background-image:url(\'' + screenshot + '\')"';
  transLayer.innerHTML = '<div class="implode" ' + img_sty + '></div>';
  document.body.appendChild(transLayer);

  PLAYGROUND.Transitions.done(
    transLayer, app,
    '#transitionLayer > div.implode',
    'implode_final');
};

PLAYGROUND.Transitions.fade = function(app, screenshot) {
  var transLayer = PLAYGROUND.Transitions.createLayer(app, screenshot);
  transLayer.className = 'fade';
  transLayer.style.backgroundImage = 'url(\'' + screenshot + '\')';
  document.body.appendChild(transLayer);
  PLAYGROUND.Transitions.done(
    transLayer, app,
    '#transitionLayer',
    'fade_final');
};

PLAYGROUND.Transitions.split = function(app, screenshot) {
  var transLayer = PLAYGROUND.Transitions.createLayer(app, screenshot);
  transLayer.className = 'split';
  var img_sty = 'style="background-image:url(\'' + screenshot + '\')"';
  transLayer.innerHTML =
    '<div class="upper image" ' + img_sty + '></div>' +
    '<div class="lower image" ' + img_sty + '></div>';
  document.body.appendChild(transLayer);

  // setting the class directly does not work so we add a small delay
  setTimeout(function(){
    // we simply change the position of the two parts;
    // note that changing transLayer.style.top is not enough, apparently
    var subdiv = document.querySelector('#transitionLayer > div.upper');
    subdiv.className = subdiv.className+' split_hover_top';
    subdiv = document.querySelector('#transitionLayer > div.lower');
    subdiv.className = subdiv.className + ' split_hover_btm';

    // the timeout must be large enough toi allow for the transition
    // to reach final value
    setTimeout(function(){transLayer.remove(); }, app.transitionDuration+100);

  }, 10);
};
