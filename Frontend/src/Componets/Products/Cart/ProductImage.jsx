function ProductImage({ photos, discount, name }) {
  return (
    <div className="relative w-full h-40 overflow-hidden rounded-xl mb-3 group">
      <img
        src={photos[0]}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {discount > 0 && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
          -{discount}%
        </span>
      )}
    </div>
  );
}
export default ProductImage;
