import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { loginSchema } from "@/lib/validations";
import { generateToken } from "@/lib/auth";


export async function POST(request) {
    try {

        const body = await request.json();

        const validData = loginSchema.parse(body);

        const { email, password } = validData;

        await connectDB();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                {
                    message: "Invalid email or password"
                },
                {
                    status: 401
                }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                {
                    message: "Invalid email or password"
                },
                {
                    status: 401
                }
            )
        }

        const token = generateToken(user._id);


        const response = NextResponse.json({
            message: "Login successful",
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return response;
    }
    catch (error) {

        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    errors: error.flatten().fieldErrors,
                },
                {
                    status: 400
                }
            )
        }

        console.log(error);

        return NextResponse.json(
            {
                message: "Internal server error"
            },
            {
                status: 500
            }
        )
    }
}