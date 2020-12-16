class Node {
  constructor(item, parent) {
    this.item = item;
    this.parent = parent;
  }

  setChildren(children) {
    this.children = children;
  }

  get value() {
    return this.item.value;
  }

  get id() {
    return this.item.id;
  }

  get parent_id() {
    return this.item.parent_id;
  }

  incValue(part, fromNodeId, direction = "up") {
    this.item.value += Math.floor(part * 100) / 100;
    if (direction === "up") {
      if (this.parent) this.parent.incValue(part / 4, this.id);
      if (this.children)
        this.children
          .filter((child) => child.id !== fromNodeId)
          .forEach((child) => {
            child.incValue(Math.min(part / 10, child.value), this.id, "down");
          });
    }
  }

  incNodeById(id, part) {
    if (id === this.id) this.incValue(part);
    else this.children.forEach((child) => child.incNodeById(id, part));
  }
}

module.exports = (...args) => new Node(...args);
