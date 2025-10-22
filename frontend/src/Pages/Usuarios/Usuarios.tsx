import { useEffect } from "react";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Inputs/Inputs";
import { useUsuarioStore } from "../../Store/useUsuarioStore";
import {  useNavigate } from "react-router-dom";
import { FiCheckSquare} from "react-icons/fi";
import { GrUserAdmin } from "react-icons/gr";
import { IoMdCloseCircle, IoMdCloseCircleOutline } from "react-icons/io";
import { TbEdit, TbLockOpen, TbLockPassword } from "react-icons/tb";

export default function Usuarios(){

    const { isLoading } = useUsuarioStore();
    const navigate = useNavigate();
    //const [usuarioAtivo, setusuarioAtivo ]= useState<string | null>(null);

    const {
        usuarios,
        paginaAtual,
        totalPaginas,
        filter,
        setFilter,
        setPaginaAtual,
        buscarUsuario,
    } = useUsuarioStore();

    const handleblock = async (id: number) =>{
        console.log("Clicou para bloquear o usuário com ID:", id); // <- log de clique
        const confirmBlock = window.confirm("Tem certeza que deseja bloquear/desbloquear este usuário?");
        const token = localStorage.getItem("token");

        if (!confirmBlock) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/blockuser/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            },);

            if (!response.ok) {
                throw new Error("Erro ao bloquear/desbloquear o usuário");
            }
             // ✅ Atualiza a lista sem recarregar a página
            await buscarUsuario(); // <- sua função que atualiza a grid/listagem
        }
        catch (error: any) {
            alert("Falha ao bloquear/desbloquear usuário: " + error.message);
        }


    }

    useEffect(()=>{
        buscarUsuario();
        console.log("Filtro atual:", filter.nomeUsuario);
    },[paginaAtual, filter.nomeUsuario]);

    const handleCadastrar = () => {
        navigate('/usuarios/usuario')
    }

    const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setFilter({...filter, [e.target.name]: e.target.value});
  }
  const paginar = (direcao: "anterior" | "proximo") => {
    if (direcao === "anterior" && paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    } else if (direcao === "proximo" && paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

    return(
       <section>
            {/* Título e botão de cadastro */}
            <div className="flex justify-between items-center flex-wrap mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Usuários</h2>
                <Button type="button" color="green" onClick={handleCadastrar} >
                    Cadastrar
                </Button>
            </div>
                        
            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <Input
                    type="text"
                    name="nome"
                    placeholder="Buscar por nome"
                    //value={FiltroFunc.nome}
                    //onChange={handleFiltroChange}
                    className="border px-3 py-2 rounded-lg"
                />
            </div>

            {/* Tabela de usuários */}
            <div className="hidden lg:block text-sm">
                {isLoading ? (
                    <div className="text-center text-gray-500">Carregando...</div>
                ) : (
                    <table className="w-full border-collapse">
                            <thead className="border-b">
                                <tr>
                                    <th className="text-left py-2 pr-2 w-1/12">Usuario</th>
                                    <th className="text-left py-2 pr-2 w-1/12">Ativo</th>
                                    <th className="text-left py-2 pr-2 w-1/12">Admin</th>
                                    <th className="text-left py-2 pr-2 w-1/12">Ação</th>        
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((item) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="py-5"><div className="font-semibold">{item.usuario} </div></td>
                                        <td className="py-5">
                                            {item.ativo === 'S' ?(
                                                <div className="flex items-center gap-1 w-fit bg-green-200 px-2 py-1 text-green-600 text-xs font-semibold border border-green-600 rounded-lg">
                                                    <span><FiCheckSquare /></span>
                                                </div>
                                            ):(
                                                <div className="flex items-center gap-1 w-fit bg-red-200 px-2 py-1 text-red-600 text-xs font-semibold border border-red-600 rounded-lg">
                                                    <span><IoMdCloseCircleOutline /></span>
                                                </div>
                                            )}                                            
                                        </td>
                                        <td className="py-5">
                                            {item.administrador === 'S' ?(
                                                <div className="flex items-center gap-1 w-fit bg-green-200 px-2 py-1 text-green-600 text-xs font-semibold border border-green-600 rounded-lg">
                                                    <span><GrUserAdmin  /></span>
                                                </div>
                                            ):(
                                                <div className="flex items-center gap-1 w-fit bg-red-200 px-2 py-1 text-red-600 text-xs font-semibold border border-red-600 rounded-lg">
                                                    <span><IoMdCloseCircle /></span>
                                                </div>
                                            )}                                            
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2"> {/* Adicionei flex e gap aqui */}
                                                <div className="flex items-center gap-1 w-fit bg-green-200 px-2 py-1 text-green-600 text-xs font-semibold border border-green-600 rounded-lg"
                                                    onClick={() => navigate(`/usuarios/usuario/${item.id}`)} // Editar
                                                    style={{ cursor: "pointer" }} // Adiciona cursor pointer para indicar que é clicável
                                                >
                                                    <TbEdit size={15}/> 
                                                </div> 
                                                {item.ativo === 'N'?(
                                                    <div className="flex items-center gap-1 w-fit bg-green-100 px-2 py-1 text-green-600 text-xs font-semibold border border-green-600 rounded-lg"
                                                    onClick={() => handleblock(item.id)}
                                                    style={{ cursor: "pointer" }} // Adiciona cursor pointer para indicar que é clicável
                                                    >
                                                        <TbLockOpen size={15} data-tip="Clique aqui para bloquear o usuario"/>
                                                    </div> ):(
                                                        
                                                    <div className="flex items-center gap-1 w-fit bg-red-100 px-2 py-1 text-red-600 text-xs font-semibold border border-red-600 rounded-lg"
                                                    onClick={() => handleblock(item.id)}
                                                    style={{ cursor: "pointer" }} // Adiciona cursor pointer para indicar que é clicável
                                                >
                                                    <TbLockPassword size={15} data-tip="Clique aqui para bloquear o usuario"/>
                                                </div>
                                                )} 
                                                                                        
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                    </table>
                )}
            </div>
            
       </section>
    )
}