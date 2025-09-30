import {create} from 'zustand';

const apiUrl = import.meta.env.VITE_API_URL;
interface Forum{
    id               :number;
    nome_forum       :string;
    rua              :string;
    bairro           :string;
    numero           :number;
    cep              :string;
    cidade           :string;
    telefone_forum   :string;
    email_forum      :string;
    observacao       :string;
    estado           :string;
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

  buscarForum: async () => {
  const { paginaAtual, filter } = get();
  const token = localStorage.getItem('token');
  set({ isLoading: true });

  try {
    const queryParams = new URLSearchParams({
      pagina: paginaAtual.toString(),
      limite: '5',
    });

    if (filter.nomeForum?.trim()) {
      queryParams.append('nomeForum', filter.nomeForum.trim());
    }

    const url = `${apiUrl}/forum/listaforums?${queryParams.toString()}`;
    console.log("🔗 URL chamada:", apiUrl);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log("Resposta da API:", result);

    const forumsData = result?.forums?.dados ?? [];
    const totalPaginas = result?.forums?.totalPaginas ?? 1;

    if (!Array.isArray(forumsData)) {
      throw new Error("Resposta inesperada da API: forums.dados não é array");
    }

    set({
      forums: forumsData,
      totalPaginas: totalPaginas,
      isLoading: false,
    });

  } catch (error) {
    console.error("❌ Erro ao buscar fórum:", error);
    set({ forums: [], isLoading: false,});
  }
},
    setPaginaAtual: (pagina: number) => {
        set({ paginaAtual: pagina });
    },

    setFilter:(filter)=>{
        set({filter,paginaAtual: 1}); // reseta para página 1 ao aplicar filtros
    },
}));