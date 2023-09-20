import assert from "assert";

namespace NSLinkedList {
    export class Node {
        value: number;
        next: Node | null = null;

        constructor(value: number) {
            this.value = value;
        }
    }

    export class LinkedList {
        private initial: Node | null = null;
        private size: number = 0;

        private getNode(index: number) {
            const _index = index < 0 ? this.size + index : index;
            let node = this.initial;
            for (let i = 0; i < _index; i++) {
                if (node !== null) {
                    node = node.next;
                } else {
                    break;
                }
            }
            if (node !== null && !(_index < 0)) {
                return node;
            }
            throw new RangeError();
        }

        get(index: number) {
            const node = this.getNode(index);
            return node.value;
        }

        insert(index: number, value: number) {
            const newNode = new Node(value);
            if (index === 0) {
                newNode.next = this.initial;
                this.initial = newNode;
            } else {
                const previousNode = this.getNode(index - 1);
                newNode.next = previousNode.next;
                previousNode.next = newNode;
            }
            this.size++;
        }

        remove(value: number) {
            if (this.size === 0) {
                throw new Error();
            }
            if (this.initial !== null) {
                if (this.initial.value === value) {
                    let aux = this.initial.next;
                    this.initial.next = null;
                    this.initial = aux;
                    this.size--;
                    return true;
                } else {
                    let previousNode = this.initial;
                    let currentNode = previousNode.next;
                    while (currentNode !== null) {
                        if (currentNode.value === value) {
                            previousNode.next = currentNode.next;
                            currentNode.next = null;
                            this.size--;
                            return true;
                        }
                        previousNode = currentNode;
                        currentNode = currentNode.next;
                    }
                    return false;
                }
            }
        }

        get length(): number {
            return this.size;
        }
    }
}

namespace NSStack {
    export class Stack {
        stack = new NSLinkedList.LinkedList();

        add(value: number) {
            this.stack.insert(0, value);
        }

        pop() {
            const value = this.stack.get(0);
            if (this.stack.remove(value)) {
                return value;
            }
        }

        get length(): number {
            return this.stack.length;
        }
    }
}

const stack = new NSStack.Stack();

assert.throws(() => stack.pop(), Error);

stack.add(10);
stack.add(20);
stack.add(30);

assert.equal(stack.length, 3);

assert.equal(stack.pop(), 30);
assert.equal(stack.length, 2);

assert.equal(stack.pop(), 20);
assert.equal(stack.length, 1);

assert.equal(stack.pop(), 10);
assert.equal(stack.length, 0);
