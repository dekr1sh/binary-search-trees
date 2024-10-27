import {Node} from "./node.js";

function Tree(array){
    // Sort the array and remove duplicates to build a balanced BST
    const sortedArray = [...new Set(array.sort((a, b) => a - b))];
    let root = buildTree(sortedArray);

    // Function to return the root node
    function getRoot(){
        return root;
    }

    // Function to build a balanced BST from a sorted array
    function buildTree(array) {                      
        if (array.length === 0) return null;
    
        const mid = Math.floor(array.length / 2);
        const root = Node(array[mid]);
    
        root.left = buildTree(array.slice(0, mid));
        root.right = buildTree(array.slice(mid + 1));
    
        return root;
    }

    // Insert a value in the BST
    function insert(value, node = root) {
        if (!node) return Node(value);
        else if (value < node.data){
            node.left = insert(value, node.left);
        }
        else if (value > node.data){
            node.right = insert(value, node.right);
        }
        return node;
    }
    
    // Delete a value from the BST
    function deleteItem(value, node = root) {
        if (!node) return null;
        else if (value < node.data) {
            node.left = deleteItem(value, node.left);
        }
        else if (value > node.data) {
            node.right = deleteItem(value, node.right);
        }
        else {
            if (!node.left) return node.right;               
            else if (!node.right) return node.left;
    
            let successor = node.right;
            while (successor.left) {
                successor = successor.left;
            } 
            node.data = successor.data;
            node.right = deleteItem(successor.data, node.right);
        }
        return node;
    }
    
    // Find a node by value in the BST
    function find(value, node = root) {
        if (!node || node.data === value) return node;
        return value < node.data ? find(value, node.left) : find(value, node.right);
    }
    
    // Level-order traversal
    function levelOrder(callback) {
        if (!callback) throw new Error("Callback function required");
        const queue = [root];
        while (queue.length) {
          const node = queue.shift();
          callback(node);
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
        }
    }
    
    // Inorder traversal
    function inOrder(callback, node = root) {
        if (!callback) throw new Error("Callback function required");
        if (node) {
          inOrder(callback, node.left);
          callback(node);
          inOrder(callback, node.right);
        }
    }
    
    // Preorder traversal
    function preOrder(callback, node = root) {
        if (!callback) throw new Error("Callback function required");
        if (node) {
          callback(node);
          preOrder(callback, node.left);
          preOrder(callback, node.right);
        }
    }
    
    // Postorder traversal
    function postOrder(callback, node = root) {
        if (!callback) throw new Error("Callback function required");
        if (node) {
          postOrder(callback, node.left);
          postOrder(callback, node.right);
          callback(node);
        }
    }
    
    // Height of a node
    function height(node) {
        if (!node) return -1;
        return 1 + Math.max(height(node.left), height(node.right));
    }
    
    // Depth of a node
    function depth(targetNode, node = root, edges = 0) {
        if (!node) return -1;
        if (node === targetNode) return edges;
        return targetNode.data < node.data
          ? depth(targetNode, node.left, edges + 1)
          : depth(targetNode, node.right, edges + 1);
    }
    
    // Check if the tree is balanced
    function isBalanced(node = root) {
        if (!node) return true;
        const heightDiff = Math.abs(height(node.left) - height(node.right));
        return heightDiff <= 1 && isBalanced(node.left) && isBalanced(node.right);
    }
    
    // Rebalance the tree
    function rebalance() {
        const nodes = [];
        inOrder(node => nodes.push(node.data));
        root = buildTree(nodes);
    }

    // Pretty-print the tree
    function prettyPrint(node = root, prefix = "", isLeft = true) {
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
    }

    return { 
        getRoot, insert, deleteItem, find, height, depth, prettyPrint,
        levelOrder, inOrder, preOrder, postOrder,  isBalanced, rebalance,
    };
    
}

export {Tree};