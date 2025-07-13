import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useSidebarStore } from "../Store/useSideBarStore";
import { MdOutlineRuleFolder, MdOutlineSpaceDashboard } from "react-icons/md";
import { FaBook, FaTasks, FaUserCog} from "react-icons/fa";
import { useState } from "react";
import { GiArchiveRegister } from "react-icons/gi";
import { FaTreeCity } from "react-icons/fa6";
import { LuBookX } from "react-icons/lu";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';


export default function Sidebar(){
  const collapsed = useSidebarStore((state) => state.collapsed);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const [cadastrosOpen, setCadastrosOpen] = useState(false);
  const navigate = useNavigate();

  function isTokenValid(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }

    
  }

  function handleNavigation(path: string) {
    if (isTokenValid()) {
      navigate(path);
    } else {
      localStorage.removeItem('token'); // limpa token inválido
      navigate('/login');
    }
  }

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
          <a onClick={() => handleNavigation('/')}  className="flex items-center gap-2 hover:text-blue-900" title="Início" style={{ cursor: "pointer" }}>
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
              <div className={`mt-2 flex flex-col space-y-2 text-sm ${collapsed ? "ml-2" : "ml-6"}`}>
                <a onClick={() => handleNavigation('/penitenciarias')} className="flex items-center gap-2 hover:text-blue-900" style={{ cursor: "pointer" }}>
                  <RiPoliceBadgeFill   size={13} />
                  {!collapsed && <span>Penitenciarias</span>}
                </a>
                <a onClick={() => handleNavigation('/cidades')}  className="flex items-center gap-2 hover:text-blue-900" style={{ cursor: "pointer" }}>
                  <FaTreeCity   size={13} />
                  {!collapsed && <span>Cidades</span>}
                </a>
                <a onClick={() => handleNavigation('/codigopenal')} className="flex items-center gap-2 hover:text-blue-900" style={{ cursor: "pointer" }}>
                  <LuBookX   size={13} />
                  {!collapsed && <span>Código Penal</span>}
                </a>
                <a onClick={() => handleNavigation('/forum')} className="flex items-center gap-2 hover:text-blue-900" style={{ cursor: "pointer" }}>
                  <MdOutlineRuleFolder   size={13} />
                  {!collapsed && <span>Fórum</span>}
                </a>
                {collapsed && (
                  <div className="border-t border-gray-300 my-2"></div>  
                )}
                
                {!collapsed && (
                  <div className="flex items-center my-2 space-x-2">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="text-gray-500 text-xs uppercase">Segurança</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>
                )}
                <a onClick={() => handleNavigation('/usuarios')} className="flex items-center gap-2 hover:text-blue-900" style={{ cursor: "pointer" }}>
                  <FaUserCog size={13} />
                  {!collapsed && <span>Usuários</span>}
                </a>
                
              </div>
            )}
          </div>
          <a onClick={() => handleNavigation('/')}  className="flex items-center gap-2 hover:text-blue-900" title="Início" style={{ cursor: "pointer" }}>
                <FaTasks size={24} />
              {!collapsed && <span>Tarefas</span>}
          </a>
      </nav>
    </aside>
  );

}