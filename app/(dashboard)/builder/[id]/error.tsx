"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";



interface ErrorPageProps {
    error : Error
}

const ErrorPage = ({error} : ErrorPageProps) => {
    
    useEffect(() => {
        console.log(error)
    },[error])
    
    return ( 
        <div className="flex w-full h-full flex-col items-center justify-center">
            <h2 className="text-destructive text-4xl">Something went wrong</h2>
            <Button asChild >
                <Link className="mt-6" href={'/'}>Go Back to home</Link>
            </Button>
        </div>
     );
}
 
export default ErrorPage;
