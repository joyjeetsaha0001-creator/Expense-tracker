"use client";
import React from 'react'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";



export default function UserNav() {
  return (
    <div className="flex items-center gap-3">
        <Avatar>
            <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div>
            <p className='font-medium'>
                Joyjeet
            </p>
            <p className='text-sm text-gray-500'>
                Welcome Back
            </p>
        </div>
    </div>
  )
}
