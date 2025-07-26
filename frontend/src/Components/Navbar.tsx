import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    //navigate("/");
    window.location.reload();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    //<nav className="fixed top-0 left-0 right-0 z-0 bg-white shadow px-4 py-3 flex items-center justify-between">
    <nav className="fixed top-0 left-0 right-0 z-0 bg-white shadow px-4 py-3 flex justify-end items-center">
      <div className="ml-auto relative" ref={menuRef}>
        <img
          src="http://192.168.1.42:3000/uploads/1753554422910-909730323.jpg?"
          alt="Foto de perfil"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={toggleMenu}
        />
        {isOpen && (
          <div
            className="absolute right-0 mt-2 min-w-[8rem] max-w-xs bg-white border rounded-lg shadow-lg z-10 overflow-hidden"
          >
            <button
              className="w-full flex  items-center gap-2 px-4 py-2 hover:bg-gray-100"
              onClick={() => navigate("/funcionarios/funcionariosed/6")}
            >      
            
              Perfil
            </button>
            <button
            type="submit"
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
              onClick={handleLogout }
            >
              Sair
              
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
