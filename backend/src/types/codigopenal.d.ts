export interface CodigoPenal{
    id: number,
    codigo_penal: string,
    nome: string,
    descricao: string
}

//filtro
export interface FiltroCP{
    pagina: number,
    limite: number,
    nome?: string
}