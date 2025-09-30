import {create} from 'zustand'

const apiUrl = import.meta.env.VITE_API_URL;

interface Usuario{
    id             :number;
    usuario        :string;
    senha          :string;
    administrador  :string;
    data_bloqueio  :string;
    id_funcionario :string;
    data_criacao   :string;
    ativo          :string;
}

interface FilterUsuario {
    nomeUsuario: string;
}

interface UsuarioState{
    usuarios: Usuario[];
    paginaAtual: number;
    totalPaginas: number;
    filter: FilterUsuario;
    isLoading: boolean;
    buscarUsuario: () => Promise<void>;
    setPaginaAtual: (pagina: number) => void;
    setFilter: (filter: FilterUsuario) => void;
}

export const useUsuarioStore = create<UsuarioState>((set,get)=>({
    usuarios: [],
    paginaAtual: 1,
    totalPaginas: 1,
    filter: { nomeUsuario: '' },
    isLoading:false,
    buscarUsuario: async () => {
        const { paginaAtual, filter } = get();
        const token = localStorage.getItem('token');
        set({ isLoading: true });

        try{
            const queryParams = new URLSearchParams({
                pagina: paginaAtual.toString(),
                limite: '5',
            });
            if (filter.nomeUsuario?.trim()) {
                queryParams.append('nomeUsuario', filter.nomeUsuario.trim());
            }

            const url = `${apiUrl}/usuarios/listausers?${queryParams.toString()}`;
            console.log("🔗 URL chamada:", apiUrl);

            const response = await fetch(url,{
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            const result = await response.json();
            console.log("Resposta da API:", result);

            const usuariosData = result?.usuarios?.dados ?? [];
            const totalPaginas = result?.usuarios?.totalPaginas ?? 1;

            if (!Array.isArray(usuariosData)) {
                throw new Error("Dados de usuários inválidos");
            }

            set({
                usuarios: usuariosData,
                totalPaginas: totalPaginas,
                isLoading: false,  
            });

        }catch(error){
            console.error("Erro ao buscar usuários:", error);
            set({ usuarios: [], isLoading: false,});
        }
    },
    setPaginaAtual: (pagina: number) =>{
        set({ paginaAtual: pagina });
    },
    setFilter: (filter: FilterUsuario) =>{
        set({ filter: filter });
    } 
}));