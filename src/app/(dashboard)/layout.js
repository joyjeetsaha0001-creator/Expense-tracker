import AppNavbar from "@/components/layout/AppNavbar"
import Sidebar from "@/components/layout/Sidebar"

export default function DashboardLayout({children}) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar/>
      <div className="flex flex-1 flex-col">
        <AppNavbar/>
        <main className="flex-1 p-6 ">
            {children}
        </main>
      </div>
    </div>
  )
}
