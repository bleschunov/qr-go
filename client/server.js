import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(join(__dirname, 'build', 'index.html'));
});

app.listen(9000, () => {
    console.log(`Server is listening on port 9000`)
});