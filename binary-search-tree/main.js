import BinarySearchTree from "./binary-tree.js"

// 01 test -------------

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let testTree = new BinarySearchTree(arr)

testTree.prettyPrint()

console.log(testTree.levelOrder())
console.log(testTree.inOrder())
console.log(testTree.preOrder())
console.log(testTree.postOrder())

testTree.insert(24)
testTree.insert(90)
testTree.prettyPrint()

testTree.deleteItem(4)
testTree.deleteItem(0)
testTree.prettyPrint()

console.log(testTree.find(8))
console.log(testTree.height(67))


// 02 test ----------

let generateArray = (count, max = 100) => {
    return Array.from({length: count}, () => Math.floor(Math.random() * max))
}
let newArray = generateArray(16)
let newTest = new BinarySearchTree(newArray);

newTest.prettyPrint()