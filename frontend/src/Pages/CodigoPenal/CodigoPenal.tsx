import { useNavigate } from "react-router-dom"
import { Button } from "../../Components/Button";
import { FaRegTrashAlt } from "react-icons/fa";
import { TbHomeEdit } from "react-icons/tb";


export default function CodigoPenal(){
    const navigate = useNavigate();

    const handleCadastrar = () => {
        navigate('/codigopenal/codigopenaled');
    }

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
                    name="nomeForum"
                    placeholder="Buscar por nome"
                    // value={}
                    // onChange={handleFiltroChange}
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
                            <th className="text-left py-2 pr-2 w-2/12">Nome</th>
                            <th className="text-left py-2 pr-2 w-1/12">Cidade</th>
                            <th className="text-left py-2 pr-2 w-1/12">Telefone</th>
                            <th className="text-left py-2 pr-2 w-2/12">Email</th>
                            <th className="text-left py-2 pr-2 w-5/12">Obs</th>
                            <th className="text-left py-2 pr-2 w-5/12">Ação</th>
                          </tr>
                        </thead>
                        <tbody>
                            {forums.map((item) => (
                                <tr key={item.id} className="border-b">
                                    <td className="py-5"><div className="font-semibold">{item.nome_forum}</div></td>
                                    <td>{item.id_cidade}</td>
                                    <td>{item.telefone_forum}</td>
                                    <td>{item.email_forum}</td>
                                    <td>{item.observacao}</td>
                                    <td>
                                        <div className="flex items-center gap-2"> {/* Adicionei flex e gap aqui */}
                                            <div className="flex items-center gap-1 w-fit bg-green-200 px-2 py-1 text-green-600 text-xs font-semibold border border-green-600 rounded-lg"
                                                onClick={() => navigate(`/forum/forumed/${item.id}`)} // Editar
                                                style={{ cursor: "pointer" }} // Adiciona cursor pointer para indicar que é clicável
                                            >
                                                <TbHomeEdit size={15}/> 
                                            </div>
                                            <div className="flex items-center gap-1 w-fit bg-red-100 px-2 py-1 text-red-600 text-xs font-semibold border border-red-600 rounded-lg"
                                                // onClick={() => handleDelete(item.id)}
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
        </section>
    );
}