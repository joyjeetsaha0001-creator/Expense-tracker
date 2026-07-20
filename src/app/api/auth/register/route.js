import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";


export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        await connectDB();

        const existingUser= await User.findOne({email});
        
        if(existingUser){
            return NextResponse.json(
                {
                    message:"User already exists"
                },
                {
                    status:409
                }
            )
        }

        const hashedPassword =await bcrypt.hash(password,10);

        const user= await user.create({
            name,email,password:hashedPassword
        });

        await user.save();

        return NextResponse(
            {
                message:"User created succesfully"
            },
            {
                status:201
            }
        );

    }
    catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                message:"Internal server error"
            },
            {
                status:500
            }
        )
    }



}