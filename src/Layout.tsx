import { Outlet } from "react-router-dom"
import { Navbar } from "./shared/Navbar"

export const Layout = ()=>{
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}