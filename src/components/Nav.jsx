const Nav = ({ setFilter }) => {
  return (
    <nav className="w-64 bg-white shadow-md p-4">
      <h2 className="text-2xl font-bold mb-8">Snippets</h2>
      <ul>
        <li className="mb-4">
          <button
            onClick={() => setFilter('all')}
            className="w-full text-left bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            All Snippets
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => setFilter('html')}
            className="w-full text-left bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            HTML Snippets
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => setFilter('css')}
            className="w-full text-left bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            CSS Snippets
          </button>
        </li>
        <li>
          <button
            onClick={() => setFilter('js')}
            className="w-full text-left bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            JS Snippets
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;