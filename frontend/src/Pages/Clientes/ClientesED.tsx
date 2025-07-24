import { useState } from "react";
import { FcCurrencyExchange, FcKindle, FcPackage, FcTodoList } from "react-icons/fc";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function ClientesED(){
    const [tab, setTab] = useState("cadastro");
    const navigate = useNavigate();

    return(
        <section>
            <div className="flex justify-between items-center flex-wrap mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    <button className="relative shadow-md gap-2 rounded border-collapse bg-yellow-50 pr-2" onClick={() => navigate(-1)}><TbArrowBack /></button>
                    Adminstrador de Cliente
                </h2>
            </div>
            {/* Abas */}
            
            <div className="border-b border-gray-300 mb-4">
                <nav className="flex gap-4">
                    <button
                        className={` flex  px-4 py-2 border-b-2 ${tab === "cadastro"? "border-yellow-500 text-yellow-600 font-semibold" : "border-transparent text-gray-500 hover:text-yellow-600"}`}
                        onClick={() => setTab("cadastro")}
                    >
                        <div className="gap-6 w-6"> <FcKindle size={20}/></div> <span className="hidden md:inline">Cadastro</span>
                    </button>
                    <button
                        className={`flex px-4 py-2 border-b-2 ${tab === "arquivos"? "border-yellow-500 text-yellow-600 font-semibold": "border-transparent text-gray-500 hover:text-yellow-600"}`}
                        onClick={() => setTab("arquivos")}
                    >
                       <div className="gap-6 w-6"> <FcPackage size={20}/></div> <span className="hidden md:inline">Arquivos</span>
                    </button>
                    <button
                        className={`flex px-4 py-2 border-b-2 ${tab === "tarefas"? "border-yellow-500 text-yellow-600 font-semibold": "border-transparent text-gray-500 hover:text-yellow-600"}`}
                        onClick={() => setTab("tarefas")}
                    >
                        <div className="gap-6 w-6"> <FcTodoList size={20}/></div> <span className="hidden md:inline">Tarefas</span>
                    </button>
                    <button
                        className={`flex px-4 py-2 border-b-2 ${tab === "financeiro"? "border-yellow-500 text-yellow-600 font-semibold": "border-transparent text-gray-500 hover:text-yellow-600"}`}
                        onClick={() => setTab("financeiro")}
                    >
                        <div className="gap-6 w-6"> <FcCurrencyExchange size={20}/></div> <span className="hidden md:inline">Financeiro</span>
                    </button>
                </nav>
            </div>
            
            {/* Conteúdo de cada aba */}
            <div className="p-4 bg-white shadow rounded">
                {tab === "cadastro" && 
                    <form className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4">
                        <div>Formulário de Cadastro</div>
                    </form>
                }
                
                {tab === "arquivos" && 
                    <form className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4">
                        <div>Formulário de Arquivos</div>
                    </form>
                }
                {tab === "tarefas" && 
                    <form className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4">
                        <div>Informações Tarefas</div>
                    </form>
                }
                {tab === "financeiro" && 
                    <form className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4">
                        <div>Informações Financeiras</div>
                    </form>
                }
            </div>
        </section>
    )
}