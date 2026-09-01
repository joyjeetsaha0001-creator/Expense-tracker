"use client";

import { useEffect, useState } from "react";


import api from "@/lib/api";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from "recharts";

const COLORS = [
    "#22c55e",
    "#ef4444",
    "#3b82f6",
    "#f59e0b",
];

export default function AnalyticsPage() {

    const [transactions,setTransactions]=
    useState([]);

    useEffect(()=>{

        fetchTransactions();

    },[]);

    async function fetchTransactions(){

        try{

            const {data}=await api.get(
                "/transactions"
            );

            setTransactions(
                data.transactions
            );

        }

        catch(error){

            console.log(error);

        }

    }

    const income=transactions
    .filter(
        t=>t.type==="income"
    )
    .reduce(
        (a,b)=>a+b.amount,
        0
    );

    const expense=transactions
    .filter(
        t=>t.type==="expense"
    )
    .reduce(
        (a,b)=>a+b.amount,
        0
    );

    const pieData=[
        {
            name:"Income",
            value:income,
        },
        {
            name:"Expense",
            value:expense,
        },
    ];

    const categoryMap={};

    transactions.forEach((t)=>{

        const category=
        t.category?.name ||
        "Others";

        if(!categoryMap[category]){

            categoryMap[category]=0;

        }

        categoryMap[category]+=
        t.amount;

    });

    const barData=
    Object.entries(categoryMap)
    .map(([name,value])=>({

        name,

        value,

    }));

    return(

        <div className="space-y-8">

            <h1
            className="text-3xl font-bold"
            >

                Analytics

            </h1>

            <div
            className="grid md:grid-cols-2 gap-6"
            >

                <Card>

                    <CardHeader>

                        <CardTitle>

                            Income vs Expense

                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        <div
                        className="h-80"
                        >

                            <ResponsiveContainer>

                                <PieChart>

                                    <Pie

                                    data={pieData}

                                    dataKey="value"

                                    outerRadius={100}

                                    label

                                    >

                                    {

                                    pieData.map(

                                    (entry,index)=>(

                                    <Cell

                                    key={index}

                                    fill={
                                    COLORS[index]
                                    }

                                    />

                                    )

                                    )

                                    }

                                    </Pie>

                                    <Tooltip/>

                                    <Legend/>

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    </CardContent>

                </Card>

                <Card>

                    <CardHeader>

                        <CardTitle>

                            Category Spending

                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        <div
                        className="h-80"
                        >

                            <ResponsiveContainer>

                                <BarChart
                                data={barData}
                                >

                                    <CartesianGrid
                                    strokeDasharray="3 3"
                                    />

                                    <XAxis
                                    dataKey="name"
                                    />

                                    <YAxis/>

                                    <Tooltip/>

                                    <Bar

                                    dataKey="value"

                                    fill="#3b82f6"

                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </CardContent>

                </Card>

            </div>

        </div>

    );

}