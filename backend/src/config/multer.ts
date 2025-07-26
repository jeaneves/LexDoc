import multer from "multer";
import path from "path";
import fs from "fs";


// Caminho onde os arquivos serão salvos
const uploadPath = path.join(__dirname, "..", "uploads");

// Cria a pasta se não existir
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

export const upload = multer({ storage });
