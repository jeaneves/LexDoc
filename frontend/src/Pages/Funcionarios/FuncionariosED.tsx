import InputCEP from "@/Components/Inputs/InputCEP";
import InputDocumento from "@/Components/Inputs/InputDocumento";
import InputMoeda from "@/Components/Inputs/InputMoeda";
import { RadioBoolean } from "@/Components/Inputs/InputRadio";
import { Input } from "@/Components/Inputs/Inputs";
import InputTelefone from "@/Components/Inputs/InputTel";
import type { Funcionario, FuncionarioEDProps } from "@/types/Funcionarios";
import { useEffect, useState } from "react";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";


export default function FuncionariosED({FuncionarioData}:FuncionarioEDProps){
    const navigate = useNavigate();
    const {id} = useParams<{id:string}>();
    const [valor, setValor] = useState<number>(0);

    const[formData,setFormData] = useState<Funcionario>({
        id                  :undefined,
        nome                :"",
        cpf                 :"",
        rg                  :"",
        oab                 :"",
        tipo_funcionario    :"",
        cargo               :"",
        salario             :0,
        data_admissao       :"",
        ativo               :true,
        rua                 :"",
        numero              :"",
        bairro              :"",
        cep                 :"",
        cidade              :"",
        celular1            :"",
        celular2            :"",
        email               :"",
        foto_perfil_url     :"",
        usuario_id          :0,
        usuario_admin       :false,
        observacao          :"",
        datacadastro        :"",
        dataalteracao       :"",
        uf                  :"",
    })

    const buscarEnderecoPorCEP = async(cep:string)=>{
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) throw new Error("Erro ao buscar endereço pelo CEP");

            const data = await response.json();
            if (data.erro) throw new Error("CEP não encontrado");

            return{
                rua: data.logradouro ||"",
                bairro: data.bairro  ||"",
                cidade: data.localidade ||"",
                uf: data.uf ||"",

            };
        } catch (error:any) {
            console.error(error);
            alert("CEP não encontrado")
            return null;
        };
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

    // Busca os dados se houver ID na URL
    useEffect(()=>{
        if(id){
            const fetchFunc = async ()=>{
                try {
                    const token = localStorage.getItem("token");
                    const response = await fetch(
                        `${import.meta.env.VITE_API_URL}/funcionarios/listafuncionario/${id}`,
                        {
                            headers:{
                                Authorization: `Bearer ${token}`,
                            }
                        }
                    );

                    if (!response.ok) throw new Error("Erro ao buscar Funcionario");
                    
                    const json = await response.json();
                    const data = json.funcionario?.[0];
                    
                    if (!data) throw new Error("Funcionario não encontrado");

                    setFormData({
                        id               :data.id ?? undefined,              
                        nome             :data.nome ?? "",
                        cpf              :data.cpf ?? "",
                        rg               :data.rg ?? "",
                        oab              :data.oab ?? "",
                        tipo_funcionario :data.tipo_funcionario ?? "",
                        cargo            :data.cargo ?? "",
                        salario          :data.salario ?? 0,
                        data_admissao    :data.data_admissao ?? "",
                        ativo            :data.ativo ?? "",
                        rua              :data.rua ?? "",
                        numero           :data.numero ?? 0,
                        bairro           :data.bairro ?? "",
                        cep              :data.cep ?? "",
                        cidade           :data.cidade ?? "",
                        celular1         :data.celular1 ?? "",
                        celular2         :data.celular2 ?? "",
                        email            :data.email ?? "",
                        foto_perfil_url  :data.foto_perfil_url ?? "",
                        usuario_id       :data.usuario_id ?? "",
                        usuario_admin    :data.usuario_admin ?? "",
                        observacao       :data.observacao ?? "",
                        datacadastro     :data.datacadastro ?? "",
                        dataalteracao    :data.dataalteracao ?? "",
                        uf               :data.uf ?? "",
                    });
                } catch (error:any) {
                    console.error(error);
                    alert("Erro ao carregar os dados.");
                }
            };
            fetchFunc();
        }
    },[id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
            name === "numero" || name === "salario"
                ? Number(value)
                : value === "true"
                ? true
                : value === "false"
                ? false
                : value,
        }));
    };

    const formatDateForInput = (dateString: string) => {
      if (!dateString) return "";
      return dateString.split("T")[0];
    };

    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault //impede o comportamento padrão de um evento quando ele é acionado.
        const token = localStorage.getItem("token");

        try {
            const method = formData?.id ? "PUT" : "POST";
            const url = formData.id ? `${import.meta.env.VITE_API_URL}/funcionarios/alterafuncionario/${formData.id}` : `${import.meta.env.VITE_API_URL}/funcionarios/cadastrafuncionario`;
            
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
                  
            alert(data.message || `Funcionario ${FuncionarioData?.id ? "atualizado" : "cadastrado"} com sucesso!`);
            navigate('/funcionarios');

        } catch (error:any) {
            
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error(error);
            }
            alert("Erro ao salvar o fórum.");            
        }
    }
    return(
        <section>
            <div className="flex justify-between items-center flex-wrap mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    <button className="relative shadow-md gap-2 rounded border-collapse bg-yellow-50 pr-2" onClick={() => navigate(-1)}><TbArrowBack /></button>
                        Cadastro de Funcionário
                </h2>
            </div>
            <form className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                Foto perfil+
                <RadioBoolean
                        name="ativo" 
                        value={formData.ativo} 
                        onChange={handleChange} 
                        trueLabel="Ativo" 
                        falseLabel="Inativo" 
                    />
                <div className="flex items-center my-2 space-x-2">
                    <div className="flex-grow border-t border-black"></div>
                    <span className="text-gray-500 text-xs uppercase ">Dados Pessoais</span>
                    <div className="flex-grow border-t border-black"></div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 py-2">
                    <Input 
                        className="w-fit"
                        name="nome"
                        placeholder="Nome"
                        type="text"
                        value={formData.nome}
                        onChange={handleChange}
                    />  
                    <InputDocumento
                        className="w-fit"
                        tipo="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                    />   
                    <InputDocumento
                        className="w-fit"
                        tipo="rg"
                        name="rg"
                        value={formData.rg}
                        onChange={handleChange}
                    /> 
                    <Input 
                        className="w-fit"
                        name="oab"
                        placeholder="OAB"
                        type="text"
                        value={formData.oab}
                        onChange={handleChange}
                    /> 
                </div>
                <div className="flex items-center my-2 space-x-2">
                    <div className="flex-grow border-t border-black"></div>
                    <span className="text-gray-500 text-xs uppercase ">Endereço</span>
                    <div className="flex-grow border-t border-black"></div>
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
                        className="w-fit md:w-9/12"
                        name="rua"
                        placeholder="Rua"
                        type="text"
                        value={formData.rua}
                        onChange={handleChange}
                    />
                    <Input
                        className="w-fit md:w-1/12"
                        name="numero"
                        placeholder="Numero"
                        type="number"
                        value={formData.numero}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-4 py-2">
                    <Input
                        className="w-fit"
                        name="bairro"
                        placeholder="Bairro"
                        type="text"
                        value={formData.bairro}
                        onChange={handleChange}
                    />
                    <Input
                        className="w-fit"
                        name="cidade"
                        placeholder="Cidade"
                        type="text"
                        value={formData.cidade}
                        onChange={handleChange}
                    />
                    <Input
                        className="w-fit"
                        name="uf"
                        placeholder="UF"
                        type="text"
                        value={formData.uf}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center my-2 space-x-2">
                    <div className="flex-grow border-t border-black"></div>
                    <span className="text-gray-500 text-xs uppercase ">Contato</span>
                    <div className="flex-grow border-t border-black"></div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 py-2">
                    <InputTelefone
                        name="telefone"
                        type="text"
                        onChange={(valorFormatado) => setFormData({ ...formData, celular1: valorFormatado })}
                        value={formData.celular1}
                        className="w-full md:w-2/12"  
                    />
                    <InputTelefone
                        name="telefone"
                        type="text"
                        onChange={(valorFormatado) => setFormData({ ...formData, celular2: valorFormatado })}
                        value={formData.celular2}
                        className="w-full md:w-2/12"  
                    />
                    <Input
                        className="w-full md:w-8/12"
                        name="email"
                        placeholder="e-Mail"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center my-2 space-x-2">
                    <div className="flex-grow border-t border-black"></div>
                    <span className="text-gray-500 text-xs uppercase  ">Dados profissionais</span>
                    <div className="flex-grow border-t border-black "></div>
                </div> 
                <div className="flex flex-col md:flex-row gap-4 py-2">
                    <Input
                        className="w-full md:w-2/12"
                        name="data_admissao"
                        placeholder="Data Adimissao"
                        type="date"
                        value={formatDateForInput(formData.data_admissao)}
                        onChange={handleChange}
                    />
                    
                    <Input
                        className="w-full md:w-2/12"
                        name="tipo_funcionario"
                        placeholder="Tipo Funcionario"
                        type="text"
                        value={formData.tipo_funcionario}
                        onChange={handleChange}
                    />
                    <Input
                        className="w-full md:w-2/12"
                        name="cargo"
                        placeholder="Cargo"
                        type="text"
                        value={formData.cargo}
                        onChange={handleChange}
                    />
                    <Input
                        className="w-full md:w-2/12"
                        name="salario"
                        placeholder="Salário"
                        type="number"
                        value={formData.salario}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col w-full gap-2 py-2">
                    <textarea    
                        name="observacao"
                        value={formData.observacao}
                        onChange={handleChange}
                        placeholder="Obs"
                        className="rounded border border-gray-200 px-3 py-2 w-full shadow"
                        rows={4}
                    />
                </div>
                <div className="flex items-center my-2 space-x-2">
                    <div className="flex-grow border-t border-black"></div>
                    <span className="text-gray-500 text-xs uppercase ">Usuario Sistema</span>
                    <div className="flex-grow border-t border-black"></div>
                </div>           
            </form>
        </section>

    );
}