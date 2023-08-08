import express from 'express';
import path from "path"
import {fileURLToPath} from 'url';
import {routes} from './routes/index.js';



const app = express();

const PORT = 3001

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


app.set("view engine", "ejs");
app.set(express.json());

app.use(express.urlencoded({extended: true}))


app.use('/css', express.static(__dirname + '/public/css'))
app.use("/posts", routes);



app.listen(PORT, () => {
    console.log(`Start witn ${PORT}`)
})