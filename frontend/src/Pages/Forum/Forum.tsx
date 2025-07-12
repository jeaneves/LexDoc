import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button";
import { useForumStore } from "../../Store/useForumStore";
import { TbHomeEdit } from "react-icons/tb";
import { FaRegMinusSquare, FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";


export default function Forum() {
  const { isLoading } = useForumStore();
  const [itemExpandido, setItemExpandido] = useState<number | null>(null);
  const navigate = useNavigate();
  const handleCadastrar = () => {
    navigate('/forum/forumed');
  }
  
  const {
    forums,
    paginaAtual,
    totalPaginas,
    filter,
    setFilter,
    setPaginaAtual,
    buscarForum,
  } = useForumStore();
 
  useEffect(()=>{
    buscarForum();
    console.log("Filtro atual:", filter.nomeForum);
  },[paginaAtual, filter.nomeForum]);

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

 

  return (
    <section >
      {/* Título e botão de cadastro */}
      <div className="flex justify-between items-center flex-wrap mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Fórum</h2>
        
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
            value={filter.nomeForum}
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
                          //  onClick={()=>()} // Adiciona o evento de clique
                          style={{ cursor: "pointer" }} // Adiciona cursor pointer para indicar que é clicável
                      >
                        <TbHomeEdit size={15}/> 
                      </div>
                      <div className="flex items-center gap-1 w-fit bg-red-100 px-2 py-1 text-red-600 text-xs font-semibold border border-red-600 rounded-lg"
                          //  onClick={()=>()} // Adiciona o evento de clique
                          style={{ cursor: "pointer" }} // Adiciona cursor pointer para indicar que é clicável
                      >
                        <FaRegTrashAlt size={15} />
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
        { (forums ?? []).map((item) => (
          <div key={item.id} className="border rounded-lg flex items-center p-2 gap-2">
            <div className="w-3/4">
            <div className="font-semibold">{item.nome_forum} </div>
              <div className="font-semibold">{item.id_cidade}  </div>
              <div className="text-gray-500">{item.email_forum}</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-medium">{item.telefone_forum}</div>                                                       
                  <div className="flex items-center gap-2"> {/* Adicionei flex e gap aqui */}
                    <div className="flex items-center gap-1 w-fit bg-green-200 px-2 py-1 text-green-600 text-xs font-semibold border border-green-600 rounded-lg"
                      //  onClick={()=>()} // Adiciona o evento de clique
                      style={{ cursor: "pointer" }} // Adiciona cursor pointer para indicar que é clicável
                    >
                      <TbHomeEdit size={15}/> 
                    </div>
                    <div className="flex items-center gap-1 w-fit bg-red-100 px-2 py-1 text-red-600 text-xs font-semibold border border-red-600 rounded-lg"
                      //  onClick={()=>()} // Adiciona o evento de clique
                      style={{ cursor: "pointer" }} // Adiciona cursor pointer para indicar que é clicável
                    >
                      <FaRegTrashAlt size={15} />
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
            disabled={paginaAtual === 1}
            color="gray"
          >
            Anterior
          </Button>
          <span className="self-center">
            Página {paginaAtual} de {totalPaginas}
          </span>
          <Button
            onClick={() => paginar("proximo")}
            disabled={paginaAtual === totalPaginas}
            color="gray"
          >
            Próxima
          </Button>
        </div>
       
    </section>
  );
}