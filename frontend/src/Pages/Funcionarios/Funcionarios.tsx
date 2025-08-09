import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Inputs/Inputs";
import { useEffect, useState } from "react";
import { useFuncionarioStore } from "../../Store/useFuncionariosStore";
import { FaRegMinusSquare, FaRegPlusSquare, FaRegTrashAlt} from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";


export default function Funcionarios(){
    const navigate = useNavigate();
    const handleCadastrar = () => {
        navigate('/funcionarios/funcionariosed');
    };
    const [itemExpandido, setItemExpandido] = useState<number | null>(null);
    const {isLoading} = useFuncionarioStore();

    const{
        Funcionarios,
        PaginaAtual,
        TotalPagina,
        FiltroFunc,
        setFiltro,
        setPaginaAtual,
        buscaFuncionario
    }=useFuncionarioStore();

    useEffect(()=>{
        buscaFuncionario();
    },[PaginaAtual,FiltroFunc.nome]);

    //funcao para deletar pelo ID
    const handleDeleteFunc = async(id:number)=>{
        const confirmaDelete = window.confirm("Tem certeza que deseja deletar o funcionario?");
        const token = localStorage.getItem("token");
        
        if(!confirmaDelete) return

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/funcionarios/deletafuncionario/${id}`,{
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok){
                throw new Error("Erro ao deletar");
            } 
            alert("Deletado com sucesso");
            buscaFuncionario();
        } catch (error:any) {
            alert("Falha ao deletar" + error.message);            
        }
    };

    const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFiltro({...FiltroFunc, [e.target.name]: e.target.value});
    }

    const paginar = (direcao: "anterior" | "proximo") => {
        if (direcao === "anterior" && PaginaAtual > 1) {
            setPaginaAtual(PaginaAtual - 1);
        } else if (direcao === "proximo" && PaginaAtual < TotalPagina) {
            setPaginaAtual(PaginaAtual + 1);
        }
    }

  

    return(
        <section>
            {/* Título e botão de cadastro */}
            <div className="flex justify-between items-center flex-wrap mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Funcionários</h2>
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
                    value={FiltroFunc.nome}
                    onChange={handleFiltroChange}
                    className="border px-3 py-2 rounded-lg"
                />
            </div>

            {/* Tabela */}
            <div className="hidden lg:block text-sm">
                {isLoading ?(
                   <div className="text-center text-gray-500">Carregando...</div>
                ):(
                    <table className="w-full border-collapse">
                        <thead className="border-b">
                            <tr>
                                <th className="text-left py-2 pr-2 w-2/12">Nome</th>
                                <th className="text-left py-2 pr-2 w-1/12">e-mail</th>
                                <th className="text-left py-2 pr-2 w-1/12">Tipo Funcionario</th>
                                <th className="text-left py-2 pr-2 w-1/12">Cargo</th>
                                <th className="text-left py-2 pr-2 w-3/12">Observação</th>
                                <th className="text-left py-2 pr-2 w-1/12">Ação</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {Funcionarios?.map((item)=>(
                                <tr  key={item.id} className="border-b">
                                    <td className="py-5">
                                        <div className="flex font-semibold items-center">
                                            <img 
                                                src={item.foto_perfil_url?.trim()
                                                    ? `${import.meta.env.VITE_API_URL}${item.foto_perfil_url}?`
                                                    : "/avatar.png" 
                                                }
                                            alt="Foto de perfil"
                                            className="w-16 h-16 rounded-full"
                                            /> 
                                            <div className="px-2 ">{item.nome}</div>
                                        </div>                                        
                                    </td>
                                    <td>{item.email}</td>
                                    <td>{item.tipo_funcionario}</td>
                                    <td>{item.cargo}</td>
                                    <td>{item.observacao}</td>
                                    <td>
                                        <div className="flex items-center gap-2"> {/* Adicionei flex e gap aqui */}
                                            <div 
                                                className="flex items-center gap-1 w-fit bg-green-200 px-2 py-1 text-green-600 text-xs font-semibold border border-green-600 rounded-lg"
                                                onClick={() => navigate(`/funcionarios/funcionariosed/${item.id}`)} // Editar
                                                style={{ cursor: "pointer" }} // Adiciona cursor pointer para indicar que é clicável
                                            >
                                                <AiFillEdit  size={15}/> 
                                            </div>
                                            <div 
                                                className="flex items-center gap-1 w-fit bg-red-100 px-2 py-1 text-red-600 text-xs font-semibold border border-red-600 rounded-lg"
                                                onClick={() => handleDeleteFunc(item.id)}
                                                style={{ cursor: "pointer" }} // Adiciona cursor pointer para indicar que é clicável
                                            >
                                                <FaRegTrashAlt size={15} data-tip="Clique aqui para deletar"/>
                                            </div>                        
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {/*Grid menor*/}
            <div className="h-3/4 grid lg:hidden grid-cols-1 md:grid-cols-2 p-5 gap-2 overflow-y-scroll text-xs lg:text-base">
                {(Funcionarios ?? []).map((item) => (
                    <div key={item.id} className="border rounded-lg flex items-center p-2 gap-2 shadow-md">
                        <div className="w-3/4 flex flex-col justify-between bg-white p-3 rounded-lg ">
                            {/* Topo: imagem e nome */}
                            <div className="flex items-center gap-3">
                                <img 
                                    src={item.foto_perfil_url?.trim()
                                            ? `${import.meta.env.VITE_API_URL}${item.foto_perfil_url}?`
                                            : "/avatar.png" 
                                        }
                                    alt="Foto de perfil"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div className="font-bold text-sm">{item.nome}</div>
                            </div>
                            <div>
                                <div className="grid grid-cols-2 gap-2 font-bold">{item.email}</div>
                                <div className="grid grid-cols-2 gap-2">{item.tipo_funcionario}</div>
                                <div className="grid grid-cols-1 gap-2">{item.cargo}</div>
                            </div>


                            
                            {/* Botões na base */}
                            <div className="mt-4 flex items-center gap-2">
                                {/* Botão para mostrar/ocultar observação */}
                            <button
                                className="text-blue-600 text-sm mt-2 hover:underline self-start"
                                onClick={() => setItemExpandido(itemExpandido === item.id ? null : item.id)}
                            >
                                {itemExpandido === item.id ? <FaRegMinusSquare /> : <FaRegPlusSquare />}
                            </button>

                            {/* Observação */}
                            {itemExpandido === item.id && (
                                <div className="mt-2 text-gray-600 text-sm bg-gray-100 p-2 rounded">
                                    {item.observacao || "Sem observações."}
                                </div>
                            )}

                            <div
                                className="flex items-end gap-1 w-fit bg-green-200 px-3 py-1 text-green-600 text-sm font-semibold border border-green-600 rounded-lg"
                                onClick={() => navigate(`/funcionarios/funcionariosed/${item.id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <AiFillEdit size={18} />
                            </div>
                                
                            <div
                                className="flex items-center gap-1 w-fit bg-red-100 px-3 py-1 text-red-600 text-sm font-semibold border border-red-600 rounded-lg"
                                onClick={() => handleDeleteFunc(item.id)}
                                style={{ cursor: "pointer" }}
                            >
                                <FaRegTrashAlt size={18} />
                            </div>
                        </div>                            
                    </div>           
                    </div>
                ))}
            </div>
            {/* Paginação */}
        <div className="flex justify-center mt-6 gap-4">
          <Button
            onClick={() => paginar("anterior")}
            disabled={PaginaAtual === 1}
            color="gray"
          >
            Anterior
          </Button>
          <span className="self-center">
            Página {PaginaAtual} de {TotalPagina}
          </span>
          <Button
            onClick={() => paginar("proximo")}
            disabled={PaginaAtual === TotalPagina}
            color="gray"
          >
            Próxima
          </Button>
        </div>
        </section>
    )
}