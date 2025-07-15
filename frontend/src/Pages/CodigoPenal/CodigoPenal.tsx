import { useNavigate } from "react-router-dom"
import { Button } from "../../Components/Button";
import { FaRegMinusSquare, FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";
import { useCPStore } from "../../Store/useCPStore";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

export default function CodigoPenal(){
    const navigate = useNavigate();
    const [itemExpandido, setItemExpandido] = useState<number | null>(null);
    const {isLoading} = useCPStore();

    const handleCadastrar = () => {
        navigate('/codigopenal/codigopenaled');
    };


    const{
        CodigosPenal,
        PaginaAtual,
        TotalPaginas,
        filtro,
        setFiltro,
        setPaginaAtual,
        buscarCP,
    } = useCPStore();

    useEffect(()=>{
        console.log('Buscando CP', {PaginaAtual, filtro});
        buscarCP();
    },[PaginaAtual,filtro.nome]);

    //Função para deletar CP pelo ID
    const handleDeleteCP = async(id:number)=>{
        const confirmaDelete = window.confirm("Tem certeza que quer deletar o Código Penal do sistema?");
        const token = localStorage.getItem("token");

        if(!confirmaDelete) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/codigopenal/deletacp/${id}`,{
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if(!response.ok){
                throw new Error("Erro ao deletar Código Penal");
            }
            alert("Código Penal deletado com sucesso");
            buscarCP(); //atualiza a lista
        } catch (error: any) {
            alert("Falha ao deletar Codigo Penal" + error.message);
        }
    };

    const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFiltro({...filtro, [e.target.name]: e.target.value});
    }
    
    const paginar = (direcao: "anterior" | "proximo") => {
        if (direcao === "anterior" && PaginaAtual > 1) {
            setPaginaAtual(PaginaAtual - 1);
        } else if (direcao === "proximo" && PaginaAtual < TotalPaginas) {
      setPaginaAtual(PaginaAtual + 1);
    }
  };


    return (
        <section>
            {/* Título e botão de cadastro */}
            <div className="flex justify-between items-center flex-wrap mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Código Penal</h2>
                <Button type="button" color="green" onClick={handleCadastrar} >
                Cadastrar
                </Button>
            </div>
            {/* Filtros */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <input
                    type="text"
                    name="nome"
                    placeholder="Buscar por nome"
                    value={filtro.nome}
                    onChange={handleFiltroChange}
                    className="border px-3 py-2 rounded-lg"
                />
            </div>
            {/* Tabela */}
            <div className="hidden lg:block text-sm">
                {isLoading ? (
                    <div className="text-center text-gray-500">Carregando...</div>
                ) : (
                    <table className="w-full border-collapse">
                        <thead className="border-b"> 
                          <tr>
                            <th className="text-left py-2 pr-2 w-1/12">Código</th>
                            <th className="text-left py-2 pr-2 w-1/12">Nome</th>
                            <th className="text-left py-2 pr-2 w-5/12">Descrição</th>
                            <th className="text-left py-2 pr-2 w-1/12">Ação</th>
                          </tr>
                        </thead>
                        <tbody>
                            {CodigosPenal?.map((item) => (
                                <tr key={item.id} className="border-b">
                                    <td className="py-5"><div className="font-semibold">{item.codigo_penal}</div></td>
                                    <td>{item.nome}</td>
                                    <td>{typeof item.descricao ==='string'?
                                        (item.descricao.length > 100 ? `${item.descricao.slice(0,100)}...` : item.descricao): 'Descrição inválida'}</td>
                                    <td>
                                        <div className="flex items-center gap-2"> {/* Adicionei flex e gap aqui */}
                                            <div className="flex items-center gap-1 w-fit bg-green-200 px-2 py-1 text-green-600 text-xs font-semibold border border-green-600 rounded-lg"
                                                onClick={() => navigate(`/codigopenal/codigopenaled/${item.id}`)} // Editar
                                                style={{ cursor: "pointer" }} // Adiciona cursor pointer para indicar que é clicável
                                            >
                                                <AiFillEdit  size={15}/> 
                                            </div>
                                            <div className="flex items-center gap-1 w-fit bg-red-100 px-2 py-1 text-red-600 text-xs font-semibold border border-red-600 rounded-lg"
                                                onClick={() => handleDeleteCP(item.id)}
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
                {(CodigosPenal ?? []).map((item) => (
                    <div key={item.id} className="border rounded-lg flex items-center p-2 gap-2">
                        <div className="w-3/4">
                            <div className="font-semibold">{item.codigo_penal} </div>
                            <div className="font-semibold">{item.nome}  </div>
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
                                        onClick={() => handleDeleteCP(item.id)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <FaRegTrashAlt size={15} data-tip="Clique aqui para deletar" />
                                    </div>                       
                                </div>
                            </div>
                            {/* Botão para mostrar/ocultar observação */}
                            <button className="text-blue-600 text-sm mt-2 hover:underline" onClick={() => setItemExpandido(itemExpandido === item.id ? null : item.id)}>
                                {itemExpandido ? <FaRegMinusSquare /> : <FaRegPlusSquare /> }
                            </button>
                            {/* Observação visível condicionalmente */}
                            {itemExpandido === item.id && (
                                <div className="mt-2 text-gray-600 text-sm bg-gray-100 p-2 rounded">
                                    {item.descricao || "Sem observações."}
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