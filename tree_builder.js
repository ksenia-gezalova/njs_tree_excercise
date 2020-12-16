const Node = require("./node_struct");

const valueCorrector = (item) => {
  item.value =
    typeof item.value === "number" ? Math.floor(item.value * 100) / 100 : 0;
};

const itemIsValid = (item) => item.id && !item.default_parent;
const onlyId = (item) => item.id;
const isRootChild = (parentsIdsListWithoutRoot) => {
  return (item) => !parentsIdsListWithoutRoot.includes(item.parent_id);
};

const buildTree = (items) => {
  const root = items.find((node) => node.default_parent);
  valueCorrector(root);

  items = items.filter(itemIsValid);
  items.forEach(valueCorrector);

  const tree = Node(root, null);

  const parentsIdsListWithoutRoot = items.map(onlyId);
  const rootChildren = items
    .filter(isRootChild(parentsIdsListWithoutRoot))
    .map((item) => Node(item, tree));

  tree.setChildren(rootChildren);
  recursiveTreeBuilder(tree, items);

  return tree;
};

const isMyBoy = (parent) => (child) => child.parent_id === parent.id;

const recursiveTreeBuilder = (parent, items) => {
  parent.children.forEach((node) => {
    node.children = items.filter(isMyBoy(node)).map((item) => Node(item, node));
    recursiveTreeBuilder(node, items);
  });
};

module.exports = (items) => buildTree(items);
