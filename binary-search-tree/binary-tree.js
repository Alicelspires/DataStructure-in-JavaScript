import Node from "./node.js";
import mergeSort from "../merge-sort/mergeSort.js"

export default class BinarySearchTree{
    constructor(arr){
        let sortedArray = [...new Set(arr)];
        let array = mergeSort(sortedArray)
        this.root = this.buildTree(array);
    }

    buildTree(arr){
        if(arr.length == 0) return null;

        let middle = Math.floor(arr.length / 2);
        let node = new Node(
            arr[middle],
            this.buildTree(arr.slice(0, middle)),
            this.buildTree(arr.slice(middle + 1))
        )
        return node;
    }

    insert(value, node = this.root){
        if(node == null) return new Node(value);
        if(value < node.value){
            node.left = this.insert(value, node.left)
        } else if(value > node.value){
            node.right = this.insert(value, node.right)
        }
        return node;
    }

    deleteItem(value, node = this.root){
        if (node === null){
            console.log(`Value ${value} not found`)
            return null;
        };
        if (value < node.value) {
            node.left = this.deleteItem(value, node.left);

        } else if (value > node.value) {
            node.right = this.deleteItem(value, node.right);

        } else {
            if (node.left === null) return node.right; 
            if (node.right === null) return node.left; 

            let successor = node.right;
            while (successor.left !== null) {
                successor = successor.left;
            }
            node.value = successor.value;
            node.right = this.deleteItem(successor.value, node.right);
        }
        return node;
    }

    find(value, node = this.root){
        if (node === null || node.value === value) return node;
        if (value < node.value) {
            return this.find(value, node.left);
        } else {
            return this.find(value, node.right);
        }
    }


    levelOrder() {
        let result = [];
        let queue = [this.root];

        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current.value);

            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
        return result;
    }

    inOrder(node = this.root, result = []) {
        if (node !== null) {
            this.inOrder(node.left, result);
            result.push(node.value);
            this.inOrder(node.right, result);
        }
        return result;
    }

    preOrder(node = this.root, result = []) {
        if (node !== null) {
            result.push(node.value);
            this.preOrder(node.left, result);
            this.preOrder(node.right, result);
        }
        return result;
    }

    postOrder(node = this.root, result = []) {
        if (node !== null) {
            this.postOrder(node.left, result);
            this.postOrder(node.right, result);
            result.push(node.value);
        }
        return result;
    }
    
    height(value) {
        const node = this.find(value);
        return node ? this.#calculateHeight(node) : -1;
    }

    #calculateHeight(node) {
        if (node === null) return -1;
        return 1 + Math.max(
            this.#calculateHeight(node.left),
            this.#calculateHeight(node.right)
        );
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) return;
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }

        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);

        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

}