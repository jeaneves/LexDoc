import { TbArrowBack } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Input } from "../../Components/Inputs/Inputs";
import InputCEP from "../../Components/Inputs/InputCEP";
import InputTelefone from "../../Components/Inputs/InputTel";
import { Button } from "../../Components/Button";

export default function Penitenciariaed(){
    const navigate = useNavigate();

    return(
        <section>
            <div className="flex justify-between items-center flex-wrap mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    <button className="relative shadow-md gap-2 rounded border-collapse bg-yellow-50 pr-2" onClick={() => navigate(-1)}><TbArrowBack /></button>
                    Cadastro de Penitenciarias
                </h2>
            </div>
            <form className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4">
                <div className="flex flex-col md:flex-row gap-4 py-2">
                    <Input 
                       className="w-fit md:w-8/12"
                       placeholder="Nome"
                       type="text"
                    />
                    <Input 
                       className="w-fit md:w-2/12"
                       placeholder="Capacidade"
                       type="number"
                    />
                    <select className="ml-auto w-full md:w-2/12 rounded border border-gray-300 px-3 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 ">
                        <option value="">Masculina</option>
                        <option value="">Feminina</option>
                    </select>
                    <select className="ml-auto w-full md:w-2/12 rounded border border-gray-300 px-3 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 ">
                        <option value="">Aberto</option>
                        <option value="">Semi-aberto</option>
                        <option value="">Fechado</option>
                    </select>
                </div>
                <div className="flex items-center my-2 space-x-2">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="text-gray-500 text-xs uppercase ">Endereço</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 py-2">
                    <InputCEP className="w-full md:w-2/12" />
                    <Input 
                        placeholder="Rua"
                        className="w-fit md:w-10/12"
                        type="text"
                    />
                    <Input 
                        placeholder="Numero"
                        className="w-fit md:w-2/12"
                        type="number"
                    />
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                    <Input 
                        placeholder="Bairro"
                        className="w-full md:w-4/12"
                        type="text"
                    />                    
                    <Input 
                        placeholder="Cidade"
                        className="w-full md:w-5/12"
                        type="text"
                    />
                    <Input 
                        placeholder="UF"
                        className="w-full md:w-1/12"
                        type="text"
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
                        className="w-full md:w-3/12"
                    />
                    <label htmlFor="descricao" className="font-semibold">Fax</label>
                    <InputTelefone 
                        className="w-full md:w-3/12"
                    />
                    <Input
                        className="w-full md:w-5/12"
                        placeholder="email"
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-4 py-2">
                    <Input
                        className="w-full md:w-6/12"
                        placeholder="Diretor"
                    />
                    <Input 
                        className="w-full md:w-5/12"
                        placeholder="email"
                    />
                    <InputTelefone 
                        className="w-full md:w-2/12"
                    />
                    
                </div>
                <div className="flex items-center my-2 space-x-2">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="text-gray-500 text-xs uppercase ">Observações</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex flex-col w-full gap-2 py-2">
                    <textarea    
                        name="descricao"
                        // value={formData.descricao}
                        // onChange={handleChange}
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