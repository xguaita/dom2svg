var root = {
  "name": "BODY",
  "children": []
};

function updateChilds(d) {
  var childs = [];
  for (var i = 0; i < d.children.length; i++) {
    if (d.children[i].nodeType === 1) { // document.ELEMENT_NODE
      var node = {
        "name": d.children[i].tagName,
        "children": []
      };

      if (d.children[i].children.length > 0) {
        node.children = updateChilds(d.children[i]);
      }

      childs.push(node);
    }
  }
  return childs;
}

exports.createTree = function (body) {
  root.children = updateChilds(body);
  return root;
};
