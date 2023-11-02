import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";
import React,{ReactNode} from "react";

interface LayoutProps {
    children : React.ReactNode
}

const Layout = ({children} : LayoutProps) => {
    return ( 
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
            <nav className="flex justify-between border-b border-border h-[60px] px-4 py-2 items-center">
                <Logo />
               <div className="flex gap-4 items-center">
               <ThemeSwitcher/>
                <UserButton afterSignOutUrl="/" />
               </div>
            </nav>
            <main className="flex w-full flex-grow">
                {children}
            </main>
        </div> 
     );
}
 
export default Layout;