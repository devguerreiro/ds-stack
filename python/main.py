from typing import TypeVar

TNode = TypeVar("TNode", bound="Node")


class Node:
    value: int
    next: TNode | None = None

    def __init__(self, value: int):
        self.value = value


class Stack:
    _last: Node | None = None
    _size: int = 0

    def push(self, value: int):
        new_node = Node(value)
        new_node.next = self._last
        self._last = new_node
        self._size += 1

    def pop(self):
        if self._size > 0:
            last = self._last
            self._last = last.next
            last.next = None
            self._size -= 1
            return last.value
        raise IndexError()

    def peek(self):
        return self._last.value

    def __len__(self):
        return self._size


if __name__ == "__main__":
    stack = Stack()

    try:
        stack.pop()
        raise AssertionError()
    except IndexError as e:
        assert isinstance(e, IndexError)

    stack.push(10)
    stack.push(20)
    stack.push(30)

    assert stack.peek() == 30

    assert len(stack) == 3

    assert stack.pop() == 30
    assert len(stack) == 2

    assert stack.pop() == 20
    assert len(stack) == 1

    assert stack.pop() == 10
    assert len(stack) == 0
