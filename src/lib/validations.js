import {z} from "zod";

export const registerSchema=z.object({
    name:z.string()
    .trim()
    .min(3,"Name must be at least 3 characters"),

    email:z.string()
    .email("Invalid email address"),

    password:z.string()
    .min(8,"Password must be atleast 8 characters")
})


export const loginSchema=z.object({
    email:z.string().email("Invalid email"),
    password:z.string().min(8,"Password is required")
})