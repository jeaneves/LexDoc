import { useEffect } from "react";
import { Button } from "../../Components/Button";
import { useForumStore } from "../../Store/useForumStore";

export default function Forum() {
  const { isLoading } = useForumStore();
  
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
        <Button type="button" color="green">
          Cadastrar
        </Button>
      </div>
      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            name="nome"
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
                <th className="text-left py-2 pr-2 w-3/12">Nome</th>
                <th className="text-left py-2 pr-2 w-1/12">Cidade</th>
                <th className="text-left py-2 pr-2 w-1/12">Telefone</th>
                <th className="text-left py-2 pr-2 w-1/12">Email</th>
                <th className="text-left py-2 pr-2 w-5/12">Obs</th>
              </tr>
            </thead>
            <tbody>
              {forums.map((item) => (
                <tr className="border-b" key={item.ID}>
                  <td>
                    <div className="font-semibold" >{item.NOME_FORUM}</div>
                  </td>
                  <td>{item.ID_CIDADE}</td>
                  <td>{item.TELEFONE_FORUM}</td>
                  <td>{item.EMAIL_FORUM}</td>
                  <td>{item.OBSERVACAO}</td>
                </tr>
              ))}
            </tbody>
        </table>
        )} 
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