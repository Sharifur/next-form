import { HiSaveAs } from "react-icons/hi";
import { Button } from "./ui/button";

const SaveFormBtn = () => {
    return ( 
        <Button variant={"outline"} className="gap-2">
        <HiSaveAs classNameh-6 w-6 />
         Save
        </Button>
     );
}
 
export default SaveFormBtn;