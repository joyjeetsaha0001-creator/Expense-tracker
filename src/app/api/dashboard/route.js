import { NextResponse } from "next/server";
import Transaction from "@/models/Transactions.js";
import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";

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

    const transactions = await Transaction.find({
      user: user._id,
    })
      .populate("category")
      .sort({ date: -1 });

    let income = 0;
    let expense = 0;

    transactions.forEach((item) => {
      if (item.type === "income") {
        income += item.amount;
      } else {
        expense += item.amount;
      }
    });

    return NextResponse.json({
      success: true,
      currency: user.currency || "INR",
      user: {
        name: user.name,
        email: user.email,
        currency: user.currency || "INR",
        avatar: user.avatar,
      },
      income,
      expense,
      balance: income - expense,
      totalTransactions: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
