var elements = document.body.querySelectorAll("pre");

for (var i = 0; i < elements.length; i++) {

  var element = elements[i];
  /*
    CodeMirror(function(c) {
      element.parentNode.replaceChild(c, element);
    }, {
      value: element.innerText || element.textContent,
      mode: "javascript",
      readOnly: true,
      theme: "neo",
      viewportMargin: Infinity
    });
  */

  element.addEventListener("dblclick", function() {
    new InlineEditor(this);
  });

}

var lastInLocation = window.location.href.split("/").pop();
var sidebar = document.body.querySelector("#sidebar");
var elements = document.body.querySelectorAll("#sidebar a");
for (var i = 0; i < elements.length; i++) {

  var element = elements[i];
  var url = element.getAttribute("href");

  var last = url.split("/").pop();

  if (last === lastInLocation) {
    var rect = element.parentNode.parentNode.parentNode.getBoundingClientRect();
    element.parentNode.parentNode.parentNode.classList.toggle("slightly-selected", true);
    sidebar.scrollTop = rect.top - 16;
    break;
  }

  // element.setAttribute("href", url + "#" + last);  

}