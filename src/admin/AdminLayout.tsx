import { Outlet } from "react-router-dom"
import { OffcanvasNavbar } from "../shared/OffcanvasNavbar"

export const AdminLayout = ()=>{
    return(
        <>
        <OffcanvasNavbar/>
        
            <Outlet/>
        
        </>
    )
}