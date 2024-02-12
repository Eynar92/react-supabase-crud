import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { supabase } from "../supabase/client"

export const Layout = () => {

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Outlet />
        </div>
    )
}
