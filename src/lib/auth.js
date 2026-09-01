import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export function generateToken(userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "7d" });
  return token;
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  try {
    // 1. Try NextAuth session first
    const session = await getServerSession(authOptions);
    if (session?.user) {
      await connectDB();
      let user = null;
      if (session.user.id) {
        user = await User.findById(session.user.id).select("-password");
      }
      if (!user && session.user.email) {
        user = await User.findOne({ email: session.user.email.toLowerCase() }).select("-password");
      }
      if (user) return user;
    }

    // 2. Fallback to custom JWT token cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return null;
    }

    await connectDB();
    const user = await User.findById(decoded.userId).select("-password");
    return user || null;
  } catch (error) {
    console.log("Get Current User Error:", error);
    return null;
  }
}