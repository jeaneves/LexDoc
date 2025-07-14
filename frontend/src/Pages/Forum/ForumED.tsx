
import { useEffect, useState } from "react";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Inputs/Inputs";
import { useNavigate, useParams } from "react-router-dom";
import { TbArrowBack } from "react-icons/tb";

interface ForumData{
  id?: number;
  nome_forum: string;
  rua:  string;
  numero: number ;
  cep: string;
  bairro: string;
  id_cidade: number ;
  email_forum: string;
  telefone_forum: string;
  observacao: string;
}

interface ForumEDProps{
  forumData?: ForumData
}

export default function ForumED({forumData}:ForumEDProps) {
 
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();

  

  const [formData, setFormData] = useState <ForumData>({
    id: undefined,
    nome_forum: "",
    rua:  "",
    numero: 0,
    cep: "",
    bairro: "",
    id_cidade: 0,
    email_forum: "",
    telefone_forum: "",
    observacao: "",
  });

  // useEffect(()=>{
  //   if (forumData){
  //     setFormData(forumData);
  //   }
  // },[forumData]);

// Busca os dados se houver ID na URL
   useEffect(() => {
    if (id) {
      const fetchForum = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/forum/listaforum/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) throw new Error("Erro ao buscar fórum");

          const json = await response.json();
          const data = json.result?.[0];

          if (!data) throw new Error("Fórum não encontrado");

          setFormData({
            id: data.id ?? undefined,
            nome_forum: data.nome_forum ?? "",
            rua: data.rua ?? "",
            numero: data.numero ?? 0,
            cep: data.cep ?? "",
            bairro: data.bairro ?? "",
            id_cidade: data.id_cidade ?? 0,
            email_forum: data.email_forum ?? "",
            telefone_forum: data.telefone_forum ?? "",
            observacao: data.observacao ?? "",
          });
        } catch (error) {
          console.error(error);
          alert("Erro ao carregar os dados do fórum.");
        }
      };

      fetchForum();
    }
  }, [id]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const {name,value} = e.target;
    setFormData((prev)=>({
      ...prev,
      [name]: ["id_cidade","numero"].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent)=>{
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const method = formData?.id ? "PUT" : "POST";
      console.log(method)
      const url = formData.id
        ? `${import.meta.env.VITE_API_URL}/forum/alteraforum/${formData.id}`
        : `${import.meta.env.VITE_API_URL}/forum/cadastraforum`;

        const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao salvar");
      

      const data = await response.json();
      console.log('backend',data)
      alert(data.message || `Fórum ${forumData?.id ? "atualizado" : "cadastrado"} com sucesso!`);
      navigate('/forum');
    } catch (error: unknown) {
      
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      alert("Erro ao salvar o fórum.");
    }

  };
  

  return (
    <section>
      
      <div className="flex justify-between items-center flex-wrap mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          <button className="relative shadow-md gap-2 rounded border-collapse bg-yellow-50 pr-2" onClick={() => navigate(-1)}><TbArrowBack /></button>
              Cadastro de Fórum
        </h2>
      </div>
      

      <form className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <Input
          
          name="nome_forum"
          type="text"
          placeholder="Nome do Fórum"
          onChange={handleChange}
          value={formData.nome_forum}
          className="w-full"
        />

        <div className="flex flex-col md:flex-row gap-4 py-2">
          <Input
            
            name="rua"
            type="text"
            placeholder="Rua do Fórum"
            onChange={handleChange}
            value={formData.rua}
            className="w-full md:w-4/12"
          />
          <Input
            
            name="numero"
            type="number"
            placeholder="Número"
            onChange={handleChange}
            value={formData.numero}
            className="w-full md:w-2/12"
          />
          <Input
            
            name="cep"
            type="text"
            placeholder="CEP"
            onChange={handleChange}
            value={formData.cep}
            className="w-full md:w-3/12"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 py-1">
          <Input
            
            name="bairro"
            type="text"
            placeholder="Bairro"
            onChange={handleChange}
            value={formData.bairro}
            className="w-full md:w-6/12"
          />
          <select 
            className="w-full md:w-3/12 rounded border border-gray-300 px-3 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            
            name="id_cidade"
            value={formData.id_cidade}
            onChange={handleChange}
          >
            <option value="1" >Andradina</option>
            <option value="2">Araçatuba</option>
            <option value="3">Birigui</option>
            <option value="4">Penápolis</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-4 py-1">
          <Input
            
            name="email_forum"
            type="email_forum"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email_forum}
            className="w-full md:w-8/12"
          />
          <Input
            
            name="telefone_forum"
            type="text"
            placeholder="Telefone"
            onChange={handleChange}
            value={formData.telefone_forum}
            className="w-full md:w-4/12"
          />
        </div>

        <div className="flex flex-col w-full gap-2 py-2">
          <label htmlFor="observacao" className="font-semibold">
            Observação
          </label>
          <textarea
            
            name="observacao"
            value={formData.observacao}
            onChange={handleChange}
            placeholder="Digite sua mensagem"
            className="rounded border border-gray-300 px-3 py-2 w-full shadow"
            rows={4}
          />
        </div>
        <div className="flex items-center justify-between mt-4 ">
        <Button  type='submit' color="green" >  {formData.id ? "Atualizar" : "Salvar"}</Button>  
        </div>
      </form>
    </section>
  );
}
