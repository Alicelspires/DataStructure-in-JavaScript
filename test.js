class Node {
  constructor (key, value) {
    this.key = key;
    this.value = value || null;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(key, value) {
    let newNode = new Node(key,  value);
    if (this.head === null) {
      this.head = newNode;
    }

    else {
      let currentNode = this.head;
      while (currentNode.nextNode !== null) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = newNode;
    }
  }

  prepend(key, value) {
    let newNode = new Node(key,  value);
    newNode.nextNode = this.head;
    this.head = newNode;
  }

  pop() {
    if (this.head === null) {
      return null
    }

    if (this.head.nextNode === null) {
      const nodeToReturn = this.head;
      this.head = null; // Only one node
      return nodeToReturn;
    }

    let currentNode = this.head;
    while (currentNode.nextNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }

    const nodeToReturn = currentNode.nextNode;
    currentNode.nextNode = null;
    return nodeToReturn;
  }

  size() {
    let size = 0;
    let currentNode = this.head;
    while (currentNode !== null) {
      currentNode = currentNode.nextNode;
      size++;
    }
    return size;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    let currentNode = this.head;
    while (currentNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }

  at(index) {
    let currentNode = this.head;
    for (let i = 0; i < index; ++i) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }

  contains(key) {
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.key.localeCompare(key, undefined, {sensitivity: 'accent'}) === 0) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  find(key) {
    let currentNode = this.head;
    let index= 0;
    while (currentNode !== null) {
      if (currentNode.key.localeCompare(key, undefined, {sensitivity: 'accent'}) === 0) {
        return index;
      }
      currentNode = currentNode.nextNode;
      index++;
    }
    return null;
  }

  toString() {
    if (this.head === null) {
      return "null";
    }

    let outputString = "";
    let currentNode = this.head;

    while (currentNode !== null) {
      outputString += `( ${currentNode.value} ) -> `
      currentNode = currentNode.nextNode;
    }

    outputString += `null`
    return outputString;
  }

  insertAt(index, key, value) {
    if (this.size() < index){
      this.append(value);
    }
    else if (index === 0) {
      this.prepend(value);
    }

    else {
      let newNode = new Node(key, value);
      let currentNodeAtPreviousIndex = this.at(index-1);
      let currentNodeAtIndex = this.at(index);

      newNode.nextNode = currentNodeAtIndex;
      currentNodeAtPreviousIndex.nextNode = newNode;
    }
  }

  removeAt(index) {
    if (index > this.size()) {
      return
    }

    if (index === 0) {
      this.head = this.head.nextNode;
    }
    else {
      let currentNodeAtPreviousIndex = this.at(index - 1);
      currentNodeAtPreviousIndex.nextNode = this.at(index + 1);
    }
  }

  updateAt(index, value) {
    let node = this.at(index);
    node.value = value;
  }
}

class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = Array.from({ length: capacity }, () => (new LinkedList()));
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    let keyHash = this.hash(key);
    if (keyHash < 0 || keyHash >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let bucket = this.buckets[keyHash];

    // first check if the key exists, and if so only update it
    if (this.has(key)) {
      let index = bucket.find(key);
      bucket.updateAt(index, value);
    }
    else {
      bucket.append(key, value);
    }

    // after adding resize if size is over the load factor
    if (this.isOverLoadFactor()) {
        this.resize();
    }
  }

  has(key) {
    let keyHash = this.hash(key);
    if (keyHash < 0 || keyHash >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    return this.buckets[keyHash].contains(key);
  }

  get(key) {
    let keyHash = this.hash(key);
    if (keyHash < 0 || keyHash >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let bucket = this.buckets[keyHash];
    let index = bucket.find(key);

    if (index === null)
      return null;
    else
      return bucket.at(index).value;
  }

  remove(key) {
    let keyHash = this.hash(key);
    if (keyHash < 0 || keyHash >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let bucket = this.buckets[keyHash];
    let index = bucket.find(key);

    if (index === null)
      return false;
    else {
      bucket.removeAt(index);
      return true;
    }
  }

  isOverLoadFactor() {
    let currentLoadFactor = this.length() / this.capacity;
    return (currentLoadFactor >= this.loadFactor);
  }

  length() {
    let count = 0;
    this.buckets.forEach((bucket) => {
      count += bucket.size();
    });
    return count;
  }

  clear() {
    this.capacity = 16;
    this.buckets = Array.from({ length: this.capacity }, () => (new LinkedList()));
  }

  keys() {
    let keys = [];
    this.buckets.forEach((bucket) => {
      let currentNode = bucket.getHead();
      while (currentNode !== null) {
        keys.push(currentNode.key);
        currentNode = currentNode.nextNode;
      }
    })
    return keys;
  }

  values() {
    let values = [];
    this.buckets.forEach((bucket) => {
      let currentNode = bucket.getHead();
      while (currentNode !== null) {
        values.push(currentNode.value);
        currentNode = currentNode.nextNode;
      }
    })
    return values;
  }

  entries() {
    let entries = [];
    this.buckets.forEach((bucket) => {
      let currentNode = bucket.getHead();
      while (currentNode !== null) {
        entries.push([currentNode.key, currentNode.value]);
        currentNode = currentNode.nextNode;
      }
    })
    return entries;
  }

  resize() {
    let oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => (new LinkedList()));

    oldBuckets.forEach((bucket) => {
      let node = bucket.pop()
      while (node !== null) {
        this.set(node.key, node.value);
        node = bucket.pop();
      }
    })
  }
}

let hashMap = new HashMap(0.75,16);

hashMap.set('apple', 'red');
hashMap.set('banana', 'yellow');
hashMap.set('carrot', 'orange');
hashMap.set('dog', 'brown');
hashMap.set('elephant', 'gray');
hashMap.set('frog', 'green');
hashMap.set('grape', 'purple');
hashMap.set('hat', 'black');
hashMap.set('ice cream', 'white');
hashMap.set('jacket', 'blue');
hashMap.set('kite', 'pink');
hashMap.set('lion', 'golden');
hashMap.set('tiger', 'orange');
hashMap.set('cat', 'ginger');

console.log(hashMap.entries());