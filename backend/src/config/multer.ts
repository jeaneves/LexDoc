// upload.ts
import multer from "multer";
import path from "path";
import fs from "fs";

export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const tmpDir = path.join(__dirname, "..", "uploads", "tmp");

      // Cria a pasta se não existir
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }

      cb(null, tmpDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});
