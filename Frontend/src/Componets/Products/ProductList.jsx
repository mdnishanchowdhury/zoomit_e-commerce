import { useState, useMemo } from "react";
import { useGetProductsQuery } from "../../redux/features/products/productSlice";
import SearchBar from "./SearchBar";
import ProductGrid from "./ProductGrid";

function ProductList() {
  const { data: products = [], isLoading } = useGetProductsQuery();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", "Electronics", ...new Set(products.map((p) => p.category))];

  const filtered = useMemo(() => {
    let temp = [...products];
    if (search) temp = temp.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category !== "All") temp = temp.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
    return temp;
  }, [products, search, category]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <SearchBar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={categories}
        ></SearchBar>
      </div>

      <ProductGrid products={filtered} ></ProductGrid>
    </div>
  );
}

export default ProductList;
