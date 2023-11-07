import { FormElements } from "./FormElements";
import SidebarButtonElement from "./SidebarButtonElement";

const FormElementsSidebar = () => {
    return ( 
        <div>
            <SidebarButtonElement formElement={FormElements.TextField} />
        </div>
     );
}
 
export default FormElementsSidebar;