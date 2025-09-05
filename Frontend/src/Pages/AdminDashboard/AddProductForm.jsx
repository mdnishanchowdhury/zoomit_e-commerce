import { useState } from "react";
import { useAddProductMutation, useGetProductsQuery } from "../../redux/features/products/productSlice";

export default function ProductsPage() {
  const [showForm, setShowForm] = useState(false);

  const { data: products = [], refetch, isLoading } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();

  const [newProduct, setNewProduct] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    discount: 0,
    stock: 0, 
    status: "active",
    photos: [], 
    categories: [],
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "categories") {
      setNewProduct({ ...newProduct, categories: value.split(",").map(cat => cat.trim()) });
    } else if (name === "stock") {
      setNewProduct({ ...newProduct, stock: Number(value) });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // File upload 
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    }));

    Promise.all(readers)
      .then(images => setNewProduct({ ...newProduct, photos: images }))
      .catch(err => console.error("Error reading files", err));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(newProduct).unwrap();
      setNewProduct({
        name: "",
        slug: "",
        description: "",
        price: "",
        discount: 0,
        stock: 0,
        status: "active",
        photos: [],
        categories: [],
      });
      setShowForm(false);
      refetch();
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {showForm ? "Close Form" : "Add Product"}
        </button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-4">
          <div>
            <label className="block font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Slug</label>
            <input
              type="text"
              name="slug"
              value={newProduct.slug}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              className="w-full border rounded p-2"
              rows="3"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Discount (%)</label>
              <input
                type="number"
                name="discount"
                value={newProduct.discount}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">Product Photos (optional)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full border rounded p-2"
            />
            {newProduct.photos.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {newProduct.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt={`preview-${idx}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block font-medium">Categories (comma separated)</label>
            <input
              type="text"
              name="categories"
              value={newProduct.categories.join(", ")}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="flex gap-4 items-center">
            <div>
              <label className="block font-medium">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleChange}
                className="w-24 border rounded p-2"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Status</label>
              <select
                name="status"
                value={newProduct.status}
                onChange={handleChange}
                className="border rounded p-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save Product
          </button>
        </form>
      )}

      {/* Products List */}
      <div className="bg-white shadow-md rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">All Products</h2>
        {isLoading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products available.</p>
        ) : (
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Discount</th>
                <th className="p-2 border">Categories</th>
                <th className="p-2 border">Stock</th>
                <th className="p-2 border">Photos</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod, idx) => (
                <tr key={prod._id || idx} className="hover:bg-gray-50">
                  <td className="p-2 border">{idx + 1}</td>
                  <td className="p-2 border">{prod.name}</td>
                  <td className="p-2 border">${prod.price}</td>
                  <td className="p-2 border">{prod.discount}%</td>
                  <td className="p-2 border">{prod.categories?.join(", ") || ""}</td>
                  <td className="p-2 border">
                    {prod.stock > 0 ? (
                      <span className="px-2 py-1 text-sm bg-green-100 text-green-700 rounded">
                        {prod.stock} In Stock
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="p-2 border flex gap-1">
                    {prod.photos?.length > 0 ? (
                      prod.photos.map((photo, i) => (
                        <img
                          key={i}
                          src={photo}
                          alt={`product-${i}`}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ))
                    ) : (
                      <span className="text-gray-400">No Photo</span>
                    )}
                  </td>
                  <td className="p-2 border">
                    {prod.status === "active" ? (
                      <span className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded">
                        Inactive
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
