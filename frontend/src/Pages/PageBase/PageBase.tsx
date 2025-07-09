import { Outlet } from "react-router";
import Container from "../../Components/Container";

function PageBase(){

    return (
        <Container>
            <Outlet />
            {/* O Outlet renderiza os componentes filhos da rota protegida */}
        </Container>
    );
}
export default PageBase;

