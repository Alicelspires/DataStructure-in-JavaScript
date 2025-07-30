function fibs(numLength){
    let fibbonacciArray = [0, 1]
    for(let i = 0; i < numLength - 2; i++){
        let num = fibbonacciArray[i] + fibbonacciArray[i+1];
        fibbonacciArray.push(num);
    }
    return fibbonacciArray;
}

function fibsRec(numLength){
    if(numLength == 0) return [];
    if(numLength == 1) return [0];
    if(numLength == 2) return [0, 1];

    let fibArray = fibsRec(numLength-1)
    fibArray.push(fibArray[numLength-2] + fibArray[numLength-3])
    return fibArray;
}

console.log(`Fibonacci - 8 digits (Function):`, fibs(8))
console.log(`Fibonacci - 8 digits (Recursion):`, fibsRec(8))