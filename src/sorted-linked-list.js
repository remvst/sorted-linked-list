'use strict';

module.exports = class SortedLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    get isEmpty() {
        return this.head === null;
    }

    insert(element, value) {
        this.internalInsert(element, value, this.head);
    }

    insertSortedBatch(elements, valueProvider) {
        let currentInsertionNode = this.head;
        elements.forEach(element => {
            currentInsertionNode = this.internalInsert(element, valueProvider(element), currentInsertionNode);
        });
    }

    insertUnsortedBatch(elements, valueProvider) {
        let currentInsertionNode = this.head;
        let previousValue = null;
        elements.forEach(element => {
            const value = valueProvider(element);

            if (previousValue === null || value < previousValue) {
                currentInsertionNode = this.head;
            }
            previousValue = value;

            currentInsertionNode = this.internalInsert(element, valueProvider(element), currentInsertionNode);
        });
    }

    internalInsert(element, value, startNode) {
        const newNode = [element, value, null]; // using an array should hopefully be more memory efficient than an object

        // Empty list
        if (!startNode) {
            this.head = newNode;
            this.tail = newNode;
            return newNode;
        }

        // Insert before head
        if (value <= startNode[1]) {
            newNode[2] = this.head;
            this.head = newNode;
            return newNode;
        }

        // Insert after tail
        if (value >= this.tail[1]) {
            this.tail[2] = newNode;
            this.tail = newNode;
            return newNode;
        }

        // Insert in the middle
        let node = startNode;
        let previousNode;
        while (node[2] && node[1] < value) {
            previousNode = node;
            node = node[2];
        }

        previousNode[2] = newNode;
        newNode[2] = node;

        return newNode;
    }

    removeHead() {
        if (!this.head) {
            throw new Error('List is empty');
        }

        const oldHeadElement = this.head[0];
        this.head = this.head[2];
        return oldHeadElement;
    }
};
