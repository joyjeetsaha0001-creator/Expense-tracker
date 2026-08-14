import { NextResponse } from "next/server";

import Transaction from "@/models/Transaction";
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

    const body = await request.json();

    const data = transactionSchema.parse(body);

    const transaction = await Transaction.findOne({
      _id: params.id,
      user: user._id,
    });

    if (!transaction) {
      return NextResponse.json(
        {
          message: "Transaction not found",
        },
        {
          status: 404,
        }
      );
    }

    const category = await Category.findById(data.category);

    if (!category) {
      return NextResponse.json(
        {
          message: "Category not found",
        },
        {
          status: 404,
        }
      );
    }

    Object.assign(transaction, data);

    await transaction.save();

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
      return NextResponse.json(
        {
          errors: error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

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



export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const transaction = await Transaction.findOneAndDelete({
      _id: params.id,
      user: user._id,
    });

    if (!transaction) {
      return NextResponse.json(
        {
          message: "Transaction not found",
        },
        {
          status: 404,
        }
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