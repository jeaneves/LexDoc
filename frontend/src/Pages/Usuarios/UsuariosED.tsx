import { Input } from "../../Components/Inputs/Inputs";
import { RadioBoolean } from "../../Components/Inputs/InputRadio";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../../Components/Button";

interface Usuario{
    id?            :number;
    usuario        :string;
    senha          :string;
    administrador  :string;
    ativo          :string;
    id_funcionario : number;
}

interface UsuarioEDProps{
  usuarioData?: Usuario
}

interface Funcionario{
    id_func: number;
    nome: string;
}

export default function UsuariosED( {usuarioData}:UsuarioEDProps){
    const navigate = useNavigate();
    const{id} = useParams<{id: string}>();
    const [funcionarios,setFuncionarios] = useState<Funcionario[]>([]);
    const [formData,setFormData] = useState<Usuario>({
        id: undefined,
        usuario: "",
        senha: "",
        administrador: "N",
        ativo: "S",
        id_funcionario :0,
    });

    useEffect(()=>{
        if (id){
            const fetchUsuario = async () =>{
                try{
                    const token = localStorage.getItem("token");
                    const response = await fetch(
                        `${import.meta.env.VITE_API_URL}/usuarios/listausers/${id}`,
                        {
                            headers:{
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    if (!response) throw new Error("Erro ao buscar usuário");

                    const json = await response.json();
                    const data = json.result?.[0]

                    if (!data) throw new Error("Erro ao buscar usuário");

                    setFormData({
                        id: data.id ?? undefined,
                        usuario: data.usuario ?? "",
                        senha: data.senha ?? "",
                        administrador: data.administrador ?? "N",
                        ativo: data.ativo ?? "S",
                        id_funcionario : data.id_funcionario ?? 0, // <-- CORREÇÃO: Força para Number
                    });
                } catch (error) {
                    console.error(error);
                    alert("Erro ao carregar os dados");
                }
            };
            fetchUsuario();

            const fetchFuncionarios = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const response = await fetch(
                        `${import.meta.env.VITE_API_URL}/funcionarios/listafuncionariouser/${id}`, // **Mude para o seu endpoint real!**
                        {
                            headers:{
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                
                    if (!response.ok) throw new Error("Erro ao buscar funcionários");

                    const json = await response.json();
                    console.log(json);
                    // Assumindo que sua API retorna a lista em 'result' com campos 'id' e 'nome'
                    const data: Funcionario[] = json.funcionario.map((f: any) => ({
                        id_func: Number(f.id),
                        nome: f.nome,
                    })); 
                    setFuncionarios(data);
                } catch (error) {
                    console.error("Erro ao carregar lista de funcionários:", error);
                    alert("Erro ao carregar a lista de funcionários.");
                }
            };
            fetchFuncionarios(); // Chamada da busca
        }
    },[id]);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]:
            name === "usuario"
            ? value.toUpperCase()
            : name === "id_funcionario"
            ? Number(value)
            : value,
        });
    };

    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault();
        const token = localStorage.getItem("token");

        try{
            const method = formData.id ? "PUT": "POST";
            
            const url = formData.id
            ? `${import.meta.env.VITE_API_URL}/usuarios/atualizauser/${formData.id}`
            : `${import.meta.env.VITE_API_URL}/usuarios/criauser`;

            console.log(url)
            const response = await fetch(url,{
                method,
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok){
                throw new Error("Erro ao salvar usuário");
            }

            const data = await response.json();
            alert(data.message || `Código Penal ${formData?.id ? "atualizado" : "cadastrado"} com sucesso!`);
            navigate('/usuarios');
        }catch(error:any){
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(`Erro ao salvar usuário: ${error.response.data.message}`);
            } else {
                alert("Erro ao salvar usuário");
            }
        }
    };

    return(
        <section>
            <div className="flex justify-between items-center flex-wrap mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    <button className="relative shadow-md gap-2 rounded border-collapse bg-yellow-50 pr-2" onClick={() => navigate(-1)}><TbArrowBack /></button>
                    Cadastro de Usuário
                </h2>
            </div>
        
            <form className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="flex ">
                    <div className="flex flex-col md:flex-row gap-1 py-4">
                        <Input 
                            name="usuario"
                            type="text"
                            placeholder="Usuario"
                            onChange={handleChange}
                            value={formData.usuario}
                            className="uppercase w-fit md:w-8/12 " 
                        />
                        
                        <Input 
                            name="senha"
                            type="password"
                            placeholder="Senha"
                            onChange={handleChange}
                            value={formData.senha}
                            className="w-full md:w-4/12" 
                        />
                    </div>
                </div>
                <div className="flex">
                    <fieldset className="border border-gray-400 rounded-md p-3 relative">
                        <legend className="px-2 text-sm text-gray-600">Admin</legend>
                        <div className="ml-auto">
                            <RadioBoolean
                                name="administrador" 
                                value={formData.administrador} 
                                onChange={handleChange} 
                                trueLabel="Sim" 
                                falseLabel="Não" 
                            />
                        </div>
                    </fieldset>
                    <fieldset className="border border-gray-400 rounded-md p-3 relative gap-2 ml-4">
                        <legend className="px-2 text-sm text-gray-600">Ativo</legend>
                        <div className="ml-auto">
                            <RadioBoolean
                                name="ativo" 
                                value={formData.ativo} 
                                onChange={handleChange} 
                                trueLabel="Sim" 
                                falseLabel="Não" 
                            />
                        </div>
                    </fieldset>
                    <div className="flex flex-col md:flex-row gap-1 py-4">
                        <select
                            id="id_funcionario"
                            name="id_funcionario"
                            value={formData.id_funcionario} // O valor deve ser string para o <select>
                            onChange={handleChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                        >                                
                        {funcionarios.map((funcionario) => (
                            <option key={String(funcionario.id_func.toString())} value={funcionario.id_func}>
                                {funcionario.nome}
                            </option>
                        ))}
                        </select>
                    </div>
                    
                </div>
                <div className="flex items-center justify-between mt-4 ">
                    <Button  type='submit' color="green" >  {formData.id ? "Atualizar" : "Salvar"}</Button>  
                </div>
            </form>
        </section>
    )
}
  