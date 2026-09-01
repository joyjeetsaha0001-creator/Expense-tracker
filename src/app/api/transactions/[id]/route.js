import { NextResponse } from "next/server";

import Transaction from "@/models/Transactions.js";
import Category from "@/models/Category";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";

import { transactionSchema } from "@/validations/transaction.validation";
import { ZodError } from "zod";


export async function PUT(request, { params }) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const body = await request.json();

    const transactionData = transactionSchema.parse(body);

    const category = await Category.findById(transactionData.category);

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: id,
        user: user._id,
      },
      {
        ...transactionData,
        user: user._id,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        transaction,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
        console.error("ZOD ERROR:", error.flatten().fieldErrors);

        return NextResponse.json(
            {
                message: "Validation failed",
                errors: error.flatten().fieldErrors
            },
            {
                status: 400
            }
        );
    }

    console.error("Update Transaction Error:", error);

    return NextResponse.json(
        {
            message: "Internal Server Error"
        },
        {
            status: 500
        }
    );
}
}



export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      user: user._id,
    });

    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Transaction deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Delete Transaction Error:", error);

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