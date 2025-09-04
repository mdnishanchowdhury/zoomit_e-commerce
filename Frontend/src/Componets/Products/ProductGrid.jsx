import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
    if (products.length === 0) return <p className="text-gray-500">No products found.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
                products.map((product) => (
                    <ProductCard key={product._id} product={product}></ProductCard>
                ))
            }
        </div>
    );
}

export default ProductGrid;
