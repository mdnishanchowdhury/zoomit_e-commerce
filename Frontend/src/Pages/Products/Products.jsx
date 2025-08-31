// import { useState } from "react";
// const product = {
//     name: "Wireless Headphone",
//     description: "A card component has a figure, a body part, and inside body there are title and actions parts",
//     price: 1000,
//     discount: 15,
//     stockStatus: false,
// };
// function Products() {
//     const [added, setAdded] = useState(false);
//     const finalPrice = product.price - (product.price * product.discount) / 100;

//     const handleClick = () => {
//         if (!product.stockStatus) {
//             alert("Sorry! This product is out of stock.");
//             return;
//         }
//         setAdded(true);
//     };
//     return (
//         <div>
//             <div className="card bg-base-100 w-96 shadow-sm">
//                 <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
//                     {product.discount}% OFF
//                 </span>
//                 <figure className="px-2 pt-2">
//                     <img
//                         src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//                         alt="Shoes"
//                         className="rounded-xl" />
//                 </figure>
//                 <div className="px-10 py-6 space-y-3">
//                     <h2 className="card-title">{product.name}</h2>
//                     <p>{product.description}</p>
//                     <div className="flex gap-2">
//                         <p className="text-red-600 font-bold">${finalPrice}</p>
//                         <p className="line-through text-gray-500">${product.price}</p>
//                     </div>
//                     <div className="card-actions justify-between">
//                         <div>
//                             <button className="btn btn-primary">
//                                 Details
//                             </button>
//                         </div>
//                         <div>
//                             {!added ? (
//                                 <button className="btn btn-primary" onClick={handleClick}>
//                                     Add to Cart
//                                 </button>
//                             ) : (
//                                 <button className="btn btn-secondary">
//                                     View Cart
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Products