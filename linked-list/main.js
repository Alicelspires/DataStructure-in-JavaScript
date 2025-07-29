import LinkedList from "./linkedList.js";

const list = new LinkedList();

// Adding to the start
list.append(28);
list.append(70);
list.append(46);
list.append(12);
list.append(89);
list.append(23);

// Adding to the end
list.prepend(34)

// Show
console.log("List: ", list.toString())

console.log("Size: ", list.getSize())
console.log("First value: ", list.getHead())
console.log("Last value: ", list.getTail())
console.log("Value at index 3: ", list.atValue(3))
console.log("Remove last value: ", list.pop(), ", Actual list: ", list.toString())
console.log("Contains the value 46?: ", list.contains(46))
console.log("Contains the value 45?: ", list.contains(45))
console.log("The index value of 70: ", list.find(70))
console.log("The index value of 66: ", list.find(66))

// General insert
list.insertAt(44, 3)

console.log("New List: ", list.toString())

// General removal
list.removeAt(3)

console.log("New List: ", list.toString())