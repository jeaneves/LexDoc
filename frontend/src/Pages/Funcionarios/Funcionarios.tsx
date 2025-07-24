import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Inputs/Inputs";

export default function Funcionarios(){
    const navigate = useNavigate();
    const handleCadastrar = () => {
        navigate('/funcionarios/funcionariosed');
    };
    return(
        <section>
            {/* Título e botão de cadastro */}
            <div className="flex justify-between items-center flex-wrap mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Funcionários</h2>
                <Button type="button" color="green" onClick={handleCadastrar} >
                    Cadastrar
                </Button>
            </div>
            
            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <Input
                    type="text"
                    name="nome"
                    placeholder="Buscar por nome"
                    // value={filtro.nome}
                    // onChange={handleFiltroChange}
                    className="border px-3 py-2 rounded-lg"
                />
            </div>
        </section>
    )
}