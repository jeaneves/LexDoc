import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useSidebarStore } from "../Store/useSideBarStore";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaBook, FaTruck, FaUserCog} from "react-icons/fa";
import { useState } from "react";
import { GiArchiveRegister } from "react-icons/gi";
import { BsHouseGearFill } from "react-icons/bs";

export default function Sidebar(){
  const collapsed = useSidebarStore((state) => state.collapsed);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const [cadastrosOpen, setCadastrosOpen] = useState(false);

  const handleToggleSidebar = () => {
      toggleSidebar();// Chama a função para alternar o estado da barra lateral do zustand
  }

  return(
    <aside className={`fixed top-0 left-0 h-screen bg-blue-100 shadow-md p-4 z-20 transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      <div className="flex justify-between items-center mb-4">
          {!collapsed && <span className="font-semibold text-black">Menu</span>}
          <button onClick={handleToggleSidebar} className="text-blue-800 hover:text-blue-600 p-1 rounded-full hover:bg-blue-200" title={collapsed ? "Expandir" : "Recolher"}>
              {collapsed ? <BiChevronRight size={20} /> : <BiChevronLeft size={20} />}
          </button>
      </div>

      <nav className="flex flex-col space-y-4 text-black">
          <a href="/" className="flex items-center gap-2 hover:text-blue-900" title="Início">
                <MdOutlineSpaceDashboard size={24} />
              {!collapsed && <span>Dashboard</span>}
          </a>
          {/* Item de Cadastros com submenu */}
          <div>
            <a onClick={() => setCadastrosOpen(!cadastrosOpen)} className="flex items-center w-full gap-2 hover:text-blue-900">
              {!cadastrosOpen ? <FaBook size={24}/> :<GiArchiveRegister size={24}/>}  
              {!collapsed && <span>Cadastros</span>}
            </a>
            {/* Submenus visíveis somente se cadastrosOpen for true e menu não estiver colapsado */}
            {cadastrosOpen && (
              <div className={`ml-${collapsed ? "2" : "6"} mt-2 flex flex-col space-y-2 text-sm`}>
                <a href="/forum" className="flex items-center gap-2 hover:text-blue-900">
                  <BsHouseGearFill  size={13} />
                  {!collapsed && <span>Fórum</span>}
                </a>
                <a href="/fornecedores" className="flex items-center gap-2 hover:text-blue-900">
                  <FaTruck size={13} />
                  {!collapsed && <span>'--'</span>}
                </a>
                <a href="/usuarios" className="flex items-center gap-2 hover:text-blue-900">
                  <FaUserCog size={13} />
                  {!collapsed && <span>Usuários</span>}
                </a>
                
              </div>
            )}
          </div>
      </nav>
    </aside>
  );

}