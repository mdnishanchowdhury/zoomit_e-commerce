function CategoryBadges({ categories }) {
    return (
        <div className="flex flex-wrap gap-1 mb-3">
            {categories.map((cat, i) => (
                <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                    {cat}
                </span>
            ))}
        </div>
    );
}

export default CategoryBadges;
