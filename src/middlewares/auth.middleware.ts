import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type {Request, Response, NextFunction} from "express";

dotenv.config();

export async function protectRoute(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.AuthCookie;
    const key = process.env.SECRET_KEY;
    if(!key) {
        return res.status(404).json({
            status: 404,
            message: "Secret key missing in auth middleware"
        });
    }
    const decoded = jwt.verify(token, key);
    if(!decoded) {
        return res.status(404).json({
            status: 404,
            message: "Invalid token"
        });
    }
    req.user = decoded;
    next();
}