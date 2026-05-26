# ADS_final_project - Shopping Recommendation System

## Overview

The Shopping Recommendation System is a web application developed using React and TypeScript that demonstrates the use of advanced data structures and algorithms in a real-world scenario.

The application allows users to:
- Add products
- Edit products
- Delete products
- Search for products
- View trending products

Each product contains:
- ID
- Name
- Price
- Popularity score

The system uses multiple data structures to efficiently organize and manage products.

---

# Technologies Used

- React
- TypeScript
- HTML/CSS
- react-d3-tree
- Node.js
- npm

---

# Data Structures and Algorithms

## Product Interface

```ts
export interface Product {
  id: number;
  name: string;
  price: number;
  popularity: number;
}
```

The Product interface defines the structure of each product stored in the application.

---

## 1. Red-Black Tree

The application uses a Red-Black Tree to organize products by price.

### Purpose
- Fast insertion
- Fast deletion
- Efficient searching
- Balanced tree structure

### Operations Implemented
- Insert
- Delete
- Edit
- Search
- Left rotation
- Right rotation

The tree automatically balances itself after insertion and deletion to maintain efficient performance.

The tree visualization is displayed using the `react-d3-tree` library.

---

## 2. Max Heap

The application uses a Max Heap to manage product popularity.

### Purpose
- Quickly access the most popular products
- Display trending products

### Operations Implemented
- Insert
- Extract maximum
- Delete
- Edit
- Heapify Up
- Heapify Down

The product with the highest popularity value is always placed at the top of the heap.


---

## 3. Knuth-Morris-Pratt (KMP) Algorithm

The application uses the KMP algorithm for product searching.

### Purpose
- Efficient string matching
- Faster searching compared to naive search algorithms

### Functions Implemented
- `buildLPS()`
- `kmpSearch()`

The search bar uses the KMP algorithm to match keywords with product names.


---

# Application Functionality

The application initially loads a few predefined products.

Users can:
- Add a new product
- Edit an existing product
- Delete a product
- Search products by name

When a product is added:
1. It is inserted into the Red-Black Tree
2. It is inserted into the Max Heap
3. The UI updates automatically

The interface displays:
- Search results
- Red-Black Tree visualization
- Trending products section

---

# How to Run the Program

## Requirements

Make sure the following are installed:
- Node.js
- npm

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-link>
```

### 2. Open the project folder

```bash
cd project-name
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the application

```bash
npm run dev
```

or

```bash
npm start
```

depending on the project configuration.

---

# Project Structure

```bash
src/
│
├── algorithms/
│   └── KMP.ts
│
├── components/
│   ├── HeapView.tsx
│   └── RBTView.tsx
│
├── dataStructures/
│   ├── MaxHeap.ts
│   └── RBT.ts
│
├── types/
│   └── Product.ts
│
└── App.tsx
```

---

# Conclusion

This project demonstrates how advanced data structures and algorithms can be integrated into a modern frontend application.

The Red-Black Tree provides efficient organization by price, the Max Heap manages popularity and recommendations, and the KMP algorithm enables fast searching.

The project combines theoretical computer science concepts with practical React and TypeScript development.
