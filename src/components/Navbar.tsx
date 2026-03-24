import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Главная" },
    { to: "/donate", label: "Донаты" },
    { to: "/history", label: "История" },
    { to: "/about", label: "О сервере" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-mc-border bg-mc-bg/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-mc neon-green tracking-widest animate-flicker">
            multi<span className="text-mc-gold neon-gold">WORLD</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-mc text-sm tracking-wider transition-colors duration-200 ${
                location.pathname === l.to
                  ? "text-mc-green neon-green"
                  : "text-mc-green/60 hover:text-mc-green"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className="font-mc text-sm tracking-wider text-mc-gold/60 hover:text-mc-gold transition-colors duration-200"
          >
            <Icon name="Shield" size={16} className="inline mr-1" />
            Админ
          </Link>
        </div>

        <button
          className="md:hidden text-mc-green"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-mc-card border-b border-mc-border px-4 pb-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 font-mc text-sm tracking-wider ${
                location.pathname === l.to
                  ? "text-mc-green neon-green"
                  : "text-mc-green/60"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setMenuOpen(false)}
            className="block py-2 font-mc text-sm tracking-wider text-mc-gold/60"
          >
            Админ
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
