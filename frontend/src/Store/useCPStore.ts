import {create } from 'zustand'

const apiUrl = import.meta.env.VITE_API_URL;

interface CodigoPenal{
    id: number;
    codigo_penal: string;
    nome: string;
    descricao: string;   
}

interface FiltroCP{
    nome: string;
}

interface CPState{
    CodigosPenal: CodigoPenal[];
    PaginaAtual: number;
    TotalPaginas: number;
    filtro: FiltroCP;
    isLoading: boolean
    buscarCP: () => Promise<void>;
    setPaginaAtual: (pagina: number) => void;
    setFiltro: (filtro:FiltroCP) => void;
}

export const useCPStore = create<CPState>((set,get)=>({
    CodigosPenal: [],
    PaginaAtual: 1,
    TotalPaginas: 1,
    filtro: {nome: ''},
    isLoading: false,

    buscarCP: async () => {
        const {PaginaAtual , filtro}  = get();
        const token = localStorage.getItem("token");
        set({isLoading: true});

        try {
            const queryParams = new URLSearchParams({
                pagina: PaginaAtual.toString(),
                limite: '5',
            });

            if (filtro.nome?.trim()){
                queryParams.append('nome',filtro.nome.trim());
            }

            const url = `${apiUrl}/codigopenal/listacps?${queryParams.toString()}`;

            const response = await fetch(url,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();
            
            const CPdata = result?.CodigosPenais?.dados ?? [];
            const totalPaginas = result?.CodigosPenais?.totalPaginas ?? 1;

            if (!Array.isArray(CPdata)) {
                throw new Error("Resposta inesperada da API: CodigosPenais.dados não é array");
            }

            set({
                CodigosPenal:CPdata,
                TotalPaginas:totalPaginas,
                isLoading: false
            });            
        } catch (error) {
            set({ CodigosPenal: [], isLoading: false});            
        }
    },
    setPaginaAtual: (pagina:number) => {
        set({ PaginaAtual: pagina });
    },
    setFiltro: (filtro) => {
        set({filtro,PaginaAtual: 1});
    },
}));