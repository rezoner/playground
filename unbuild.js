require('shelljs');
var cat = require('shelljs').cat;


var fs = require("fs");

var file = cat("build/playground-backup.js")

/* file: license.txt */

var temp = file.split("/* file: ");

for (var i = 0; i < temp.length; i++) {

  var current = temp[i];

  if (!current.length) continue;
  var index = current.indexOf("*/");

  var filename = current.substr(0, index).trim();

  console.log(filename, current.length)

  current = current.substr(index + 2);

  /*
    fs.writeFileSync("backup/" + filename, current.trim(), {
      encoding: "utf8"
    });
  */

  current.trim().to(filename)


}