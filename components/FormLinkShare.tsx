"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImShare } from "react-icons/im";
import { toast } from "./ui/use-toast";

const FormLinkShare = ({shareUrl} : {shareUrl : string}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    },[])

    if(!mounted){
        return null;
    }
    
    const shareLink = `${window.location.origin}/submit/${shareUrl}`;
    const copyText = () => {
        navigator.clipboard.writeText(shareLink);
        toast({
            title : "Copied",
            description : "link copied to clipboard"
        })
    }
    return ( 
      <div className="flex flex-grow gap-4 items-center">
        <Input value={shareLink} readOnly />
        <Button
            className="max-w-[250px]"
            onClick={copyText}
        >
            <ImShare className="h-4 w-4 mr-2" />
            Share Link
        </Button>
      </div>
     );
}
 
export default FormLinkShare;