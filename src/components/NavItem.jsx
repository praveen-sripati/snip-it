
const NavItem = ({ label, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className="w-full text-left bg-muted hover:bg-muted/80 font-bold py-2 px-4 rounded"
    >
      {label}
    </button>
  </li>
);

export default NavItem;