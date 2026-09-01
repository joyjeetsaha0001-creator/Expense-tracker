import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";
import Category from "@/models/Category";

export async function POST() {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const existing = await Category.find({ user: user._id });

    if (existing.length > 0) {
      return NextResponse.json({
        message: "Categories already exist",
      });
    }

    await Category.insertMany([
      {
        name: "Food",
        icon: "Utensils",
        color: "#EF4444",
        user: user._id,
      },
      {
        name: "Shopping",
        icon: "ShoppingBag",
        color: "#3B82F6",
        user: user._id,
      },
      {
        name: "Travel",
        icon: "Plane",
        color: "#F97316",
        user: user._id,
      },
      {
        name: "Salary",
        icon: "Wallet",
        color: "#22C55E",
        user: user._id,
      },
      {
        name: "Bills",
        icon: "Receipt",
        color: "#8B5CF6",
        user: user._id,
      },
    ]);

    return NextResponse.json({
      success: true,
      message: "Default categories created",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}