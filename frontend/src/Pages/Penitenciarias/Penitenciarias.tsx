import { AiFillEdit } from "react-icons/ai";
import { Button } from "../../Components/Button";
import { FaRegMinusSquare, FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { usePenitenciariastore } from "../../Store/usePenitenciariaStore";
import { useEffect, useState } from "react";

export default function Penitenciarias(){
    const navigate = useNavigate();
    const handleCadastrar = () => {
        navigate('/penitenciarias/penitenciariaed');
    };
    const [itemExpandido, setItemExpandido] = useState<number | null>(null);
    const {isLoading} = usePenitenciariastore();

    const{
        Penitenciaria,
        PaginaAtual,
        TotalPaginas,
        Filtro,
        setFiltro,
        setPaginaAtual,
        buscaPenitenciaria,
    }=usePenitenciariastore();

    useEffect(()=>{
        console.log('Buscando Penitenciaria', {PaginaAtual, Filtro});
        buscaPenitenciaria();
    },[PaginaAtual,Filtro.nome]);

    //Função para deletar pelo ID
    const handleDeletePenitenciaria = async(id:number)=>{
        
        const confirmaDelete = window.confirm("Tem certeza que quer deletar a penitenciaria do sistema?");
        const token = localStorage.getItem("token");

        if(!confirmaDelete) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/penitenciarias/deletapenitenciaria/${id}`,{
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if(!response.ok){
                throw new Error("Erro ao deletar");
            }
            alert("Deletado com sucesso");
            buscaPenitenciaria(); //atualiza a lista
        } catch (error: any) {
            alert("Falha ao deletar" + error.message);
        }
    };

    const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFiltro({...Filtro, [e.target.name]: e.target.value});
    }
    
    const paginar = (direcao: "anterior" | "proximo") => {
        if (direcao === "anterior" && PaginaAtual > 1) {
            setPaginaAtual(PaginaAtual - 1);
        } else if (direcao === "proximo" && PaginaAtual < TotalPaginas) {
      setPaginaAtual(PaginaAtual + 1);
    }
  };
    

    
    return(
        <section>
            {/* Título e botão de cadastro */}
            <div className="flex justify-between items-center flex-wrap mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Penitenciárias</h2>
                <Button type="button" color="green" onClick={handleCadastrar} >Cadastrar</Button>
            </div>
            {/* Filtros */}            
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                <input
                    type="text"
                    name="nome"
                    placeholder="Buscar por nome"
                    value={Filtro.nome}
                    onChange={handleFiltroChange}
                    className="border px-3 py-2 rounded-lg"
                />
            </div>
            <div className="hidden lg:block text-sm">
                {isLoading ?(
                    <div className="text-center text-gray-500">Carregando...</div>
                ):(
                <table className="w-full border-collapse">
                    <thead className="border-b">
                        <tr>
                            <th className="text-left py-2 pr-2 w-4/12"> Nome </th>
                            <th className="text-left py-2 pr-2 w-2/12"> Cidade</th>
                            <th className="text-left py-2 pr-2 w-1/12"> UF</th>
                            <th className="text-left py-2 pr-2 w-2/12"> Telefone</th>
                            <th className="text-left py-2 pr-2 w-3/12"> e-mail</th>
                            <th className="text-left py-2 pr-2 w-1/12"> Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Penitenciaria?.map((item) =>(
                        <tr key={item.id} className="border-b">
                            <td className="py-5"><div className="font-semibold">{item.nome}</div></td>
                            <td>{item.cidade}</td>
                            <td>{item.uf}</td>
                            <td>{item.telefone}</td>
                            <td>{item.email}</td>
                            <td>
                                <div className="flex items-center gap-2"> {/* Adicionei flex e gap aqui */}
                                    <div className="flex items-center gap-1 w-fit bg-green-200 px-2 py-1 text-green-600 text-xs font-semibold border border-green-600 rounded-lg"
                                        onClick={() => navigate(`/penitenciarias/penitenciariaed/${item.id}`)} // Editar
                                        style={{ cursor: "pointer" }} // Adiciona cursor pointer para indicar que é clicável
                                    >
                                        <AiFillEdit  size={15}/> 
                                    </div>
                                    <div className="flex items-center gap-1 w-fit bg-red-100 px-2 py-1 text-red-600 text-xs font-semibold border border-red-600 rounded-lg"
                                        onClick={() => handleDeletePenitenciaria(item.id!)}
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
                            {(Penitenciaria ?? []).map((item) => (
                                <div key={item.id} className="border rounded-lg flex items-center p-2 gap-2">
                                    <div className="w-3/4">
                                        <div className="font-semibold">{item.nome} </div>
                                        <div className="font-semibold">{item.cidade} </div>
                                        <div className="font-semibold">{item.email}  </div>
                                        <div className="font-semibold">{item.telefone}  </div>
                                        <div className="font-semibold">{item.regime}  </div>
                                        <div className="font-semibold">{item.masculina_feminina === 'M'? 'Masculino':'Feminino'}  </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="font-medium"></div>                                                       
                                            <div className="flex items-center gap-2"> {/* Adicionei flex e gap aqui */}
                                                <div className="flex items-center gap-1 w-fit bg-green-200 px-2 py-1 text-green-600 text-xs font-semibold border border-green-600 rounded-lg"
                                                    onClick={() => navigate(`/codigopenal/codigopenaled/${item.id}`)} // Editar
                                                    style={{ cursor: "pointer" }} // Adiciona cursor pointer para indicar que é clicável
                                                >
                                                    <AiFillEdit size={15}/> 
                                                </div>
                                                <div
                                                    className="flex items-center gap-1 w-fit bg-red-100 px-2 py-1 text-red-600 text-xs font-semibold border border-red-600 rounded-lg"
                                                    onClick={() => handleDeletePenitenciaria(item.id!)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <FaRegTrashAlt size={15} data-tip="Clique aqui para deletar" />
                                                </div>                       
                                            </div>
                                        </div>
                                        {/* Botão para mostrar/ocultar observação */}
                                        <button className="text-blue-600 text-sm mt-2 hover:underline" onClick={() => setItemExpandido(itemExpandido === item.id! ? null : item.id!)}>
                                            {itemExpandido ? <FaRegMinusSquare /> : <FaRegPlusSquare /> }
                                        </button>
                                        {/* Observação visível condicionalmente */}
                                        {itemExpandido === item.id && (
                                            <div className="mt-2 text-gray-600 text-sm bg-gray-100 p-2 rounded">
                                                {item.observacao || "Sem observações."}
                                            </div>
                                        )}                          
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
                    Página {PaginaAtual} de {TotalPaginas}
                </span>
                <Button
                    onClick={() => paginar("proximo")}
                    disabled={PaginaAtual === TotalPaginas}
                    color="gray"
                >
                    Próxima
                </Button>
            </div>
        </section>
    );
}