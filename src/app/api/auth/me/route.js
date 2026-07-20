import {cookies} from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const cookieStore = await cookies();

const token = cookieStore.get("token")?.value;

if(!token){
    return NextResponse.json(
        {
            message:"Unauthorized"
        },
        {
            status:401
        }
    );
}

const decoded = verifyToken(token);

if(!decoded){
    return NextResponse.json(
        {
            message:"Invalid Token"
        },
        {
            status:401
        }
    )
}

await connectDB();

const user = await User.findById(decoded.userId).select("-password");

return NextResponse.json(user);