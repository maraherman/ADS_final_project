import type { Product } from '../types/Product';

const Color = {
  RED: 'RED',
  BLACK: 'BLACK',
} as const;

type ColorType = (typeof Color)[keyof typeof Color];

class TreeNode {
  data: Product;
  color: ColorType;
  left: TreeNode | null;
  right: TreeNode | null;
  parent: TreeNode | null;

  constructor(data: Product) {
    this.data = data;
    this.color = Color.RED;

    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

export class RedBlackTree {
  root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  insert(product: Product) {
    const newNode = new TreeNode(product);

    let parent: TreeNode | null = null;
    let current = this.root;

    while (current !== null) {
      parent = current;

      if (newNode.data.price < current.data.price) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    newNode.parent = parent;

    if (parent === null) {
      this.root = newNode;
    } else if (newNode.data.price < parent.data.price) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    this.fixInsert(newNode);
  }

  private fixInsert(node: TreeNode) {
    while (
      node.parent &&
      node.parent.color === Color.RED
    ) {
      const grandparent = node.parent.parent;

      if (!grandparent) break;

      if (node.parent === grandparent.left) {
        const uncle = grandparent.right;

        if (uncle && uncle.color === Color.RED) {
          node.parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          grandparent.color = Color.RED;

          node = grandparent;
        }

        else {
          if (node === node.parent.right) {
            node = node.parent;
            this.rotateLeft(node);
          }

          node.parent!.color = Color.BLACK;
          grandparent.color = Color.RED;

          this.rotateRight(grandparent);
        }
      }

      else {
        const uncle = grandparent.left;

        if (uncle && uncle.color === Color.RED) {
          node.parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          grandparent.color = Color.RED;

          node = grandparent;
        }

        else {
          if (node === node.parent.left) {
            node = node.parent;
            this.rotateRight(node);
          }

          node.parent!.color = Color.BLACK;
          grandparent.color = Color.RED;

          this.rotateLeft(grandparent);
        }
      }
    }

    if (this.root) {
      this.root.color = Color.BLACK;
    }
  }

  delete(price: number) {
    const z = this.searchNode(this.root, price);

    if (!z) return;

    let y = z;
    let yOriginalColor = y.color;

    let x: TreeNode | null;

    if (!z.left) {
      x = z.right;

      this.transplant(z, z.right);
    }

    else if (!z.right) {
      x = z.left;

      this.transplant(z, z.left);
    }

    else {
      y = this.minimum(z.right);

      yOriginalColor = y.color;

      x = y.right;

      if (y.parent === z) {
        if (x) {
          x.parent = y;
        }
      }

      else {
        this.transplant(y, y.right);

        y.right = z.right;

        if (y.right) {
          y.right.parent = y;
        }
      }

      this.transplant(z, y);

      y.left = z.left;

      if (y.left) {
        y.left.parent = y;
      }

      y.color = z.color;
    }

    if (yOriginalColor === Color.BLACK && x) {
      this.fixDelete(x);
    }
  }

  private fixDelete(x: TreeNode) {
    while (
      x !== this.root &&
      x.color === Color.BLACK
    ) {
      if (x === x.parent?.left) {
        let w = x.parent.right;

        if (!w) break;

        if (w.color === Color.RED) {
          w.color = Color.BLACK;

          x.parent.color = Color.RED;

          this.rotateLeft(x.parent);

          w = x.parent.right;
        }

        if (
          (!w!.left || w!.left.color === Color.BLACK) &&
          (!w!.right || w!.right.color === Color.BLACK)
        ) {
          w!.color = Color.RED;

          x = x.parent;
        }

        else {
          if (!w!.right || w!.right.color === Color.BLACK) {
            if (w!.left) {
              w!.left.color = Color.BLACK;
            }

            w!.color = Color.RED;

            this.rotateRight(w!);

            w = x.parent.right!;
          }

          w!.color = x.parent.color;

          x.parent.color = Color.BLACK;

          if (w!.right) {
            w!.right.color = Color.BLACK;
          }

          this.rotateLeft(x.parent);

          x = this.root!;
        }
      }

      else {
        let w = x.parent!.left;

        if (!w) break;

        if (w.color === Color.RED) {
          w.color = Color.BLACK;

          x.parent!.color = Color.RED;

          this.rotateRight(x.parent!);

          w = x.parent!.left;
        }

        if (
          (!w!.right || w!.right.color === Color.BLACK) &&
          (!w!.left || w!.left.color === Color.BLACK)
        ) {
          w!.color = Color.RED;

          x = x.parent!;
        }

        else {
          if (!w!.left || w!.left.color === Color.BLACK) {
            if (w!.right) {
              w!.right.color = Color.BLACK;
            }

            w!.color = Color.RED;

            this.rotateLeft(w!);

            w = x.parent!.left!;
          }

          w!.color = x.parent!.color;

          x.parent!.color = Color.BLACK;

          if (w!.left) {
            w!.left.color = Color.BLACK;
          }

          this.rotateRight(x.parent!);

          x = this.root!;
        }
      }
    }

    x.color = Color.BLACK;
  }

  edit(oldPrice: number, updatedProduct: Product) {
    this.delete(oldPrice);

    this.insert(updatedProduct);
  }

  private transplant(
    u: TreeNode,
    v: TreeNode | null
  ) {
    if (!u.parent) {
      this.root = v;
    }

    else if (u === u.parent.left) {
      u.parent.left = v;
    }

    else {
      u.parent.right = v;
    }

    if (v) {
      v.parent = u.parent;
    }
  }

  private minimum(node: TreeNode): TreeNode {
    while (node.left) {
      node = node.left;
    }

    return node;
  }

  private searchNode(
    node: TreeNode | null,
    price: number
  ): TreeNode | null {

    while (node) {
      if (price === node.data.price) {
        return node;
      }

      if (price < node.data.price) {
        node = node.left;
      }

      else {
        node = node.right;
      }
    }

    return null;
  }

  private rotateLeft(node: TreeNode) {
    const rightChild = node.right;

    if (!rightChild) return;

    node.right = rightChild.left;

    if (rightChild.left) {
      rightChild.left.parent = node;
    }

    rightChild.parent = node.parent;

    if (!node.parent) {
      this.root = rightChild;
    }

    else if (node === node.parent.left) {
      node.parent.left = rightChild;
    }

    else {
      node.parent.right = rightChild;
    }

    rightChild.left = node;

    node.parent = rightChild;
  }

  private rotateRight(node: TreeNode) {
    const leftChild = node.left;

    if (!leftChild) return;

    node.left = leftChild.right;

    if (leftChild.right) {
      leftChild.right.parent = node;
    }

    leftChild.parent = node.parent;

    if (!node.parent) {
      this.root = leftChild;
    }

    else if (node === node.parent.right) {
      node.parent.right = leftChild;
    }

    else {
      node.parent.left = leftChild;
    }

    leftChild.right = node;

    node.parent = leftChild;
  }
}