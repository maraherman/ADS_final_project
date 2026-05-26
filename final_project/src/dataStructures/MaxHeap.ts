import type { Product } from '../types/Product';

class HeapNode {
  data: Product;

  left: HeapNode | null;
  right: HeapNode | null;
  parent: HeapNode | null;

  constructor(data: Product) {
    this.data = data;

    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

export class MaxHeap {
  root: HeapNode | null;

  constructor() {
    this.root = null;
  }

  insert(product: Product) {
    const newNode = new HeapNode(product);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    const queue: HeapNode[] = [this.root];

    while (queue.length > 0) {
      const current = queue.shift()!;

      if (!current.left) {
        current.left = newNode;
        newNode.parent = current;

        this.heapifyUp(newNode);

        return;
      }

      else {
        queue.push(current.left);
      }

      if (!current.right) {
        current.right = newNode;
        newNode.parent = current;

        this.heapifyUp(newNode);

        return;
      }

      else {
        queue.push(current.right);
      }
    }
  }

  heapifyUp(node: HeapNode) {
    while (
      node.parent &&
      node.data.popularity >
        node.parent.data.popularity
    ) {
      [
        node.data,
        node.parent.data,
      ] = [
        node.parent.data,
        node.data,
      ];

      node = node.parent;
    }
  }

  extractMax() {
    if (!this.root) {
      return null;
    }

    const max = this.root.data;

    const deepestNode = this.getDeepestNode();

    if (!deepestNode) {
      return max;
    }

    if (deepestNode === this.root) {
      this.root = null;

      return max;
    }

    this.root.data = deepestNode.data;

    if (
      deepestNode.parent?.left === deepestNode
    ) {
      deepestNode.parent.left = null;
    }

    else if (
      deepestNode.parent?.right === deepestNode
    ) {
      deepestNode.parent.right = null;
    }

    this.heapifyDown(this.root);

    return max;
  }

  heapifyDown(node: HeapNode) {
    while (node) {
      let largest = node;

      if (
        node.left &&
        node.left.data.popularity >
          largest.data.popularity
      ) {
        largest = node.left;
      }

      if (
        node.right &&
        node.right.data.popularity >
          largest.data.popularity
      ) {
        largest = node.right;
      }

      if (largest === node) {
        break;
      }

      [
        node.data,
        largest.data,
      ] = [
        largest.data,
        node.data,
      ];

      node = largest;
    }
  }

  delete(productName: string) {
    const node = this.findNode(
      this.root,
      productName
    );

    if (!node) return;

    const deepestNode = this.getDeepestNode();

    if (!deepestNode) return;

    node.data = deepestNode.data;

    if (
      deepestNode.parent?.left === deepestNode
    ) {
      deepestNode.parent.left = null;
    }

    else if (
      deepestNode.parent?.right === deepestNode
    ) {
      deepestNode.parent.right = null;
    }

    this.heapifyDown(node);
  }

  edit(
    productName: string,
    updatedProduct: Product
  ) {
    const node = this.findNode(
      this.root,
      productName
    );

    if (!node) return;

    node.data = updatedProduct;

    this.heapifyUp(node);

    this.heapifyDown(node);
  }

  peek() {
    return this.root?.data;
  }

  getHeap() {
    const result: Product[] = [];

    const traverse = (
      node: HeapNode | null
    ) => {
      if (!node) return;

      result.push(node.data);

      traverse(node.left);

      traverse(node.right);
    };

    traverse(this.root);

    return result;
  }

  private findNode(
    node: HeapNode | null,
    productName: string
  ): HeapNode | null {

    if (!node) return null;

    if (node.data.name === productName) {
      return node;
    }

    return (
      this.findNode(node.left, productName) ||
      this.findNode(node.right, productName)
    );
  }

  private getDeepestNode():
    | HeapNode
    | null {

    if (!this.root) return null;

    const queue: HeapNode[] = [this.root];

    let current: HeapNode = this.root;

    while (queue.length > 0) {
      current = queue.shift()!;

      if (current.left) {
        queue.push(current.left);
      }

      if (current.right) {
        queue.push(current.right);
      }
    }

    return current;
  }
}
