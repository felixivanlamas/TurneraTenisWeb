import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import RouterUsuario from "./router/usuarios.js";
import RouterCanchas from "./router/canchas.js";
import RouterReserva from "./router/reservas.js";
import morgan from "morgan";

const app = express();
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(cors());

// enviroment variables
app.set('port', process.env.PORT || 5000)


app.use('/usuarios', new RouterUsuario().start())
app.use('/canchas', new RouterCanchas().start())
app.use('/reservas', new RouterReserva().start())

export default app;