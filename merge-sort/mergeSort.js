function mergeSort(arr){
    if(arr.length <= 1) return arr;

    let middle = Math.floor(arr.length/2);
    let left = mergeSort(arr.slice(0, middle))
    let right = mergeSort(arr.slice(middle))

    return merge([], left, right)
}

function merge(arr, left, right){
    while(left.length && right.length){
        arr.push(
            left[0] < right[0] ? left.shift() : right.shift()
        )
    }
    return arr.concat(left, right);
}

let test = [8, 3, 6, 4, 0, 2]
console.log(mergeSort(test))