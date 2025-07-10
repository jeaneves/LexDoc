import { Button } from "../../Components/Button";
import { Input } from "../../Components/Inputs/Inputs";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../Services/Auth";
import { useAuth } from "../../Context/AuthContext";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

export default function Login(){

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [erro, setErro] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {login: loginContext} = useAuth();
  const navigate = useNavigate();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); //impede o reload da pagina
    setLoading(true); //Inicia o loading
    try {
      const data = await login(user, pass);

      loginContext(data.token); //Armazena o token no contexto de autenticação
      localStorage.setItem('token', data.token); //Armazena o token no localStorage
      navigate('/'); //Redireciona para a página inicial
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErro('Usuário ou senha inválidos');
    } finally {
    setLoading(false);
  }

  }
  

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-green-600 ... to-blue-200">

      <div className="w-full max-w-xs ">
        <div>
          
        </div>
        <form className='bg-white shadow-md rounded  px-4 pt-6 pb-8 mb-4' onSubmit={handleLogin}>
          <div className='mb-10'>
            {/* <label className='block text-gray-700 text-sm font-bold mb-2'>Usuário</label> */}
            <div className="relative" >
              <FaUser className="absolute right-3 top-3 text-gray-400" />
              <Input uppercase="uppercase" id="user" type="text" placeholder="Usuário" value={user} onChange={e => setUser(e.target.value.toUpperCase())}/>
            </div>
            
          </div>
          <div className='mb-5'>
            {/* <label className='block text-gray-700 text-sm font-bold mb-2'>Senha</label> */}
            <div className="relative">
              {showPassword? <IoIosEye className="absolute right-3 top-3 text-gray-400" onClick={() => setShowPassword(prev => !prev)}/> : <IoIosEyeOff className="absolute right-3 top-3 text-gray-400" onClick={() => setShowPassword(prev => !prev)}/> }  
              <Input id="pass" type={showPassword ? "text" : "password"} placeholder="Senha" value={pass} onChange={e => setPass(e.target.value)} />
              {erro && <p className="text-red-700 text-xs mt-2">{erro}</p>}
            </div>            
          </div>
          <div className="flex items-center justify-between mt-4">
            <Button type='submit' color="blue" disabled={loading}>
               {loading ? "Entrando...": "Entrar"}
            </Button>  
          </div>
        </form>
        <p className="text-center text-white text-xs">
           &copy; {new Date().getFullYear()} Todos os direitos reservados.
           <br />
            Desenvolvido por <a href="#" className="text-white hover:text-blue-800">Nome emp</a>
           <br />
            
        </p>
      </div>
    </div>        
    );
}