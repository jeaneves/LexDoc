import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../Components/Inputs/Inputs";
import InputCEP from "../../Components/Inputs/InputCEP";
import InputTelefone from "../../Components/Inputs/InputTel";
import { Button } from "../../Components/Button";
import type { Penitenciaria, PenitenciariaEDProps } from "../../types/Penitenciarias";
import { useEffect, useState } from "react";

export default function Penitenciariaed({PenitenciariaData}:PenitenciariaEDProps){
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();

    const [formData, setFormData] = useState <Penitenciaria>({
        id                  :undefined,
        nome                :"",
        rua                 :"",
        numero              :0,
        bairro              :"",
        cidade              :"",
        cep                 :"",
        telefone            :"",
        fax                 :"",
        capacidade_total    :0,
        email               :"",
        regime              :"",
        nome_diretor        :"",
        telefone_diretor    :"",
        email_diretor       :"",
        masculina_feminina  :"",
        observacao          :"",
        uf                  :"",
    });
    
    const buscarEnderecoPorCEP = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) throw new Error("Erro ao buscar endereço pelo CEP");
            
            const data = await response.json();
            if (data.erro) throw new Error("CEP não encontrado");

            return {
                rua: data.logradouro || "",
                bairro: data.bairro || "",
                cidade: data.localidade || "",
                uf: data.uf || "",
            };
        } catch (error) {
            console.error(error);
            alert("Erro ao buscar endereço pelo CEP.");
            return null;
        }
    };
    useEffect(() => {
        const consultarCEP = async () => {
             const cepNumerico = formData.cep.replace(/\D/g, ""); // remove traços, pontos etc.
            if (cepNumerico.length === 8) {
                const endereco = await buscarEnderecoPorCEP(formData.cep);
                if (endereco) {
                    setFormData((prev) => ({
                        ...prev,
                        rua: endereco.rua,
                        bairro: endereco.bairro,
                        cidade: endereco.cidade,
                        uf: endereco.uf,
                    }));
                }
            }
        };
        consultarCEP();
    }, [formData.cep]);

    useEffect(() => {
        if (id) {
          const fetchPenitenciaria = async () => {
            try {
              const token = localStorage.getItem("token");
              const response = await fetch(
                `${import.meta.env.VITE_API_URL}/penitenciarias/listapenitenciaria/${id}`,
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
                id:   data.id ?? undefined,              
                nome: data.nome ?? "",              
                rua: data.rua ?? "",
                numero: data.numero ?? 0,            
                bairro: data.bairro ?? "",            
                cidade: data.cidade ?? "",            
                cep: data.cep ?? "",               
                telefone: data.telefone ?? "",          
                fax: data.fax ?? "",               
                capacidade_total: data.capacidade_total ?? 0,  
                email: data.email ?? "",             
                regime: data.regime ?? "",            
                nome_diretor: data.nome_diretor ?? "",      
                telefone_diretor: data.telefone_diretor ?? "",  
                email_diretor: data.email_diretor ?? "",     
                masculina_feminina: data.masculina_feminina ?? "",
                observacao: data.observacao ?? "",        
                uf: data.uf ?? "",                
              });
            } catch (error) {
              console.error(error);
              alert("Erro ao carregar os dados");
            }
          };
    
          fetchPenitenciaria();
        }
        
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const {name,value} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: ["numero","capacidade_total"].includes(name) ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent)=>{
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const method = formData?.id ? "PUT" : "POST";
      console.log(method)
      const url = formData.id
        ? `${import.meta.env.VITE_API_URL}/penitenciarias/alterapenitenciaria/${formData.id}`
        : `${import.meta.env.VITE_API_URL}/penitenciarias/cadastrapenitenciaria`;

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
      alert(data.message || `Penitenciaria ${PenitenciariaData?.id ? "atualizado" : "cadastrado"} com sucesso!`);
      navigate('/penitenciarias');
    } catch (error: unknown) {
      
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      alert("Erro ao salvar.");
    }

  };

    return(
        <section>
            <div className="flex justify-between items-center flex-wrap mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    <button className="relative shadow-md gap-2 rounded border-collapse bg-yellow-50 pr-2" onClick={() => navigate(-1)}><TbArrowBack /></button>
                    Cadastro de Penitenciarias
                </h2>
            </div>
            <form className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-4 py-2">
                    <Input 
                       className="w-fit md:w-8/12"
                       placeholder="Nome"
                       type="text"
                       onChange={handleChange}
                       value={formData.nome}
                       name="nome"
                    />
                    <Input 
                       className="w-fit md:w-2/12"
                       placeholder="Capacidade"
                       type="number"
                       onChange={handleChange}
                       value={formData.capacidade_total}
                       name="capacidade_total"
                    />
                    <select className="ml-auto w-full md:w-2/12 rounded border border-gray-300 px-3 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    name="masculina_feminina"
                    value={formData.masculina_feminina}
                    onChange={handleChange}
                    >
                        <option value="M">Masculina</option>
                        <option value="F">Feminina</option>
                    </select>
                    <Input 
                        className="ml-auto w-full md:w-2/12 rounded border border-gray-300 px-3 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        placeholder="Regime"
                        type="text"
                        name="regime"
                        value={formData.regime}
                        onChange={handleChange}
                    />
                    
                </div>
                <div className="flex items-center my-2 space-x-2">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="text-gray-500 text-xs uppercase ">Endereço</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 py-2">
                    <InputCEP 
                        name="cep"
                        type="text"
                        value={formData.cep}
                        onChange={(valorFormatado) => setFormData({ ...formData, cep: valorFormatado })}
                        className="w-fit md:w-2/12"
                    />
                    <Input 
                        placeholder="Rua"
                        className="w-fit md:w-10/12"
                        type="text"
                        onChange={handleChange}
                        value={formData.rua}
                        name="rua"
                    />
                    <Input 
                        placeholder="Numero"
                        className="w-fit md:w-2/12"
                        type="number"
                        onChange={handleChange}
                        value={formData.numero}
                        name="numero"
                    />
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                    <Input 
                        placeholder="Bairro"
                        className="w-full md:w-4/12"
                        type="text"
                        onChange={handleChange}
                        value={formData.bairro}
                        name="bairro"
                    />                    
                    <Input 
                        placeholder="Cidade"
                        className="w-full md:w-5/12"
                        type="text"
                        onChange={handleChange}
                        value={formData.cidade}
                        name="cidade"
                    />
                    <Input 
                        placeholder="UF"
                        className="w-full md:w-1/12"
                        type="text"
                        onChange={handleChange}
                        value={formData.uf}
                        name="uf"
                    />
                </div>
                <div className="flex items-center my-2 space-x-2">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="text-gray-500 text-xs uppercase ">Contato</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 py-2">
                    <label htmlFor="descricao" className="font-semibold">Telefone</label>
                    <InputTelefone 
                        name="telefone"
                        type="text"
                        onChange={(valorFormatado) => setFormData({ ...formData, telefone: valorFormatado })}
                        value={formData.telefone}
                        className="w-full md:w-4/12"                        
                    />
                    <label htmlFor="descricao" className="font-semibold">Fax</label>
                    <InputTelefone 
                        name="fax"
                        type="text"
                        onChange={(valorFormatado) => setFormData({ ...formData, telefone: valorFormatado })}
                        value={formData.fax}
                        className="w-full md:w-4/12" 

                    />
                    <Input
                        className="w-full md:w-5/12"
                        placeholder="email"
                        onChange={handleChange}
                        value={formData.email}
                        type="text"
                        name="email"
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-4 py-2">
                    <Input
                        className="w-full md:w-6/12"
                        placeholder="Diretor"
                        onChange={handleChange}
                        value={formData.nome_diretor}
                        name="nome_diretor"
                        type="text"
                    />
                    <Input 
                        className="w-full md:w-5/12"
                        placeholder="email"
                        onChange={handleChange}
                        value={formData.email_diretor}
                        name="email_diretor"
                        type="email"
                    />
                    <InputTelefone 
                        name="telefone_diretor"
                        type="text"
                        onChange={(valorFormatado) => setFormData({ ...formData, telefone: valorFormatado })}
                        value={formData.telefone_diretor}
                        className="w-full md:w-4/12" 
                    />
                    
                </div>
                <div className="flex items-center my-2 space-x-2">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="text-gray-500 text-xs uppercase ">Observações</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex flex-col w-full gap-2 py-2">
                    <textarea    
                        name="observacao"
                        value={formData.observacao}
                        onChange={handleChange}
                        placeholder="Obs"
                        className="rounded border border-gray-300 px-3 py-2 w-full shadow"
                        rows={4}
                    />
                </div>
                <div className="flex items-center my-2 space-x-2">
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                
                <div className="flex items-center justify-between mt-4 ">
                    {/* <Button  type='submit' color="green" >  {formData.id ? "Atualizar" : "Salvar"}</Button>   */}
                    <Button  type='submit' color="green" >  Salvar</Button>  
                </div>
                

                
            </form>
        </section>
    )
}