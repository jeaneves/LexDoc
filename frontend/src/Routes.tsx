import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';

export default function AppRoutes(){
    return ( 
        
            <Routes>
                {/*Rota pública */}
                <Route path="/login" element={<Login />} />
                {/*Rota protegida com layout base */}

            </Routes>
        

    )
}