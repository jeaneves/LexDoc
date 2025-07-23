import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from './routes/usuarios.routes';
import ForumRoutes from './routes/forum.routes';
import CodigoPenalRoutes from './routes/codigopenal.routes';
import PenitenciariaRoutes from './routes/penitenciaria.route';
import { testConnection } from './config/db';


 
dotenv.config();

const app = express();

// Permitir múltiplas origens
const allowedOrigins = [
  'http://localhost:5173',   // Adicionado: Versão HTTP para localhost
  'https://localhost:5173',
  'http://192.168.1.42:5173', // Adicionado: Versão HTTP para IP local
  'https://192.168.1.42:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // se estiver usando cookies/autenticação
}));

app.use(express.json());

app.use('/health', require('./routes/health.routes').default);

app.use('/usuarios',UserRoutes);
app.use('/forum', ForumRoutes);
app.use('/codigopenal', CodigoPenalRoutes);
app.use('/penitenciarias', PenitenciariaRoutes);





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

