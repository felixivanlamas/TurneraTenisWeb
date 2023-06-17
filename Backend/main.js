import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import RouterUsuario from "./router/usuarios.js";
import RouterCanchas from "./router/canchas.js";
import RouterReserva from "./router/reservas.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use('/usuarios', new RouterUsuario().start())
app.use('/canchas', new RouterCanchas().start())
app.use('/reservas', new RouterReserva().start())

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});


