import { useNavigate } from "react-router-dom"
import { Button } from "../../Components/Button";


export default function CodigoPenal(){
    const navigate = useNavigate();

    const handleCadastrar = () => {
        navigate('/codigopenal/codigopenaled');
    }

    return (
        <section>
            {/* Título e botão de cadastro */}
            <div className="flex justify-between items-center flex-wrap mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Código Penal</h2>
                <Button type="button" color="green" onClick={handleCadastrar} >
                Cadastrar
                </Button>
            </div>
            {/* Filtros */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <input
                    type="text"
                    name="nomeForum"
                    placeholder="Buscar por nome"
                    // value={}
                    // onChange={handleFiltroChange}
                    className="border px-3 py-2 rounded-lg"
                />
            </div>

        </section>
    );
}