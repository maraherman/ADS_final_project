function HeapView({ heap }: any) {
  return (
    <div>
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        Trending Products
      </h2>

      <div
        style={{
          backgroundColor: '#F2C3B9',
          padding: '15px',
          borderRadius: '16px',
          marginBottom: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Top Product: {heap[0]?.name}
      </div>

      {[...heap]
        .sort((a, b) => b.popularity - a.popularity)
        .map((product: any) => (
          <div
            key={product.id}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '15px',
              borderRadius: '16px',
              marginBottom: '15px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: '8px',
              }}
            >
              {product.name}
            </h3>

            <p style={{ margin: '4px 0' }}>
              Price: ${product.price}
            </p>

            <p style={{ margin: '4px 0' }}>
              Popularity: {product.popularity}
            </p>
          </div>
        ))}
    </div>
  );
}

export default HeapView;