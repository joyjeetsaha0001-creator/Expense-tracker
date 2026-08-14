import {NextResponse} from "next/server";
import {verifyToken} from "@/lib/auth";

export function middleware(request){
    try{
        const token = request.cookies.get("token")?.value;
        if(!token){
            return NextResponse.json(
                new URL("/login",request.url)
            );
        }

        const decoded=verifyToken(token);

        if(!decoded){
            return NextResponse.json(
                new URL("/login",request.url)
            );
        }
        return NextResponse.next();
    }
}

export const config={
    matcher:[
        "/dashboard/:path*",
        "/transactions/:path*",
        "/categories/:path*",
        "/reports/:path*",
        "/settings/:path*",
    ],
};