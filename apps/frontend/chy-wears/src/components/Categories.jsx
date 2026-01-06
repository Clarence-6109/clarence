import "./Categories.css";
const categories = [
  {
    id: 1,
    name: "Dresses",
    count: "120+ Items",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
  },
  {
    id: 2,
    name: "Tops",
    count: "85+ Items",
    image:
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop",
  },
  {
    id: 3,
    name: "Bottoms",
    count: "95+ Items",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
  },
  {
    id: 4,
    name: "Accessories",
    count: "200+ Items",
    image:
      "https://images.unsplash.com/photo-1611923134239-b9be5816e23c?w=400&h=500&fit=crop",
  },
];
function Categories() {
  return (
    <section className="categories" id="categories">
      <div className="categories-container">
        <div className="section-header">
          <span className="section-badge">Browse</span>
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-description">
            Find exactly what you're looking for in our carefully curated
            categories
          </p>
        </div>
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="category-image">
                <img src={category.image} alt={category.name} />
                <div className="category-overlay">
                  <button className="btn btn-primary btn-sm">Explore</button>
                </div>
              </div>
              <div className="category-info">
                <h3 className="category-name">{category.name}</h3>
                <span className="category-count">{category.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Categories;
