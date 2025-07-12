import { Button } from "../../Components/Button";
import { Input } from "../../Components/Inputs/Inputs";

export default function ForumED() {
  return (
    <section>
      <div className="flex justify-between items-center flex-wrap mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Cadastro de Fórum</h2>
      </div>

      <form className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4">
        <Input
          id="nome_forum"
          type="text"
          placeholder="Nome do Fórum"
          onChange={() => {}}
          className="w-full"
        />

        <div className="flex flex-col md:flex-row gap-4 py-2">
          <Input
            id="rua"
            type="text"
            placeholder="Rua do Fórum"
            onChange={() => {}}
            className="w-full md:w-4/12"
          />
          <Input
            id="numero"
            type="text"
            placeholder="Número"
            onChange={() => {}}
            className="w-full md:w-2/12"
          />
          <Input
            id="cep"
            type="text"
            placeholder="CEP"
            onChange={() => {}}
            className="w-full md:w-3/12"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 py-1">
          <Input
            id="bairro"
            type="text"
            placeholder="Bairro"
            onChange={() => {}}
            className="w-full md:w-6/12"
          />
          <select
            className="w-full md:w-3/12 rounded border border-gray-300 px-3 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Andradina</option>
            <option>Araçatuba</option>
            <option>Birigui</option>
            <option>Penápolis</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-4 py-1">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            onChange={() => {}}
            className="w-full md:w-8/12"
          />
          <Input
            id="telefone"
            type="text"
            placeholder="Telefone"
            onChange={() => {}}
            className="w-full md:w-4/12"
          />
        </div>

        <div className="flex flex-col w-full gap-2 py-2">
          <label htmlFor="observacao" className="font-semibold">
            Observação
          </label>
          <textarea
            name="observacao"
            id="observacao"
            placeholder="Digite sua mensagem"
            className="rounded border border-gray-300 px-3 py-2 w-full shadow"
            rows={4}
          />
        </div>
        <div className="flex items-center justify-between mt-4 ">
        <Button  type='submit' color="green" > Salvar</Button>  
        </div>
      </form>
    </section>
  );
}
