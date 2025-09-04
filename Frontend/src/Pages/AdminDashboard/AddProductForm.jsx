// import { useState } from "react";

// export default function ProductsPage() {
//   const [showForm, setShowForm] = useState(false);
//   const [products, setProducts] = useState([]);

//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     slug: "",
//     description: "",
//     price: "",
//     discount: "",
//     stock: true,
//     status: "active",
//     category: "",
//   });

//   // Handle input
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setNewProduct({
//       ...newProduct,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   // Handle submit
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // ডেমো আইডি জেনারেট করা হচ্ছে
//     const id = products.length + 1;
//     const productData = { id, ...newProduct };

//     // নতুন প্রোডাক্ট লিস্টে যোগ করো
//     setProducts([...products, productData]);

//     // ফর্ম ক্লিয়ার
//     setNewProduct({
//       name: "",
//       slug: "",
//       description: "",
//       price: "",
//       discount: "",
//       stock: true,
//       status: "active",
//       category: "",
//     });

//     setShowForm(false);
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Products Management</h1>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           {showForm ? "Close Form" : "Add Product"}
//         </button>
//       </div>

//       {/* Add Product Form */}
//       {showForm && (
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-md rounded-xl p-6 space-y-4"
//         >
//           <div>
//             <label className="block font-medium">Product Name</label>
//             <input
//               type="text"
//               name="name"
//               value={newProduct.name}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-medium">Slug</label>
//             <input
//               type="text"
//               name="slug"
//               value={newProduct.slug}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-medium">Description</label>
//             <textarea
//               name="description"
//               value={newProduct.description}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//               rows="3"
//               required
//             ></textarea>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block font-medium">Price</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={newProduct.price}
//                 onChange={handleChange}
//                 className="w-full border rounded p-2"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block font-medium">Discount (%)</label>
//               <input
//                 type="number"
//                 name="discount"
//                 value={newProduct.discount}
//                 onChange={handleChange}
//                 className="w-full border rounded p-2"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block font-medium">Category</label>
//             <input
//               type="text"
//               name="category"
//               value={newProduct.category}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//               required
//             />
//           </div>

//           <div className="flex gap-4">
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 name="stock"
//                 checked={newProduct.stock}
//                 onChange={handleChange}
//               />
//               In Stock
//             </label>

//             <select
//               name="status"
//               value={newProduct.status}
//               onChange={handleChange}
//               className="border rounded p-2"
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             Save Product
//           </button>
//         </form>
//       )}

//       {/* Products List */}
//       <div className="bg-white shadow-md rounded-xl p-4">
//         <h2 className="text-lg font-semibold mb-4">All Products</h2>
//         {products.length === 0 ? (
//           <p className="text-gray-500">No products added yet.</p>
//         ) : (
//           <table className="w-full text-left border">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-2 border">ID</th>
//                 <th className="p-2 border">Name</th>
//                 <th className="p-2 border">Price</th>
//                 <th className="p-2 border">Discount</th>
//                 <th className="p-2 border">Category</th>
//                 <th className="p-2 border">Stock</th>
//                 <th className="p-2 border">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((prod) => (
//                 <tr key={prod.id} className="hover:bg-gray-50">
//                   <td className="p-2 border">{prod.id}</td>
//                   <td className="p-2 border">{prod.name}</td>
//                   <td className="p-2 border">${prod.price}</td>
//                   <td className="p-2 border">{prod.discount}%</td>
//                   <td className="p-2 border">{prod.category}</td>
//                   <td className="p-2 border">
//                     {prod.stock ? (
//                       <span className="px-2 py-1 text-sm bg-green-100 text-green-700 rounded">
//                         In Stock
//                       </span>
//                     ) : (
//                       <span className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded">
//                         Out of Stock
//                       </span>
//                     )}
//                   </td>
//                   <td className="p-2 border">
//                     {prod.status === "active" ? (
//                       <span className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded">
//                         Active
//                       </span>
//                     ) : (
//                       <span className="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded">
//                         Inactive
//                       </span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }
