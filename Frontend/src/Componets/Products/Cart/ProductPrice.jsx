function ProductPrice({ price, discount }) {
    const discountedPrice = (price - (price * discount) / 100).toFixed(2);
    return (
        <div className="mb-2 flex items-center gap-2">
            <span className="text-lg font-bold text-green-600">৳{discountedPrice}</span>
            {discount > 0 && <span className="line-through text-xs text-gray-400">৳{price}</span>}
        </div>
    );
}

export default ProductPrice;
