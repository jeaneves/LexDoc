import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import { ProtectedRoute } from './Routes/ProtectedRoute';
import PageBase from './Pages/PageBase/PageBase';
import Dashboard from './Pages/Dashboard/Dashboard';
import NotFoundPage from './Pages/Page404';
import Forum  from './Pages/Forum/Forum';
import ForumED from './Pages/Forum/ForumED';
import CodigoPenal from './Pages/CodigoPenal/CodigoPenal';
import CodigoPenalEd from './Pages/CodigoPenal/CodigoPenalED';
import Cidade from './Pages/Cidade/Cidade';
import Penitenciarias from './Pages/Penitenciarias/Penitenciarias';
import Penitenciariaed from './Pages/Penitenciarias/PenitenciariasED';
import Clientes from './Pages/Clientes/Clientes';
import ClientesED from './Pages/Clientes/ClientesED';
import Funcionarios from './Pages/Funcionarios/Funcionarios';
import FuncionariosED from './Pages/Funcionarios/FuncionariosED';

export default function AppRoutes(){
    return ( 
        
            <Routes>
                {/*Rota pública */}
                <Route path="/login" element={<Login />} />
                {/*Rota protegida com layout base */}
                <Route path="/" element={<ProtectedRoute><PageBase /></ProtectedRoute>}>
                    {/* Aqui você pode definir as rotas internas que serão renderizadas dentro do PageBase */}
                    <Route index element={<Dashboard/>} />
                    <Route path='forum' element={<Forum/>} />
                    <Route path='forum/forumed' element={<ForumED/>}/>
                    <Route path='forum/forumed/:id' element={<ForumED/>}/>
                    <Route path='codigopenal' element={<CodigoPenal/>}/>
                    <Route path='codigopenal/codigopenaled' element={<CodigoPenalEd/>}/>
                    <Route path='codigopenal/codigopenaled/:id' element={<CodigoPenalEd/>}/> 
                    <Route path='cidades' element={<Cidade/>}/> 
                    <Route path='penitenciarias' element={<Penitenciarias/>}/> 
                    <Route path='penitenciarias/penitenciariaed' element={<Penitenciariaed/>}/> 
                    <Route path='penitenciarias/penitenciariaed/:id' element={<Penitenciariaed/>}/> 
                    <Route path='penitenciarias/penitenciariaed/:id' element={<Penitenciariaed/>}/> 
                    <Route path='clientes' element={<Clientes/>}/> 
                    <Route path='clientes/clientesed' element={<ClientesED/>}/> 
                    <Route path='clientes/clientesed/:id' element={<ClientesED/>}/> 
                    <Route path='funcionarios' element={<Funcionarios/>}/> 
                    <Route path='funcionarios/funcionariosed' element={<FuncionariosED/>}/> 
                    <Route path='funcionarios/funcionariosed/:id' element={<FuncionariosED/>}/> 


              </Route>
                {/* Rota 404 */}
                <Route path="*" element={<NotFoundPage/>} />

            </Routes>
        

    )
}