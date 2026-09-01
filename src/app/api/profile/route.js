import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GET Profile Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const updateFields = {};
    if (body.name !== undefined) updateFields.name = body.name.trim();
    if (body.currency !== undefined) updateFields.currency = body.currency;
    if (body.avatar !== undefined) updateFields.avatar = body.avatar.trim();

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      updateFields,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    return NextResponse.json(
      {
        success: true,
        user: updatedUser,
        message: "Profile updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT Profile Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}