import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import { ProtectedRoute } from './Routes/ProtectedRoute';
import PageBase from './Pages/PageBase/PageBase';
import Dashboard from './Pages/Dashboard/Dashboard';
import NotFoundPage from './Pages/Page404';
import Forum  from './Pages/Forum/Forum';
import ForumED from './Pages/Forum/ForumED';
import CodigoPenal from './Pages/CodigoPenal/CodigoPenal';

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
                    {/* <Route path='codigopenal/codigopenal' element={<CodigoPenalED/>}/>
                    <Route path='codigopenal/codigopenal/:id' element={<ForumED/>}/> */}


                </Route>
                {/* Rota 404 */}
                <Route path="*" element={<NotFoundPage/>} />

            </Routes>
        

    )
}