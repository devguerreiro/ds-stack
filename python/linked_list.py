from typing import TypeVar

TNode = TypeVar("TNode", bound="Node")


class Node:
    value: int
    next: TNode | None = None

    def __init__(self, value: int):
        self.value = value


class LinkedList:
    _initial: Node | None = None
    _size: int = 0

    def _get_node(self, index: int):
        _index = index
        if index < 0:
            _index = self._size + index
            if _index < 0:
                raise IndexError()
        node = self._initial
        for _ in range(_index):
            if node is None:
                raise IndexError()
            node = node.next
        return node

    def insert(self, index: int, value: int):
        new_node = Node(value)
        if index == 0:
            new_node.next = self._initial
            self._initial = new_node
        else:
            previous_node = self._get_node(index - 1)
            new_node.next = previous_node.next
            previous_node.next = new_node
        self._size += 1

    def remove(self, value: int):
        if self._size == 0:
            return ValueError()
        if self._initial.value == value:
            self._initial = self._initial.next
            self._size -= 1
            return True
        else:
            previous_node = self._initial
            current_node = previous_node.next
            while current_node is not None:
                if current_node.value == value:
                    previous_node.next = current_node.next
                    current_node.next = None
                    self._size -= 1
                    return True
                previous_node = current_node
                current_node = current_node.next
            return False

    def __len__(self):
        return self._size

    def __getitem__(self, key: int):
        if self._size == 0:
            raise IndexError()
        node = self._get_node(key)
        return node.value
