import assert from "assert";

class Node {
    value: number;
    next: Node | null = null;

    constructor(value: number) {
        this.value = value;
    }
}

class Stack {
    private last: Node | null = null;
    private size: number = 0;

    push(value: number) {
        const newNode = new Node(value);
        newNode.next = this.last;
        this.last = newNode;
        this.size++;
    }

    pop() {
        if (this.size > 0) {
            const last = this.last as Node;
            this.last = last.next;
            last.next = null;
            this.size--;
            return last.value;
        }
        throw new RangeError();
    }

    peek() {
        return this.last?.value;
    }

    get length(): number {
        return this.size;
    }
}

const stack = new Stack();

assert.throws(() => stack.pop(), Error);

stack.push(10);
stack.push(20);
stack.push(30);

assert.equal(stack.peek(), 30);

assert.equal(stack.length, 3);

assert.equal(stack.pop(), 30);
assert.equal(stack.length, 2);

assert.equal(stack.pop(), 20);
assert.equal(stack.length, 1);

assert.equal(stack.pop(), 10);
assert.equal(stack.length, 0);
