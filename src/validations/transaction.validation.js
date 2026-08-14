import {z} from "zod";

export const transactionSchema=z.object({
    
    title:z.string()
    .trim()
    .min(2,"Title is required"),

    amount:z.number().positive("Amount must be a positive number"),

    type:z.enum(["income","expense"]),

    category:z.string(),

    note:z.string().optional(),

    date:z.coerce.date()
    
});