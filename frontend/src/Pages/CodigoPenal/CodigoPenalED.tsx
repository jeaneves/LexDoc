import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../Components/Inputs/Inputs";
import { useEffect, useState } from "react";
import { Button } from "../../Components/Button";
interface CodigoPenal{
 id?          :number;
 codigo_penal :string;
 nome         :string;
 descricao    :string;
}

interface CodigoPenalEDProps{
  codigopenalData?: CodigoPenal
}

export default function CodigoPenalEd({codigopenalData}:CodigoPenalEDProps){

    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const [formData,setFormData] = useState<CodigoPenal>({
        id: undefined,
        codigo_penal: "",
        nome: "",
        descricao:"",
    });

    useEffect(()=>{
        if (id){
            const fetchCP = async () =>{
                try {
                    const token = localStorage.getItem("token");
                    const response = await fetch(
                        `${import.meta.env.VITE_API_URL}/codigopenal/listacp/${id}`,
                        {
                            headers:{
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    if (!response) throw new Error("Erro ao buscar fórum");

                    const json = await response.json();
                    const data = json.result?.[0]

                    if (!data) throw new Error("Erro ao buscar fórum");

                    setFormData({
                        id: data.id ?? undefined,
                        codigo_penal: data.codigo_penal ?? "",
                        nome: data.nome ?? "",
                        descricao: data.descricao ?? "",
                    });
                } catch (error) {
                    console.error(error);
                    alert("Erro ao carregar os dados");
                }
            };
            fetchCP();
        }
    },[id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement>) => {
        const {name,value} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value
            // [name]: ["id_cidade","numero"].includes(name) ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent)=>{
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const method = formData?.id ? "PUT" : "POST";
      console.log(method)
      const url = formData.id
        ? `${import.meta.env.VITE_API_URL}/codigopenal/alteracp/${formData.id}`
        : `${import.meta.env.VITE_API_URL}/codigopenal/cadastracp`;

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
      alert(data.message || `Código Penal ${codigopenalData?.id ? "atualizado" : "cadastrado"} com sucesso!`);
      navigate('/codigopenal');
    } catch (error: unknown) {
      
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      alert("Erro ao salvar o fórum.");
    }

  };

    return(
        <section>
            <div className="flex justify-between items-center flex-wrap mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    <button className="relative shadow-md gap-2 rounded border-collapse bg-yellow-50 pr-2" onClick={() => navigate(-1)}><TbArrowBack /></button>
                    Cadastro de Codigo Penal
                </h2>
            </div>

            <form className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-4 py-2">
                    <Input 
                        name="codigo_penal"
                        type="text"
                        placeholder="Codigo Penal"
                        onChange={handleChange}
                        value={formData.codigo_penal}
                        className="w-fit md:w-2/12" 
                    />
                    <Input 
                        name="nome"
                        type="text"
                        placeholder="Nome do Codigo Penal"
                        onChange={handleChange}
                        value={formData.nome}
                        className="w-full md:w-12/12" 
                    />
                </div>
                <div className="flex flex-col w-full gap-2 py-2">
                    <label htmlFor="descricao" className="font-semibold">
                        Descricao
                    </label>
                    <textarea
                        
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Descrição Penal"
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