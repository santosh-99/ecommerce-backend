import multer from "multer";
import path from "path";

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("src","public", "uploads"));
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "_" + file.originalname;
    cb(null, name);
  },
});
const uploadFile = multer({ storage: storageConfig });

export default uploadFile;
