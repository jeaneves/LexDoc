import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432", 10),
})

 // Teste de conexão
export async function testConnection() {
  try {
    const client = await db.connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    client.release();
    return true;
  } catch (error: any) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
    return false;
  }
} 