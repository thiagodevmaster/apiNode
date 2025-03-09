import  jwt  from "jsonwebtoken";
import { SECRET_KEY } from "../config/db.js"; 
import userRepositorie from "../repositories/userRepository.js";

export const authService = {
    async login(credential) {
        const user = await userRepositorie.login(credential);

        const token = jwt.sign(
            {id: user.id, email: user.email},
            SECRET_KEY,
            { expiresIn: "1h" }
        )

        return { user, token }
    }
}