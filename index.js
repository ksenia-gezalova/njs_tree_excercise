const Tree = require("./tree_data_mock.js");
const TreeBuilder = require("./tree_builder");

const tree = TreeBuilder(Tree);

const errorMode = false;
const incValue = (node_id, value_increment) => {
  if (value_increment <= 0) {
    if (errorMode) throw new Error("value_increment must be positive");
    else return;
  }
  tree.incNodeById(node_id, value_increment);
};

// Test cases
incValue(303, 303);
incValue(1701, -1701);
incValue(9000, 9000);

// Print-out the result
console.log(JSON.stringify(Tree, null, "\t"));
