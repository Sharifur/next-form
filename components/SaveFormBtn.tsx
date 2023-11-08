import { HiSaveAs } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa";
import { Button } from "./ui/button";
import useDesigner from "./hooks/useDesigner";
import { UpdateFormContent } from "@/actions/form";
import { toast } from "./ui/use-toast";
import { useTransition } from "react";

const SaveFormBtn = ({id} : {id :number}) => {
    const [loading,setTransition] = useTransition();
    const {elements} = useDesigner();
    const updateFormContent = async () => {
        try {
            const JsonElmenets = JSON.stringify(elements);
            await UpdateFormContent(id,JsonElmenets);
            toast({
                title : "Success",
                description: "your form has been saved"
            })
        } catch (error) {
            toast({
                title : "Error",
                description: "something went wrong",
                variant: "destructive"
            })
        }
    }
    return ( 
        <Button
        variant={"outline"}
         className="gap-2"
         disabled={loading}
         onClick={() => {
            setTransition(updateFormContent)
         }}
         >
        <HiSaveAs className="w-6 h-6" />
         Save
         {loading && <FaSpinner className="animate-spin" />}
        </Button>
     );
}
 
export default SaveFormBtn;