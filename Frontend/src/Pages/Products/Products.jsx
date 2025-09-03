import ProductCard from "./ProductCard";

function Products() {
  const sampleProduct = {
    id: 1,
    name: "Smartphone X200",
    slug: "smartphone-x200",
    description: "Latest smartphone with AMOLED display and fast charging.",
    price: 30000,
    discount: 15,
    stock: 5,
    status: "active",
    photos: [
      "https://via.placeholder.com/400x250.png?text=Smartphone",
      "https://via.placeholder.com/400x250.png?text=Alt+Image",
    ],
    categories: ["Electronics", "Mobile", "New Arrival"],
    quantity: 1, // default quantity
  };

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      <ProductCard product={sampleProduct} />
    </div>
  );
}

export default Products;
