class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

class BinaryTree {
  constructor(array) {
    this.root = null;
  }

  buildTree(array) {
    const set = new Set(array.sort((a, b) => a - b));
    const sortedArray = [...set];

    this.root = new Node(sortedArray[Math.floor(sortedArray.length / 2)]);

    for (let i = 0; i < sortedArray.length; i++) {
      if (this.root.data !== sortedArray[i]) {
        let newNode = new Node(sortedArray[i]);
        this.insertNode(this.root, newNode);
      }
    }
    return this.root;
  }

  insertNode(root, node) {
    if (root.data === node.data) {
      return;
    }
    if (node.data < root.data) {
      if (root.left === null) {
        root.left = node;
      } else {
        this.insertNode(root.left, node);
      }
    } else {
      if (root.right === null) {
        root.right = node;
      } else {
        this.insertNode(root.right, node);
      }
    }
  }

  insert(value) {
    let newInsert = new Node(value);
    this.insertNode(this.root, newInsert);
  }
}

const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = new BinaryTree();

tree.buildTree(data);
tree.insert(17);
tree.insert(18);
tree.insert(98);
tree.insert(98);
tree.insert(98);
prettyPrint(tree.root);
