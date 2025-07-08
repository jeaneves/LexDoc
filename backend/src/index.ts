import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from './routes/usuarios.routes';
import ForumRoutes from './routes/forum.routes';
import { testConnection } from './config/db';



dotenv.config();

const app = express();
app.use(cors({origin: 'http://localhost:5173'}));

app.use(express.json());

app.use('/health', require('./routes/health.routes').default);

app.use('/usuarios',UserRoutes);
app.use('/forum', ForumRoutes);




const PORT = process.env.PORT || 3000;


// Testar conexão com o banco antes de iniciar o servidor
testConnection().then((isConnected) => {
  if (isConnected) {
    app.listen(PORT, () => {
      console.log(`Servidor online http://localhost:${PORT}`);
    });
  } else {
    console.error('Falha na conexão com o banco de dados. Servidor não iniciado.');
    process.exit(1); // Encerra o processo com erro
  }
});

