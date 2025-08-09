import fs from "fs";
import path from "path";

/**
 * Move a imagem do multer para a pasta correta de funcionarios/:id
 */
export async function moveToFuncionarioFolder(
  tempPath: string,
  filename: string,
  idFuncionario: number
): Promise<string> {
  const destino = path.join(__dirname, "..", "src", "uploads", "funcionarios", String(idFuncionario));

  if (!fs.existsSync(destino)) {
    fs.mkdirSync(destino, { recursive: true });
  }

  const oldPath = tempPath;
  const newPath = path.join(destino, filename);

  await fs.promises.rename(oldPath, newPath);

  // Caminho relativo para salvar no banco
  const relativePath = `uploads/funcionarios/${idFuncionario}/${filename}`;

  return relativePath;
}
