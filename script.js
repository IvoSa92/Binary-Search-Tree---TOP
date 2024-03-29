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

  deleteItem(value, root = this.root) {
    if (root === null) return null;

    if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      root.data = this.findMin(root.right).data;
      root.right = this.deleteNode(root.right, root.data);
    }
    return root;
  }

  findMin(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  deleteNode(root, value) {
    if (root === null) {
      return root;
    }
    if (value < root.data) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.data) {
      root.right = this.deleteNode(root.right, value);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      let minNode = this.findMin(root.right);
      root.data = minNode.data;
      root.right = this.deleteNode(root.right, minNode.data);
    }
    return root;
  }

  find(value) {
    let root = this.root;
    while (root) {
      if (root.data === value) {
        return root;
      } else if (root.data < value) {
        root = root.right;
      } else if (root.data > value) {
        root = root.left;
      }
    }
    return null;
  }

  levelOrder(callback) {
    const queue = [];
    let node = this.root;
    queue.push(node);

    while (queue.length > 0) {
      node = queue.shift();

      if (node) {
        callback(node.data);

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
  }
  inOrder(callback = null) {
    const result = [];

    const traverseInOrder = (node) => {
      if (node.left) traverseInOrder(node.left);
      if (callback) {
        callback(node.data);
      } else {
        result.push(node.data);
      }
      if (node.right) traverseInOrder(node.right);
    };

    traverseInOrder(this.root);
    return callback ? undefined : result;
  }

  preOrder(callback = null) {
    const result = [];

    const traversePreOrder = (node) => {
      if (callback) {
        callback(node.data);
      } else {
        result.push(node.data);
      }
      if (node.left) traversePreOrder(node.left);
      if (node.right) traversePreOrder(node.right);
    };

    traversePreOrder(this.root);
    return callback ? undefined : result;
  }

  postOrder(callback = null) {
    const result = [];

    const traversePostOrder = (node) => {
      if (node.left) traversePostOrder(node.left);
      if (node.right) traversePostOrder(node.right);
      if (callback) {
        callback(node.data);
      } else {
        result.push(node.data);
      }
    };

    traversePostOrder(this.root);
    return callback ? undefined : result;
  }

  height(root = this.root) {
    if (!root) return 0;

    let left = this.height(root.left);
    let right = this.height(root.right);

    return Math.max(left, right) + 1;
  }

  depth(node = this.root) {
    node = this.find(node);
    if (!node) return null;

    let count = 0;
    let root = this.root;
    while (root) {
      if (node.value === root.value) {
        return count;
      } else if (node.value < root.value) {
        count++;
        root = root.left;
      } else if (node.value > root.value) {
        count++;
        root = root.right;
      }
    }
  }

  isBalanced(root = this.root) {
    if (!root) return null;

    let left = this.height(root.left);
    let right = this.height(root.right);
    if (Math.abs(left - right) > 1) {
      return false;
    }

    this.isBalanced(root.left);
    this.isBalanced(root.right);
    return true;
  }

  rebalance() {
    this.root = this.buildTree(this.levelOrder());
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
tree.insert(112);

prettyPrint(tree.root);
