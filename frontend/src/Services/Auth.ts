import axios from 'axios';

export async function login(usuario: string, senha: string) {
  const response = await axios.post('http://192.168.1.42:3000/usuarios/login', { usuario, senha });
  return response.data;
}
 