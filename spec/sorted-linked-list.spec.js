'use strict';

const Chance = require('chance');

const SortedLinkedList = require('../src/sorted-linked-list');

describe('a sorted linked list', () => {

    let obj1;
    let obj2;
    let obj3;
    let obj4;

    beforeEach(() => {
        obj1 = {'id': 1};
        obj2 = {'id': 2};
        obj3 = {'id': 3};
        obj4 = {'id': 4};
    });

    it('can insert one value', () => {
        const list = new SortedLinkedList();
        expect(() => list.insert(obj1, 1)).not.toThrow();

        expect(list.removeHead()).toBe(obj1);
    });

    it('throws an error if removing head while empty', () => {
        const list = new SortedLinkedList();
        expect(() => list.removeHead()).toThrow();
    });

    it('can insert several consecutive values', () => {
        const list = new SortedLinkedList();
        expect(() => list.insert(obj1, 1)).not.toThrow();
        expect(() => list.insert(obj2, 2)).not.toThrow();
        expect(() => list.insert(obj3, 3)).not.toThrow();
        expect(() => list.insert(obj4, 4)).not.toThrow();

        expect(list.removeHead()).toBe(obj1);
        expect(list.removeHead()).toBe(obj2);
        expect(list.removeHead()).toBe(obj3);
        expect(list.removeHead()).toBe(obj4);

    });

    it('can insert values in reverse order', () => {
        const list = new SortedLinkedList();
        expect(() => list.insert(obj1, 4)).not.toThrow();
        expect(() => list.insert(obj2, 3)).not.toThrow();
        expect(() => list.insert(obj3, 2)).not.toThrow();
        expect(() => list.insert(obj4, 1)).not.toThrow();

        expect(list.removeHead()).toBe(obj4);
        expect(list.removeHead()).toBe(obj3);
        expect(list.removeHead()).toBe(obj2);
        expect(list.removeHead()).toBe(obj1);
    });

    it('can insert values in a random order', () => {
        const list = new SortedLinkedList();
        expect(() => list.insert(obj1, 4)).not.toThrow();
        expect(() => list.insert(obj2, 2)).not.toThrow();
        expect(() => list.insert(obj3, 3)).not.toThrow();
        expect(() => list.insert(obj4, 1)).not.toThrow();

        expect(list.removeHead()).toBe(obj4);
        expect(list.removeHead()).toBe(obj2);
        expect(list.removeHead()).toBe(obj3);
        expect(list.removeHead()).toBe(obj1);
    });

    it('can insert values with repeated values', () => {
        const list = new SortedLinkedList();
        expect(() => list.insert(obj1, 4)).not.toThrow();
        expect(() => list.insert(obj2, 2)).not.toThrow();
        expect(() => list.insert(obj3, 3)).not.toThrow();
        expect(() => list.insert(obj4, 1)).not.toThrow();
        expect(() => list.insert(obj1, 4)).not.toThrow();
        expect(() => list.insert(obj2, 2)).not.toThrow();
        expect(() => list.insert(obj3, 3)).not.toThrow();
        expect(() => list.insert(obj4, 1)).not.toThrow();
        expect(() => list.insert(obj1, 4)).not.toThrow();
        expect(() => list.insert(obj2, 2)).not.toThrow();
        expect(() => list.insert(obj3, 3)).not.toThrow();
        expect(() => list.insert(obj4, 1)).not.toThrow();

        expect(list.removeHead()).toBe(obj4);
        expect(list.removeHead()).toBe(obj4);
        expect(list.removeHead()).toBe(obj4);

        expect(list.removeHead()).toBe(obj2);
        expect(list.removeHead()).toBe(obj2);
        expect(list.removeHead()).toBe(obj2);

        expect(list.removeHead()).toBe(obj3);
        expect(list.removeHead()).toBe(obj3);
        expect(list.removeHead()).toBe(obj3);

        expect(list.removeHead()).toBe(obj1);
        expect(list.removeHead()).toBe(obj1);
        expect(list.removeHead()).toBe(obj1);
    });

    it('can insert values in a totally random order', () => {
        const list = new SortedLinkedList();

        const chance = new Chance(1);
        for (let i = 0 ; i < 100 ; i++) {
            const value = chance.integer({'min': 0, 'max': 10});
            list.insert(value, value);
        }

        let previousRemoval = list.removeHead();

        while (!list.isEmpty) {
            const removal = list.removeHead();
            expect(removal).not.toBeLessThan(previousRemoval);
            previousRemoval = removal;
        }
    });

    it('can insert a sorted batch', () => {
        const list = new SortedLinkedList();

        const chance = new Chance(1);

        // Initial contents
        for (let i = 0 ; i < 100 ; i++) {
            const value = chance.integer({'min': 0, 'max': 10});
            list.insert(value, value);
        }

        list.insertSortedBatch([1, 3, 4, 7, 8, 9], x => x);

        let previousRemoval = list.removeHead();
        let removeCount = 1;

        while (!list.isEmpty) {
            const removal = list.removeHead();
            expect(removal).not.toBeLessThan(previousRemoval);
            previousRemoval = removal;

            removeCount++;
        }

        expect(removeCount).toBe(106);
    });

    it('can insert an unsorted batch', () => {
        const list = new SortedLinkedList();

        const chance = new Chance(1);

        // Initial contents
        for (let i = 0 ; i < 100 ; i++) {
            const value = chance.integer({'min': 0, 'max': 10});
            list.insert(value, value);
        }

        list.insertUnsortedBatch([4, 1, 2, 3, 8, 7], x => x);

        let previousRemoval = list.removeHead();
        let removeCount = 1;

        while (!list.isEmpty) {
            const removal = list.removeHead();
            expect(removal).not.toBeLessThan(previousRemoval);
            previousRemoval = removal;

            removeCount++;
        }

        expect(removeCount).toBe(106);
    });

});
