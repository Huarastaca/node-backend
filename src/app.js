import express from 'express';
import {clientRouter} from './routes/client.js';
import cors from 'cors';
import {movieRouter} from './routes/movie.js';
import {createConnection} from "./utils/dbUtils.js";
import {commentRouter} from "./routes/comments.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const router = express.Router();

router.get('/', (req, res) => res.json({message: 'Funcionando!'}));
app.use('/', router);

app.use('/clientes', clientRouter)
app.use('/movies', movieRouter)
app.use('/comments', commentRouter)

app.listen(port, () => {
    createConnection();
    console.info(`[server] Listening on port: ${port}/`);
});
