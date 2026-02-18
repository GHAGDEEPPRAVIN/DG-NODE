import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../utiles/globals.js"

export const checkRole = () =>{
    const token = res.cookie("auth_token")

    const result = jwt.verify(token,SECRET_KEY)

    res.user(result)

    localStorage.setItem("role",result.data.role)
}