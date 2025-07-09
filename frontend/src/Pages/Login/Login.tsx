import { TbLockPassword } from "react-icons/tb";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Inputs";
import { FaUser } from "react-icons/fa";

export default function Login(){
    return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-600 ... to-blue-200">

      <div className="w-full max-w-xs ">
        <div>
          
        </div>
        <form className='bg-white shadow-md rounded  px-4 pt-6 pb-8 mb-4' >
          <div className='mb-10'>
            {/* <label className='block text-gray-700 text-sm font-bold mb-2'>Usuário</label> */}
            <div className="relative" >
              <FaUser className="absolute right-3 top-3 text-gray-400" />
              <Input className="" id="user" type="text" placeholder="Usuário" />
            </div>
            
          </div>
          <div className='mb-5'>
            {/* <label className='block text-gray-700 text-sm font-bold mb-2'>Senha</label> */}
            <div className="relative">
              <TbLockPassword  className="absolute right-3 top-3 text-gray-400"/>
              <Input id="pass" type="password" placeholder="Senha"  />
            </div>            
          </div>
          <div className="flex items-center justify-between mt-4">
            <Button type='submit' color="blue">Entrar</Button>  
          </div>
        </form>
        <p className="text-center text-white text-xs">
           &copy; {new Date().getFullYear()} Todos os direitos reservados.
           <br />
            Desenvolvido por <a href="#" className="text-wite-500 hover:text-blue-800">Nome emp</a>
           <br />
            
        </p>
      </div>
    </div>        
    );
}