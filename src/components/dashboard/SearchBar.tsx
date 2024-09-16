export default function SearchBar() {
  return (
    <div className="bg-white p-2 rounded-lg mb-4 flex items-center shadow">
      <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
      <input
        type="text"
        placeholder="Search transactions"
        className="bg-transparent outline-none flex-1 text-gray-700 placeholder-gray-500"
      />
    </div>
  );
}