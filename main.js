import {Tree} from "./tree.js";

function getRandomNumbers(count, max) {
    const randomNumbers = [];
    for (let i = 0; i < count; i++) {
        randomNumbers.push(Math.floor(Math.random() * max));
    }
    return randomNumbers;
}

// Create a binary search tree from random numbers
const randomNumbers = getRandomNumbers(15, 100); // Generate 15 random numbers < 100
const bst = Tree(randomNumbers);

console.log("Initial random numbers:", randomNumbers);
console.log("\nInitial tree:");
bst.prettyPrint();  // Print the initial balanced BST

// Confirm that the tree is balanced
console.log("\nIs Balanced:", bst.isBalanced());

// Print elements in different orders
console.log("\nLevel Order:");
bst.levelOrder(node => console.log(node.data));
console.log("\nPre Order:");
bst.preOrder(node => console.log(node.data));
console.log("\nIn Order:");
bst.inOrder(node => console.log(node.data));
console.log("\nPost Order:");
bst.postOrder(node => console.log(node.data));

// Unbalance the tree by adding several numbers > 100
const unbalanceNumbers = [101, 105, 110, 115, 120];
unbalanceNumbers.forEach(num => bst.insert(num));

console.log("\nAfter adding numbers > 100 to unbalance the tree:");
bst.prettyPrint();  // Print the unbalanced BST

// Confirm that the tree is unbalanced
console.log("\nIs Balanced after unbalancing:", bst.isBalanced());

// Balance the tree
bst.rebalance();

// Confirm that the tree is balanced
console.log("\nAfter rebalance:");
console.log("Is Balanced:", bst.isBalanced());

// Print elements in different orders after rebalancing
console.log("\nLevel Order after rebalance:");
bst.levelOrder(node => console.log(node.data));
console.log("\nPre Order after rebalance:");
bst.preOrder(node => console.log(node.data));
console.log("\nIn Order after rebalance:");
bst.inOrder(node => console.log(node.data));
console.log("\nPost Order after rebalance:");
bst.postOrder(node => console.log(node.data));
