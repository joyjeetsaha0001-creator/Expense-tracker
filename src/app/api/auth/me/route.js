import {cookies} from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";


export async function GET(){
    try{
        const user=getCurrentUser();

        if(!user){
            return NextResponse.json(
                {
                    message:"Unauthorized"
                },
                {
                    status:401
                }
            );
        }
       return NextResponse.json(user);

    }
    catch(error){
        console.log("Auth Me Error:",error);

        return NextResponse.json(
            {
                message:"Internal Server Error"
            },
            {
                status:500
            }
        )
    }
}