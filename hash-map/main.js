import HashMap from "./hashMap.js"

let test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.entries())

// Populating the hash map
test.set('moon', 'silver')

console.log(test.entries())

console.log("Get value from gray key: ", test.get("gray"))
console.log("Check if purple key exists: ", test.has("purple"))
console.log("Check if maroon key exists: ",test.has("maroon"))

test.remove("pink")

console.log(test.entries())

console.log("Number of entries: ", test.length())
console.log("Show all keys: ", test.keys())
console.log("Show all values: ", test.values())

test.clear()

console.log(test.entries())