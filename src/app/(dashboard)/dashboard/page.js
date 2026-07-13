
import React from 'react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import StatCard from '@/components/dashboard/StatCard'

import {Wallet, TrendingUp , TrendingDown, PiggyBank} from "lucide-react"


export default function DashboardPage() {
  return (
    <>
    <DashboardHeader/>

      <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
        <StatCard title="Total Balance"
                  amount="58000"
                  icon={Wallet}
        />

        <StatCard title="Income"
                  amount="75000"
                  icon={TrendingUp}
        />

        <StatCard title="Expensee"
                  amount="17000"
                  icon={TrendingDown}
        />

        <StatCard title="Savings"
                  amount="58000"
                  icon={PiggyBank}
        />
      </div>
        
    </>
  )
}
