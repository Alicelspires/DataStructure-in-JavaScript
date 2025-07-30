import LinkedList from "../linked-list/linkedList.js";

export default class HashMap {
    constructor(loadFactory = 0.75, capacity = 16){
        this.loadFactor = loadFactory;
        this.capacity = capacity;
        this.currenEntries = 0;
        this.buckets = Array.from({length: this.capacity}, () => new LinkedList())
    }

    hash(key){
        let hashCode = 0;
        let primeNumber = 31; // Para reduzir colisões e garantir dispersão, utiliza-se um número primo

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(value, key){
        let keyValue = this.hash(key); // codificando a chave
        let bucket = this.buckets[keyValue]; // achando a Linked List da chave passada
        let index = bucket.find(null , key)

        // Se a chave existe, atualiza o valor. Se não, adiciona a nova key e o valor 
        if(index !== "Not found"){
            bucket.updateAt(value, index)
        } else {
            bucket.append(value, key)
            this.currenEntries++

            // Verifica se a quantidade de entries passou do tamanho, se sim, chama a função resize()
            if(this.currenEntries > this.capacity * this.loadFactor){
                this.resize();
            }
        }

    }

    get(key){
        let keyValue = this.hash(key);
        let bucket = this.buckets[keyValue];
        let index = bucket.find(null , key)

        if(index == null){
            return null;
        } else {
            return bucket.at(index).value;
        }
    }

    has(key){
        let keyValue = this.hash(key);
        let bucket = this.buckets[keyValue];

        return bucket.contains(null, key)
    }

    remove(key){
        let keyValue = this.hash(key);
        let bucket = this.buckets[keyValue];
        let index = bucket.find(null , key)

        if(this.has(key)){
            bucket.removeAt(index)
            return true;
        } 

        return false;
    }

    length(){
        let total  = 0;
        this.buckets.forEach((bucket) => {
            total += bucket.getSize();
        })
        return total;
    }

    clear(){
        this.capacity = 16;
        this.buckets = Array.from({ length: this.capacity }, () => (new LinkedList()))
    }

    keys(){
        let keys = [];
        this.buckets.forEach((bucket) => {
            let currentNode = bucket.getHead();
            
            while(currentNode !== null){
                keys.push(currentNode.key);
                currentNode = currentNode.next;
            }
        })
        return keys;
    }

    values(){
        let values = [];
        this.buckets.forEach((bucket) => {
            let currentNode = bucket.getHead();
            while(currentNode !== null){
                values.push(currentNode.value);
                currentNode = currentNode.next;
            }
        })
        return values;
    }

    resize(){
        let oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = Array.from({length: this.capacity}, () => new LinkedList());

        for(let bucket of oldBuckets){
            let current = bucket.head;
            while (current) {
                this.set(current.key, current.value);
                current = current.next;
            }
        }
    }

    entries(){
        let r = [];
        this.buckets.forEach((bucket) => {
            let current = bucket.head;
            while (current) {
                r.push({key: current.key, value: current.value});
                current = current.next;
            }
        });
        return r;
    }
}