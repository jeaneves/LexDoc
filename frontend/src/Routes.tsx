import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';

export default function AppRoutes(){
    return ( 
        <BrowserRouter>
            <Routes>
                {/*Rota pública */}
                <Route path="/login" element={<Login />} />
                {/*Rota protegida com layout base */}

            </Routes>
        </BrowserRouter> 

    )
}