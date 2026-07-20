import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { registerSchema } from "@/lib/validations";
import { ZodError } from "zod";


export async function POST(request) {
    try {
        const body = await request.json();
        const validData = registerSchema.parse(body);
        const { name, email, password } = validData;

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

        if(error instanceof ZodError){
            return NextResponse.json(
                {
                    errors:error.flatten().fieldErrors,
                },
                {
                    status:400
                }
            )
        }

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