"use client";

import { useForm } from "react-hook-form";
import api from "@/lib/api";

export default function TransactionForm({
    onSuccess
}) {

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    async function onSubmit(data){

        try{

            await api.post(
                "/transactions",
                data
            );

            reset();

            onSuccess();

        }
        catch(err){

            console.log(err);

        }

    }

    return(

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >

            <input
                {...register("title")}
                placeholder="Title"
                className="border rounded w-full p-2"
            />

            <input
                {...register("amount")}
                type="number"
                placeholder="Amount"
                className="border rounded w-full p-2"
            />

            <button
                className="bg-black text-white px-4 py-2 rounded"
            >
                Save
            </button>

        </form>

    )

}