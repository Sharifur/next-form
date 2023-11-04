import { Button } from "./ui/button";
import {MdOutlinePublish, MdPreview} from "react-icons/md";

const PublishFormBtn = () => {
    return ( 
       <Button  className="gap-2 text-white bg-gradient-to-r from-indigo-500 to-cyan-400">
        <MdOutlinePublish classNameh-6 w-6 />
        Publish
        </Button>
     );
}
 
export default PublishFormBtn;