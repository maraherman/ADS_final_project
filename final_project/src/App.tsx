import { useState } from 'react';

import { RedBlackTree } from './dataStructures/RBT';
import { MaxHeap } from './dataStructures/MaxHeap';

import RBTreeView from './components/RBTView';
import HeapView from './components/HeapView';

import { kmpSearch } from './algorithms/KMP';

const rbTree = new RedBlackTree();
const heap = new MaxHeap();

const initialProducts = [
  {
    id: 1,
    name: 'Nike Shoes',
    price: 300,
    popularity: 95,
  },
  {
    id: 2,
    name: 'Hoodie',
    price: 150,
    popularity: 70,
  },
  {
    id: 3,
    name: 'Watch',
    price: 500,
    popularity: 88,
  },
];

initialProducts.forEach((product) => {
  rbTree.insert(product);
  heap.insert(product);
});

function App() {
  const [, forceUpdate] = useState(0);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [popularity, setPopularity] = useState('');
  const [search, setSearch] = useState('');
  
  const addProduct = () => {
    if (!name || !price || !popularity) return;

    const product = {
      id: Date.now(),
      name,
      price: Number(price),
      popularity: Number(popularity),
    };

    rbTree.insert(product);

    heap.insert(product);

    forceUpdate((prev) => prev + 1);

    setName('');
    setPrice('');
    setPopularity('');
  };



  const editProduct = () => {
    const products = heap.getHeap();

    const existingProduct = products.find(
      (product: any) => product.name === name
    );

    if (!existingProduct) return;

    const updatedProduct = {
      ...existingProduct,
      price: Number(price),
      popularity: Number(popularity),
    };

    rbTree.edit(existingProduct.price, updatedProduct);

    heap.root = null;

    products
      .map((product: any) =>
        product.name === name
          ? updatedProduct
          : product
      )
      .forEach((product: any) => {
        heap.insert(product);
      });

    forceUpdate((prev) => prev + 1);

    setName('');
    setPrice('');
    setPopularity('');
  };

  const deleteProduct = () => {
    const products = heap.getHeap();

    const productToDelete = products.find(
      (product: any) => product.name === name
    );

    if (!productToDelete) return;

    rbTree.delete(productToDelete.price);

    heap.root = null;

    products
      .filter(
        (product: any) =>
          product.name !== name
      )
      .forEach((product: any) => {
        heap.insert(product);
      });

    forceUpdate((prev) => prev + 1);

    setName('');
    setPrice('');
    setPopularity('');
  };

  const keywords = search
  .toLowerCase()
  .trim()
  .split(' ')
  .filter(Boolean);

  const filteredProducts =
    search.trim() === ''
      ? []
      : heap.getHeap().filter((product: any) =>
          keywords.some((keyword) =>
            kmpSearch(
              product.name.toLowerCase(),
              keyword
            )
          )
        );
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F0EEEA',
        padding: '30px',
        fontFamily: 'Arial',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '30px',
        }}
      >
        Shopping Recommendation System
      </h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '25px',
        }}
      >
        <input
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            ...inputStyle,
            width: '400px',
            fontSize: '16px',
          }}
        />
      </div>

      {search.trim() !== '' && (
        <div
          style={{
            marginBottom: '35px',
            backgroundColor: '#ffffff',
            padding: '25px',
            borderRadius: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          <h2
            style={{
              marginBottom: '20px',
            }}
          >
            Search Results
          </h2>

          {filteredProducts.length === 0 ? (
            <p>No matching products found.</p>
          ) : (
            filteredProducts.map((product: any) => (
              <div
                key={product.id}
                style={{
                  padding: '16px',
                  marginBottom: '14px',
                  borderRadius: '16px',
                  backgroundColor: '#F7F3EF',
                }}
              >
                <div
                  style={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                    marginBottom: '6px',
                  }}
                >
                  {product.name}
                </div>

                <div>
                  Price: ${product.price}
                </div>

                <div>
                  Popularity: {product.popularity}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <div
        style={{
          backgroundColor: '#D6CBBF',
          padding: '25px',
          borderRadius: '24px',
          marginBottom: '40px',
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Popularity"
          value={popularity}
          onChange={(e) => setPopularity(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={addProduct}
          style={buttonStyle}
        >
          Add Product
        </button>

        <button
          onClick={editProduct}
          style={buttonStyle}
        >
          Edit Product
        </button>

        <button
          onClick={deleteProduct}
          style={buttonStyle}
        >
          Delete Product
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '30px',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <div
          style={{
            backgroundColor: '#F0DDD6',
            padding: '20px',
            borderRadius: '24px',
            width: '60%',
            height: '650px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '10px',
            }}
          >
            Red Black Tree
          </h2>

          <RBTreeView root={rbTree.root} />
        </div>

        <div
          style={{
            backgroundColor: '#F0DDD6',
            padding: '20px',
            borderRadius: '24px',
            width: '30%',
            minHeight: '650px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          <HeapView heap={heap.getHeap()} />
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '12px',
  borderRadius: '12px',
  border: 'none',
  outline: 'none',
  width: '180px',
  fontSize: '14px',
};

const buttonStyle = {
  backgroundColor: '#97B3AE',
  color: 'white',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '12px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '14px',
};

export default App;
