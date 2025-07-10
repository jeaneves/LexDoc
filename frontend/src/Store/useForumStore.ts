import {create} from 'zustand';

interface Forum{
    ID               :number;
    NOME_FORUM       :string;
    RUA              :string;
    BAIRRO           :string;
    NUMERO           :number;
    CEP              :string;
    ID_CIDADE        :number;
    TELEFONE_FORUM   :string;
    EMAIL_FORUM      :string;
    OBSERVACAO       :string;
}

interface FilterForum {
    nomeForum: string;
}

interface ForumState {
    forums: Forum[];
    paginaAtual: number;
    totalPaginas: number;
    filter: FilterForum;
    isLoading: boolean;
    buscarForum: () => Promise<void>;
    setPaginaAtual: (pagina: number) => void;
    setFilter: (filter: FilterForum) => void;
}

export const useForumStore = create<ForumState>((set,get)=>({
    forums: [],
    paginaAtual: 1,
    totalPaginas: 1,
    filter: { nomeForum: '' },
    isLoading:false,

    buscarForum: async ()=>{
        const {paginaAtual, filter} = get();
        const token = localStorage.getItem('token');
        console.log("Token usado:", token);
        set({ isLoading: true });

        try {
            const queryParams = new URLSearchParams({
                pagina: paginaAtual.toString(),
                limite: '10', // Defina o limite de resultados por página
                nomeForum: filter.nomeForum
            });

            const response = await fetch(
                `http://localhost:3000/forum/listaforums?${queryParams.toString()}`,
                {
                    headers:{
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Erro ao buscar fórum');
            }

            const result = await response.json();
            console.log("Resultado da API:", result);
            set({
                forums: result.forums?.dados ,
                totalPaginas: result.forums.totalPaginas,
                isLoading: false 
            });
        } catch (error) {
            console.error("Erro ao buscar fórum:", error);
            throw error;
        }
    },
    setPaginaAtual: (pagina: number) => {
        set({ paginaAtual: pagina });
    },

    setFilter:(filter)=>{
        set({filter,paginaAtual: 1}); // reseta para página 1 ao aplicar filtros
    },
}));