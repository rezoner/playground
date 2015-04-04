var InlineEditor = function(element) {

  this.anchorURL = "#code" + (++this.counter);

  var anchor = document.createElement("div");
  anchor.setAttribute("id", this.anchorURL);
  element.parentNode.insertBefore(anchor, element);

  this.textarea = document.createElement("textarea");

  this.textarea.value = element.innerText || element.textContent;
  this.textarea.style.width = element.clientWidth;
  this.textarea.style.height = element.clientHeight;

  var foo = element.nextSibling;
  while (foo.nodeType != 1) {
    foo = foo.nextSibling;
  }

  this.example = foo;

  element.parentNode.replaceChild(this.textarea, element);

  this.textarea.value = this.textarea.value.trim();

  this.editor = CodeMirror.fromTextArea(this.textarea, {
    theme: "neo",
    mode: "javascript",
    lineNumbers: true,
    viewportMargin: Infinity
  });

  var inlineEditor = this;

  this.editor.on("change", function(c) {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(function() {
      inlineEditor.onchange(c.doc.getValue());
    }, 250);
  });


  ga('send', 'event', 'editor', 'run');

};

InlineEditor.prototype = {

  counter: 1,

  onchange: function(code) {

    var originalHeight = this.example.clientHeight;

    while (this.example.firstChild) {
      this.example.removeChild(this.example.firstChild);
    }

    (function(exampleContainer) {
      try {
        var script = code.replace(/document.body/g, "exampleContainer");
        eval(script);

        loadImages.onready = function() {          
          exampleContainer.style.height = "auto";
        }

      } catch (e) {

      }
    })(this.example);

    this.example.style.height = originalHeight;

  }

};