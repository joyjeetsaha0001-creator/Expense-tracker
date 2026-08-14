import jwt from "jsonwebtoken";
import {cookies} from "next/headers";
import User from "@/models/User";
import {connectDB} from "@/lib/mongodb";



export function generateToken(userId){
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"});
    return token;
}


export function verifyToken(token){
    try{
        return jwt.verify(token,process.env.JWT_SECRET);
    }
    catch{
        return null;
    }
}

export async function getCurrentUser(){
    try{
        const cookieStore=await cookies();
        const token=cookieStore.get("token")?.value;

        if(!token){
            return null;
        }

        const decoded=verifyToken(token);
        
        if(!decoded){
            return null;
        }

        await connectDB();

        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            return null;
        }
        return user;
    }
    catch(error){
        console.log("Get Current User Error:",error);
        return null;
    }
}