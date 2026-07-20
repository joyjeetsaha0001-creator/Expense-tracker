import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import {loginSchema} from "@lib/validations";


export async function POST(request){

    const body=await request.json();

    const validData = loginSchema.parse(body);

    const {email,password}=validData;

    await connectDB();

    const user=await User.findOne({email});

    if(!user){
        return NextResponse.json(
            {
                message:"Invalid email or password"
            },
            {
                status:401
            }
        );
    }

    const isMatch= await bcrypt.compare(password,user.password);

    if(!isMatch){
        return NextResponse.json(
            {
                message:"Invalid email or password"
            },
            {
                status:401
            }
        )
    }

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});


    const response = NextResponse.json({
        message:"Login successful"
    });

    response.cookies.set("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:60 * 60 * 24 * 7,
        path:"/",
    });
}