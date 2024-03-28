class Node {
  constructor(data) {
    this.data;
    this.right;
    this.left;
  }
}

class BinaryTree {
  constructor(array) {
    this.root = null;
  }

  buildTree(array) {
    const set = new Set(array.sort((a, b) => a - b));
    const sortedArray = [...set];

    // suche den mittleren wert der array und setze ihn als root node

    //durchlaufe die array , wenn die zahl kleiner ist als die root node prüfe ob es eine root.left gibt,
    //wenn nicht setze sie als root.left, wenn ja dann prüfe ob root.left größer oder kleiner ist als value und setze sie anhand dessen auf root.right oder left

    //ist der value gleich wie root oder root.left oder root.right dann lösche die node

    //return die root node
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
