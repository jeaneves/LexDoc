import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from './routes/usuarios.routes';
import ForumRoutes from './routes/forum.routes';
import CodigoPenalRoutes from './routes/codigopenal.routes';
import PenitenciariaRoutes from './routes/penitenciaria.route';
import FuncionariosRoutes from './routes/funcionarios.routes';
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
// Middleware para multipart/form-data (uploads)
//const upload = multer(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware condicional
/*app.use((req, res, next) => {
  if (req.headers['content-type']?.startsWith('multipart/form-data')) {
    // Se for multipart, usa o multer
    upload.none()(req, res, next); // 'none()' para texto puro, ou .any() para arquivos
  } else {
    // Se não for multipart, usa JSON ou urlencoded
    express.json()(req, res, (err) => {
      if (err) {
        // Se JSON falhar, tenta urlencoded (para formulários HTML)
        express.urlencoded({ extended: true })(req, res, next);
      } else {
        next();
      }
    });
  }
});*/

app.use('/health', require('./routes/health.routes').default);
// Configuração para servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static('./src/uploads'));

app.use('/usuarios',UserRoutes);
app.use('/forum', ForumRoutes);
app.use('/codigopenal', CodigoPenalRoutes);
app.use('/penitenciarias', PenitenciariaRoutes);
app.use('/funcionarios', FuncionariosRoutes);





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

