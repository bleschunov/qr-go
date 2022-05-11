import multer from 'multer'
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFolder = resolve(__dirname, '..', 'static/')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, staticFolder)
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
})

const upload = multer({ storage })

export default upload