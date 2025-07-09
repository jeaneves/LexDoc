import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import { ProtectedRoute } from './Routes/ProtectedRoute';
import PageBase from './Pages/PageBase/PageBase';
import Dashboard from './Pages/Dashboard/Dashboard';
import NotFoundPage from './Pages/Page404';
import Forum  from './Pages/Forum/Forum';

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

                </Route>
                {/* Rota 404 */}
                <Route path="*" element={<NotFoundPage/>} />

            </Routes>
        

    )
}