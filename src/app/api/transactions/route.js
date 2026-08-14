import { NextResponse } from "next/server";

import Transaction from "@/models/Transaction";
import Category from "@/models/Category";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";

import { transactionSchema } from "@/validations/transaction.validation";
import { ZodError } from "zod";


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

    return NextResponse.json(
      {
        success: true,
        count: transactions.length,
        transactions,
      },
      {
        status: 200,
      }
    );
  } 
  catch (error) {
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



export async function POST(request) {
    try{
        await connectDB();

        const user= await getCurrentUser();
        if(!user){
            return NextResponse.json({message:"Unauthorized"},{status:401});
        }

        const body=await request.json();
        const transaction=transactionSchema.parse(body);

        const category=await Category.findById(transaction.category);
        if(!category){
            return NextResponse.json(
                {
                    message:"Category not found"
                },
                {
                    status:404
                }
            );
        }

        const newTransaction = await Transaction.create({
            ...transaction,
            user:user._id
        });

        await newTransaction.save();

        return NextResponse.json(
            {
                success:true,
                transaction:newTransaction
            },
            {
                status:201
            }
        );

    }
    catch(error){
        if(error instanceof ZodError){
            return NextResponse.json(
                {
                    errors:error.flatten().fieldErrors
                },
                {
                    status:400
                }
            );
        }
        console.log(error);

        return NextResponse.json(
            {
                message:"Internal Server Error"
            },
            {
                status:500
            }
        );

    }
}