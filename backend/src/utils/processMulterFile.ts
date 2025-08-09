import fs from "fs";
import path from "path";

interface MulterFile {
  filename: string;
  originalname: string;
  fieldname: string;
  destination: string;
}

interface ImageFile {
  fileID: string;
  fileName: string;
  filePath: string;
  file: Buffer;
}

export default async function processMulterFile(multerFile: MulterFile): Promise<ImageFile> {
  const { filename, originalname, fieldname, destination } = multerFile;

  // Caminho absoluto para onde o arquivo foi salvo
  const dir = path.isAbsolute(destination)
    ? destination
    : path.join(__dirname, "..", "..", destination);

  const fullPath = path.join(dir, filename);

  const fileReaded = await fs.promises.readFile(fullPath);

  return {
    fileID: filename,
    fileName: originalname,
    filePath: `${fieldname}/${filename}`,
    file: fileReaded,
  };
}
