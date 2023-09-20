import assert from "assert";

import { NSLinkedList } from "./LinkedList";

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
