import Node from "./node.js"

export default class LinkedList {

    constructor(){
        this.head = null;
    }

    append(value, key = null){
        if(!this.head){
            this.head = new Node(value, key)
        } else {
            let current = this.head;
            while(current.next){
                current = current.next;
            }
            current.next = new Node(value, key)
        }
    }

    prepend(value, key = null){
        let newHead = new Node(value, key, this.head);
        this.head = newHead;
    }

    getSize(){
        let total;
        if(!this.head){
            return total = 0;
        } else {
            let current = this.head;
            total = 1;
            while(current.next){
                current = current.next;
                total++;
            }
            return total;
        }
    }

    getHead(){
        return this.head;
    }

    headList(){
        return this.getHead().value;
    }

    getTail(){
        let current = this.head;
        while(current.next){
            current = current.next;
        }
        return current.value;
    }

    at(index){
        if(index > this.getSize() - 1){
            return "Not found"
        } else {
            let current = this.head;
            let num = 0
            while(num != index && num < this.getSize()){
                current = current.next;
                num++;
            }
            return current;
        }
    }

    atValue(index){
        return this.at(index).value;
    }

    pop(){
        if(!this.head){
            return;
        } else {
            let current = this.head;
            let lastValue;

            while(current.next.next){
                current = current.next;
            }

            lastValue = current.next.value;
            current.next = null;

            return lastValue;
        }
    }

    contains(value, key = null){
        if(!this.head){
            return "Not found"
        } else {
            let current = this.head;
            while(current){
                if (
                    (key !== null && current.key === key) || // Busca por chave (HashTable)
                    (key === null && current.value === value) // Busca por valor
                ) {
                    return true;
                } else {
                    current = current.next;
                }
            }
            return false;
        }
    }

    // Recebe o valor a ser encontrado e retorna o index dele
    find(value, key = null){
        let current = this.head;
        let num = 0
        while(current){
            if (
                (key !== null && current.key === key) ||
                (key === null && current.value === value)
            ){
                return num;
            } else {
                current = current.next;
                num++;
            }
        }
        return "Not found";
    }

    insertAt(value, index){
        let indexNode = this.at(index);
        let newNode = new Node(value, indexNode);

        if(index == 0){
            this.prepend(value)
        } else if( index == this.getSize() - 1){
            this.append(value)
        } else {
            let prevNode = this.at(index-1);
            prevNode.next = newNode;
        }

    }

    removeAt(index){
        let indexNode = this.at(index);
        let nextValue = indexNode.next;
        if (index == 0) {
            this.head = nextValue;
        } else {
            let prevNode = this.at(index - 1);
            prevNode.next = nextValue;
        }
    }

    updateAt(value, index){
        let nodeFound = this.at(index);
        nodeFound.value = value;
    }

    toString(){
        if(!this.head){
            return "Empty list";
        } else {
            let list = "";
            let start = this.head;

            while(start){
                list += `(${start.value}) -> `;
                start = start.next;
            }

            return list + "null";
        }
    }
}