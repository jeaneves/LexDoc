import { TbArrowBack } from "react-icons/tb";
import { useNavigate } from "react-router-dom";


export default function FuncionariosED(){
    const navigate = useNavigate();
    return(
        <section>
            <div className="flex justify-between items-center flex-wrap mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    <button className="relative shadow-md gap-2 rounded border-collapse bg-yellow-50 pr-2" onClick={() => navigate(-1)}><TbArrowBack /></button>
                        Cadastro de Funcionário
                </h2>
            </div>
            <form className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4">
                
            </form>
        </section>

    );
}