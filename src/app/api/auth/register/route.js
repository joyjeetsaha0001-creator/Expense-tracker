import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Category from "@/models/Category";
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

        const user= await User.create({
            name,email,password:hashedPassword
        });

        await Category.insertMany([
  {
    name: "Food",
    type: "expense",
    color: "#ef4444",
    user: user._id,
  },
  {
    name: "Shopping",
    type: "expense",
    color: "#3b82f6",
    user: user._id,
  },
  {
    name: "Travel",
    type: "expense",
    color: "#f97316",
    user: user._id,
  },
  {
    name: "Bills",
    type: "expense",
    color: "#8b5cf6",
    user: user._id,
  },
  {
    name: "Salary",
    type: "income",
    color: "#22c55e",
    user: user._id,
  },
  {
    name: "Freelance",
    type: "income",
    color: "#06b6d4",
    user: user._id,
  },
]);

        await user.save();

        return NextResponse.json(
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