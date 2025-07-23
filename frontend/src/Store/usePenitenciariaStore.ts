import {create} from 'zustand'
import type { Penitenciaria, FiltroPenitenciaria } from '../types/Penitenciarias';


const apiUrl = import.meta.env.VITE_API_URL;

interface PenitenciariaState{
    Penitenciaria :Penitenciaria[];
    PaginaAtual   :number;
    TotalPaginas  :number;
    Filtro        :FiltroPenitenciaria;
    isLoading     :boolean;
    buscaPenitenciaria: ()=>Promise<void>;
    setPaginaAtual: (pagina:number) => void;
    setFiltro: (Filtro:FiltroPenitenciaria) => void;
}

export const usePenitenciariastore = create<PenitenciariaState>((set,get)=>({
    Penitenciaria :[],
    PaginaAtual   :1,
    TotalPaginas  :1,
    Filtro        :{nome: ''},
    isLoading     :false,

    buscaPenitenciaria: async () =>{
        const {PaginaAtual , Filtro}  = get();
        const token = localStorage.getItem("token");
        set({isLoading: true});

        try {
            const queryParams = new URLSearchParams({
                pagina: PaginaAtual.toString(),
                limite: '5',
            });

            if (Filtro.nome?.trim()){
                queryParams.append('nome',Filtro.nome.trim());
            }

            const url = `${apiUrl}/penitenciarias/listapenitenciarias?${queryParams.toString()}`;

            const response = await fetch(url,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();
            
            const Penitendata = result?.Penitenciarias?.dados ?? [];
            const totalPaginas = result?.Penitenciarias?.totalPaginas ?? 1;

            if (!Array.isArray(Penitendata)) {
                throw new Error("Resposta inesperada da API: CodigosPenais.dados não é array");
            }

            set({
                Penitenciaria:Penitendata,
                TotalPaginas:totalPaginas,
                isLoading: false
            });            
        } catch (error) {
            set({ Penitenciaria: [], isLoading: false});            
        }
    },
    setPaginaAtual: (pagina: number) => {
        set({ PaginaAtual: pagina });
        get().buscaPenitenciaria(); // Busca automaticamente ao mudar página
    },
    setFiltro: (filtro: FiltroPenitenciaria) => {
        set({ 
            Filtro: { ...get().Filtro, ...filtro },
            PaginaAtual: 1 // Reset para a primeira página ao mudar filtro
        });
        get().buscaPenitenciaria(); // Busca automaticamente ao mudar filtro
    }
}));