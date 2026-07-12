import Navbar from "@/components/layout/Navbar"
import Sidebar from "@/components/layout/Sidebar"

export default function DashboardLayout({children}) {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <div className="flex">
        <Sidebar/>
        <main className="flex-1 p-8 bg-gray-100">
            {children}
        </main>
      </div>
    </div>
  )
}
