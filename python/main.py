from linked_list import LinkedList


class Stack:
    linked_list: LinkedList = LinkedList()

    def __len__(self):
        return len(self.linked_list)

    def add(self, value: int):
        self.linked_list.insert(0, value)

    def pop(self):
        value = self.linked_list[0]
        if self.linked_list.remove(value):
            return value


if __name__ == "__main__":
    stack = Stack()

    try:
        stack.pop()
        raise AssertionError()
    except IndexError as e:
        assert isinstance(e, IndexError)

    stack.add(10)
    stack.add(20)
    stack.add(30)

    assert len(stack) == 3

    assert stack.pop() == 30
    assert len(stack) == 2

    assert stack.pop() == 20
    assert len(stack) == 1

    assert stack.pop() == 10
    assert len(stack) == 0
