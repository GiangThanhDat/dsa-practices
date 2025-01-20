import { convertLinkedListToArray } from "../utils.js";

/**
 * Design a data structure that follows the constraints of a Least Recently Used (LRU)
 *
 * Implement the LRUCache class :
 * LRUCache (int capacity) Initialize the LRU cache with positive size capacity
 * int get(int key) Return the value of the key if the key exists, otherwise return -1
 * void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
 *
 * The functions get and put must each run in O(1) average time complexity
 *
 * Example 1 :
 * Input = [
 * 'LRUCache', 'put', 'put','get', 'put', 'get', 'put', 'get', 'get',  'get']
 * [[2],[1,1],[2,2],[1],[3,3], [2], [4,4], [1], [3],[4]]
 * Output = [ null, null, null, 1, null, -1 , null, -1, 3, 4 ]
 *
 * Explanation:
 * LRUCache  lRUCache = new LRUCache(2);
 * lRUCache.put(1, 1)  // cache is {1=1},
 * lRUCache.put(2, 2)  // cache is {1=1, 2=2}
 * lRUCache.get(1)     // return 1
 * lRUCache.put(3, 3)  // LRU key was 2, eviects key 2, cache is {1=1.3=3}
 * lRUCache.get(2)    // return -1 (not found)
 * lRUCache.put(4, 4) // return -1 (not found)
 * lRUCache.get(3)     // return 3
 * lRUCache.get(4)    // return 4
 */

class DoubleListNode {
  constructor(val, key, prev, next) {
    this.val = val === undefined ? null : val;
    this.key = key === undefined ? null : key;
    this.prev = prev === undefined ? null : prev;
    this.next = next === undefined ? null : next;
  }
}

class LRUCache {
  constructor(capacity) {
    this.size = 0;
    this.capacity = capacity;
    this.hash = {};

    this.frequentUsed = new DoubleListNode(); // dummy head
    this.mostUsedNode = new DoubleListNode(); // dummy tail

    this.frequentUsed.next = this.mostUsedNode;
    this.mostUsedNode.prev = this.frequentUsed;
  }

  // Move a node to the most recently used position
  _moveToMostUsed(node) {
    // Remove node from its current position
    node.prev.next = node.next;
    node.next.prev = node.prev;

    // Add node to the most recently used position (before the dummy tail)
    this._addToMostUsed(node);
  }

  _addToMostUsed(node) {
    node.prev = this.mostUsedNode.prev;
    node.next = this.mostUsedNode;
    this.mostUsedNode.prev.next = node;
    this.mostUsedNode.prev = node;
  }

  // Remove the least recently used node
  _removeLeastUsed() {
    const lruNode = this.frequentUsed.next;
    this.frequentUsed.next = lruNode.next;
    lruNode.next.prev = this.frequentUsed;

    delete this.hash[lruNode.key];
    this.size--;
  }

  get(key) {
    if (this.hash[key]) {
      const node = this.hash[key];
      this._moveToMostUsed(node);
      return node.val;
    }
    return -1;
  }

  put(key, value) {
    if (this.hash[key]) {
      // Update value and move to most recently used
      const node = this.hash[key];
      node.val = value;
      this._moveToMostUsed(node);
    } else {
      // Ad  a new node
      if (this.size >= this.capacity) {
        this._removeLeastUsed(); // Evict least recently used
      }

      const newNode = new DoubleListNode(value, key);
      this.hash[key] = newNode;
      this._addToMostUsed(newNode);
      this.size++;
    }
  }
}

class LRUCache2 {
  // capacity;
  // map: Map<number, Node>;
  // freq: number[];
  // head : Node;
  // tail : Node;
  constructor(capacity) {
    this.capacity = capacity ? capacity : 0;
    this.map = new Map();
    this.freq = [];
    this.head = new DoubleListNode();
    this.tail = new DoubleListNode(0, 0, this.head, null);
  }

  get(key) {
    if (!this.map.has(key)) {
      return -1;
    }
    // const key = this.map[key][0];
    const node = this.map.get(key);
    let temp = node;
    temp.prev.next = node.next;
    temp.next.prev = node.prev;

    node.next = this.tail;
    node.prev = this.tail.prev;
    this.tail.prev.next = node;
    this.tail.prev = node;

    // console.log('map',key,  this.map)
    return node.val;
  }

  put(key, value) {
    // console.log('key', key, value)
    let node = new DoubleListNode(value, key);
    if (this.map.has(key)) {
      node = this.map.get(key);
      node.val = value;
    } else {
      if (this.map.size === this.capacity) {
        node = this.head.next;
        this.map.delete(node.key);
        node.key = key;
        node.val = value;
        // this.map.delete(key);
      }
    }
    // console.log('this.map', this.map);
    // this.map.set(key, node);
    this.map.set(key, node);
    let temp = node;
    if (node.prev) {
      node.prev.next = temp.next;
    }

    if (node.next) {
      node.next.prev = temp.prev;
    }
    temp.prev = this.tail.prev;
    this.tail.prev.next = temp;
    temp.next = this.tail;
    this.tail.prev = temp;
  }
}

const testcases = [
  {
    actions: [
      "LRUCache",
      "put",
      "put",
      "get",
      "put",
      "get",
      "put",
      "get",
      "get",
      "get",
    ],
    params: [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]],
  },
  {
    actions: ["LRUCache", "put", "get"],
    params: [[1], [2, 1], [2]],
  },
  {
    actions: ["LRUCache", "put", "get"],
    params: [[1], [2, 1], [2]],
  },
  {
    actions: ["LRUCache", "put", "get", "put", "get", "get"],
    params: [[1], [2, 1], [2], [3, 2], [2], [3]],
  },
  {
    actions: [
      "LRUCache",
      "put",
      "put",
      "get",
      "put",
      "get",
      "put",
      "get",
      "get",
      "get",
    ],
    params: [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]],
  },
];

for (const testcase of testcases) {
  const { actions, params } = testcase;

  let lRUCache;
  const result = [];

  actions.forEach((action, index) => {
    if (action === "LRUCache") {
      lRUCache = new LRUCache2(...params[index]);
      result.push(null);
    } else if (lRUCache instanceof LRUCache2) {
      result.push(lRUCache[action](...params[index]));
    }
  });

  console.log("result:", result);
}
