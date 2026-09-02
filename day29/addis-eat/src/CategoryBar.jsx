export default function CategoryBar({ categories, selectedCategory, onSelect }) {
  return (
    <div className="category-bar" style={{ marginBottom: '1.5rem' }}>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          style={{
            marginRight: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: selectedCategory === category ? '#4CAF50' : '#f1f1f1',
            color: selectedCategory === category ? 'white' : 'black',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer'
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}