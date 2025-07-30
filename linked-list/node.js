export default class Node {
    constructor(value = null, key = null, next = null){
        this.key = key;
        this.value = value;
        this.next = next;
    }
}