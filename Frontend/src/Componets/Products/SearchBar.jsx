import { MdOutlineSearch } from "react-icons/md";

function SearchBar({ search, setSearch, category, setCategory, categories }) {
    return (
        <div className="flex gap-3 w-full md:w-auto items-center">
            <div className="relative w-full md:w-64">
                <MdOutlineSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                {
                    categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                    ))
                }
            </select>
        </div>
    );
}

export default SearchBar;
