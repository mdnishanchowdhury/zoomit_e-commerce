function ProductStatus({ stock, status }) {
    return (
        <div className="flex justify-between items-center mb-2 text-xs">
            <span className={`px-2 py-0.5 rounded-full font-medium ${stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
            <span className={`px-2 py-0.5 rounded-full font-medium ${status === "active" ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-500"}`}>
                {status}
            </span>
        </div>
    );
}

export default ProductStatus;
