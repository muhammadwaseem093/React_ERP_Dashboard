export default function Header() {
  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      {/* Left Logo */}
      <div className="text-xl font-bold text-green-600">FETAFLAME</div>

      {/* Right Search */}
      <div className="flex items-center gap-2 border px-3 py-1 rounded-lg">
        <span className="flex items-center justify-center text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search"
          className="outline-none text-sm bg-transparent placeholder:text-gray-400 w-32 md:w-64"
        />
      </div>
    </header>
  );
}
