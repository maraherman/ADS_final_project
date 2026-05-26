import type { Product } from '../types/Product';

export class MaxHeap {
  heap: Product[];

  constructor() {
    this.heap = [];
  }

  insert(product: Product) {
    this.heap.push(product);

    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (
        this.heap[parentIndex].popularity >=
        this.heap[index].popularity
      ) {
        break;
      }

      [
        this.heap[parentIndex],
        this.heap[index],
      ] = [
        this.heap[index],
        this.heap[parentIndex],
      ];

      index = parentIndex;
    }
  }


  extractMax() {
    if (this.heap.length === 0) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0];

    this.heap[0] = this.heap.pop()!;

    this.heapifyDown();

    return max;
  }

  heapifyDown() {
    let index = 0;

    while (true) {
      let largest = index;

      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild].popularity >
          this.heap[largest].popularity
      ) {
        largest = leftChild;
      }

      if (
        rightChild < this.heap.length &&
        this.heap[rightChild].popularity >
          this.heap[largest].popularity
      ) {
        largest = rightChild;
      }

      if (largest === index) {
        break;
      }

      [
        this.heap[index],
        this.heap[largest],
      ] = [
        this.heap[largest],
        this.heap[index],
      ];

      index = largest;
    }
  }

  delete(productName: string) {
    const index = this.heap.findIndex(
      (product) => product.name === productName
    );

    if (index === -1) return;

    this.heap[index] =
      this.heap[this.heap.length - 1];

    this.heap.pop();

    this.heapifyDown();
  }

  edit(
    productName: string,
    updatedProduct: Product
  ) {
    const index = this.heap.findIndex(
      (product) => product.name === productName
    );

    if (index === -1) return;

    this.heap[index] = updatedProduct;

    this.heapifyUp();

    this.heapifyDown();
  }

  peek() {
    return this.heap[0];
  }

  getHeap() {
    return this.heap;
  }
}