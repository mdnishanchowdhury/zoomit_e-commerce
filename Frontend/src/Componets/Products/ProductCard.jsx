import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import { useAddToCartMutation } from "../../redux/features/products/productSlice";
import CategoryBadges from "./Cart/CategoryBadges";
import ProductStatus from "./Cart/ProductStatus";
import ProductPrice from "./Cart/ProductPrice";
import ProductImage from "./Cart/ProductImage";

function ProductCard({ product }) {
  const { _id, name, photos, price, discount, stock, status, categories, slug, description } = product;
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [addToCart] = useAddToCartMutation();
  const isDisabled = stock === 0 || status !== "active";

  const handleAddToCart = async () => {
    if (!user?.email) {
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }
    setInCart(true);
    await addToCart({ productId: _id, email: user.email, name, photos, price, discount });
    Swal.fire({ position: "top-end", icon: "success", title: `${name} added to cart`, showConfirmButton: false, timer: 1500 });
  };

  const handleViewCart = () => navigate("/details", { state: { cartItem: product } });

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-3 flex flex-col text-sm">
      <ProductImage
        photos={photos} discount={discount} name={name} >
      </ProductImage>

      <h2 className="text-base font-semibold mb-1 text-gray-800 line-clamp-1">{name}</h2>
      <p className="text-xs text-gray-500 mb-1 line-clamp-2">{description}</p>
      <p className="text-[10px] text-gray-400 mb-2">/{slug}</p>

      <ProductPrice
        price={price} discount={discount}>
      </ProductPrice>
      <ProductStatus
        stock={stock} status={status}>
      </ProductStatus>
      <CategoryBadges
        categories={categories}>
      </CategoryBadges>

      {
        inCart ? (
          <button onClick={handleViewCart} className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all">
            View Cart
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={isDisabled}
            className={`w-full py-1.5 rounded-lg text-sm font-medium transition-all ${!isDisabled ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-300 text-gray-200 cursor-not-allowed"}`}
          >
            Add to Cart
          </button>
        )
      }
    </div>
  );
}

export default ProductCard;
