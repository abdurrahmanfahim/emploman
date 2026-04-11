import { MenuIcon } from "lucide-react"
import { useEffect } from "react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import SidebarContent from "./SidebarContent"

const Sidebar = () => {

    const { pathname } = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false)


    // ======== Handle mobile sidebar func ========
    const handleMobileSidebar = () => {
        setMobileOpen((prev) => !prev)
    }

    // ======== Close mobile sidebar on route change ========
    useEffect(() => {
        const id = setTimeout(() => setMobileOpen(false), 0)
        return () => clearTimeout(id)
    }, [pathname])

    return (
        <>
            {/* ============ Mobile hamburger btn ============ */}
            <button onClick={handleMobileSidebar} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-sidebar-bg border border-sidebar-border rounded-lg">
                <MenuIcon size={20} className="text-sidebar-fg" />
            </button>

            {/* ============ Mobile overlay ============ */}
            {mobileOpen && <div onClick={handleMobileSidebar} className="lg:hidden fixed inset-0 bg-black/40 z-40"></div>}

            {/* ============ Sidebar Desktop ============ */}
            <aside className="hidden lg:flex flex-col h-full w-64 bg-sidebar-bg shrink-0 border-r border-sidebar-border">
                <SidebarContent pathname={pathname} />
            </aside>

            {/* ============ Sidebar Mobile ============ */}
            <aside className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-sidebar-bg z-50 flex flex-col border-r border-sidebar-border transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <SidebarContent pathname={pathname} setMobileOpen={setMobileOpen}/>
            </aside>
        </>
    )
}

export default Sidebar