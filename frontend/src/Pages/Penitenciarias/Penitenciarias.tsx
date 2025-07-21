import { AiFillEdit } from "react-icons/ai";
import { Button } from "../../Components/Button";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Penitenciarias(){
    const navigate = useNavigate();
    const handleCadastrar = () => {
        navigate('/penitenciarias/penitenciariaed');
    };

    return(
        <section>
            {/* Título e botão de cadastro */}
            <div className="flex justify-between items-center flex-wrap mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Penitenciárias</h2>
                <Button type="button" color="green" onClick={handleCadastrar} >Cadastrar</Button>
            </div>
            {/* Filtros */}            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <input
                    type="text"
                    name="nome"
                    placeholder="Buscar por nome"
                    value=""
                    // onChange=""
                    className="border px-3 py-2 rounded-lg"
                />
            </div>
            <div className="hidden lg:block text-sm">
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
                        <tr className="border-b">
                            <td>nome</td>
                            <td>Araçatuba</td>
                            <td>SP</td>
                            <td>(18) 3698-9010</td>
                            <td>penitenciaria@email.gov.br</td>
                            <td>
                                <div className="flex items-center gap-2"> {/* Adicionei flex e gap aqui */}
                                    <div className="flex items-center gap-1 w-fit bg-green-200 px-2 py-1 text-green-600 text-xs font-semibold border border-green-600 rounded-lg"
                                        // onClick={() => navigate(`/codigopenal/codigopenaled/${item.id}`)} // Editar
                                        style={{ cursor: "pointer" }} // Adiciona cursor pointer para indicar que é clicável
                                    >
                                        <AiFillEdit  size={15}/> 
                                    </div>
                                    <div className="flex items-center gap-1 w-fit bg-red-100 px-2 py-1 text-red-600 text-xs font-semibold border border-red-600 rounded-lg"
                                        // onClick={() => handleDeleteCP(item.id)}
                                        style={{ cursor: "pointer" }} // Adiciona cursor pointer para indicar que é clicável
                                    >
                                        <FaRegTrashAlt size={15} data-tip="Clique aqui para deletar"/>
                                    </div>                        
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/*Grid menor*/}
            {/* Paginação */}
            <div className="flex justify-center mt-6 gap-4">
                <Button
                    // onClick={() => paginar("anterior")}
                    // disabled={PaginaAtual === 1}
                    color="gray"
                >
                    Anterior
                </Button>
                <span className="self-center">
                    {/* Página {PaginaAtual} de {TotalPaginas} */}
                </span>
                <Button
                    // onClick={() => paginar("proximo")}
                    // disabled={PaginaAtual === TotalPaginas}
                    color="gray"
                >
                    Próxima
                </Button>
            </div>
        </section>
    );
}