var domtree = require('./domtree.js'),
    drawdom = require('./drawdom.js'),
    jsdom = require("jsdom"),
    fs = require('fs');


// Main

// process.argv
if (process.argv.length < 4) {
  console.log("Error!!");
  console.log("node dom2svg.js <http://sample.com | ./path/page.html> <file_to_write>");
  return;
}

// load html page and run
jsdom.env(
  process.argv[2],  //http://chancegraham.com/
  function (err, window) {
    if (err) {
      console.log('Error when loading ' + process.argv[2]);
      return;
    }

    var body = window.document.querySelector('body'),
        svg= drawdom.drawTree(domtree.createTree(body));

    //write to file
    fs.writeFileSync(process.argv[3], svg);
  }
);

