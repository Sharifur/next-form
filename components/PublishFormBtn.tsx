import { Button } from "./ui/button";
import {MdOutlinePublish, MdPreview} from "react-icons/md";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useTransition } from "react";
import { FaIcons } from "react-icons/fa";
import { toast } from "./ui/use-toast";
import {PublishForm} from "@/actions/form";
import { useRouter } from "next/navigation";

const PublishFormBtn = ({id} : {id: number}) => {
   const [loading,setTransation] = useTransition();
   const router = useRouter();

   const publishForm = async () => {
      try {
         await PublishForm(id)
         toast({
            title : "Success",
            description : "your form is now public"
         })

         router.refresh();
      } catch (error) {
         toast({
            title : "Error",
            description : "something went wrong"
         })
      }
   }
    return ( 
      <AlertDialog>
         <AlertDialogTrigger>
            <Button  className="gap-2 text-white bg-gradient-to-r from-indigo-500 to-cyan-400">
               <MdOutlinePublish className="h-6 w-6" />
               Publish
         </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Aare you sure ?</AlertDialogTitle>
               <AlertDialogDescription>
                  This action can not be undone. after publishing you iwll not able to edit this form.
                  <br />
                  <br />
                  <span className="form-medium">by publishing this form you will make it agvailble to public and you will able to collect submissions</span>
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction
                  disabled={loading}
                  onClick={(event) => {
                     event.preventDefault();
                     setTransation(publishForm)
                  }}
               >
                  Process {loading && <FaIcons className="animate-spin" />}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
     );
}
 
export default PublishFormBtn;