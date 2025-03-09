import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/db.js";

export const authMiddleware = (req, resp, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return resp.status(401).json({ error: "Token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.id;
        next();
    }catch (error) {
        return resp.status(401).json({ error: "Token inválido ou expirado" });
    }
}