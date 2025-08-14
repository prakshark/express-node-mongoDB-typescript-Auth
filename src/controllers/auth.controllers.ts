import User from "../models/user.model.js";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

dotenv.config();

export async function registeruser(req: Request, res: Response) {
    const {username, password} = req.body;
    const userWithSameUsername = await User.findOne({
        username: username
    });
    if(userWithSameUsername) {
        return res.status(400).json({
            status: 400,
            message: "Username already exists"
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username: username,
        password: hashedPassword
    });
    newUser.save();

    //jwt logic :-
    const key = process.env.SECRET_KEY;
    if(!key) {
        return res.status(400).json({
            status: 400,
            message: "Secret key not provided"
        })
    }
    const token = jwt.sign({
        username: username,
        password: password
    }, key, {expiresIn: "5h"})

    res.cookie("AuthCookie", token);

    return res.status(201).json({
        status: 201,
        message: "User created",
        user: newUser,
        token: token
    });
}

export async function loginUser(req: Request, res: Response) {
    const {username, password} = req.body;
    const userWithSameUsername = await User.findOne({
        username: username
    });
    if(!userWithSameUsername) {
        return res.status(404).json({
            status: 404,
            message: "User does not exists"
        });
    }
    const isPasswordCorrect = await bcrypt.compare(password, userWithSameUsername.password);
    if(!isPasswordCorrect) {
        return res.status(400).json({
            status: 400,
            message: "Incorrect [password provided"
        })
    }

    // jwt logic :-
    const key = process.env.SECRET_KEY;
    if(!key) {
        return res.status(400).json({
            status: 400,
            message: "Secret key not provided"
        })
    }
    const token = jwt.sign({
        username: username,
        password: password
    }, key, {expiresIn: "5h"});

    res.cookie("AuthCookie", token);

    return res.status(200).json({
        status: 200,
        message: "User logged in successfully",
        user: userWithSameUsername,
        toekn: token
    })
}

export async function logoutUser(_: Request, res: Response) {
    res.clearCookie("AuthCookie");
    return res.status(200).json({
        status: 200,
        message: "User logged out successfully"
    });
}

export async function getProfile(req: Request, res: Response) {
    const user = req.user;
    return res.status(200).json({
        status: 200,
        data: user
    })
}