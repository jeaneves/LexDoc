import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export async function login(usuario: string, senha: string) {
  const response = await axios.post(`${apiUrl}/usuarios/login`, { usuario, senha });
  return response.data;
}
 