import React from 'react'
import { Card } from '../ui/Card'
import { CardContent } from '../ui/Card'

export default function StatCard({title, amount, icon:Icon}) {
  return (
    <Card>
        <CardContent className='p-6'>
            <div className='flex justify-between items-center'>
                <div>
                    <p className='text-gray-500'>
                        {title}
                    </p>
                    <h2 className='text-3xl font-bold mt-2'>
                        {amount}
                    </h2>
                </div>
                {Icon && (<Icon size={32} className='text-blue-600'/>)}
            </div>

        </CardContent>
      
    </Card>
  )
}
