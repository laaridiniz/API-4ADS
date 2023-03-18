import { Router, Request, Response } from "express";

import call from "./call";

const routes = Router()

routes.use("/call", call);


routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;
