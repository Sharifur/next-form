import { FormElements } from "./FormElements";
import SidebarButtonElement from "./SidebarButtonElement";


const DesignerSidebar = () => {
    return ( 
        <div className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
            designer sidebar
            <SidebarButtonElement formElement={FormElements.TextField} />
        </div>
     );
}
 
export default DesignerSidebar;