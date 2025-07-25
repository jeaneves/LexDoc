import { create } from 'zustand';

const apiUrl = import.meta.env.VITE_API_URL;

interface Funcionario{
    id                  :number,
    nome                :string,
    cpf                 :string,
    rg                  :string,
    oab                 :string,
    tipo_funcionario    :string,
    cargo               :string,
    salario             :number,
    data_admissao       :string,
    ativo               :boolean,
    rua                 :string,
    numero              :string,
    bairro              :string,
    cep                 :string,
    cidade              :string,
    celular1            :string,
    celular2            :string,
    email               :string,
    foto_perfil_url     :string,
    usuario_id          :number,
    usuario_admin       :boolean,
    observacao          :string,
    datacadastro        :string,
    dataalteracao       :string,
};

interface FiltroFuncionario{
    nome?: string,
};

interface FuncionarioEDProps{
  FuncionarioData?: Funcionario
};

interface FuncionarioState {
  Funcionarios: Funcionario[];
  PaginaAtual: number;
  TotalPagina: number;
  FiltroFunc: FiltroFuncionario;
  isLoading: boolean;
  buscaFuncionario: () => Promise<void>;
  setPaginaAtual: (pagina: number) => void;
  setFiltro: (filtro: FiltroFuncionario) => void;
}

export const useFuncionarioStore = create<FuncionarioState>((set, get) => ({
    Funcionarios: [],
    PaginaAtual: 1,
    TotalPagina: 1,
    FiltroFunc: {nome: ''},
    isLoading: false,

  buscaFuncionario: async () => {
    const { PaginaAtual, FiltroFunc } = get();
    const token = localStorage.getItem('token');
    set({ isLoading: true });

    try {
      const queryParams = new URLSearchParams({
        pagina: PaginaAtual.toString(),
        limite: '5',
      });

      if (FiltroFunc.nome?.trim()) {
        queryParams.append('nome', FiltroFunc.nome.trim());
      }

      const url = `${apiUrl}/funcionarios/listafuncionarios?${queryParams.toString()}`;

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      const funcionarios = result?.Funcionarios?.dados ?? [];
      const totalPaginas = result?.Funcionarios?.totalPaginas ?? 1;

      if (!Array.isArray(funcionarios)) {
        throw new Error('Resposta inesperada da API: funcionarios.dados não é array');
      }

      set({
        Funcionarios: funcionarios,
        TotalPagina: totalPaginas,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
      set({ Funcionarios: [], isLoading: false });
    }
},
    setPaginaAtual: (pagina: number) => {
        set({ PaginaAtual: pagina });
        get().buscaFuncionario(); // Busca automaticamente ao mudar página
    },
    setFiltro: (filtro: FiltroFuncionario) => {
        set({ 
            FiltroFunc: { ...get().FiltroFunc, ...filtro },
            PaginaAtual: 1 // Reset para a primeira página ao mudar filtro
        });
        get().buscaFuncionario(); // Busca automaticamente ao mudar filtro
    }
}));
