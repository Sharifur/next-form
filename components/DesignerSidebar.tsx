import { FormElements } from "./FormElements";
import FormElementsSidebar from "./FormElementsSidebar";
import ProperiesFormSidebar from "./ProperiesFormSidebar";
import SidebarButtonElement from "./SidebarButtonElement";
import useDesigner from "./hooks/useDesigner";


const DesignerSidebar = () => {
    const {selectedElement} = useDesigner();
    return ( 
        <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
            {!selectedElement && (
                <FormElementsSidebar />
            )}
            {selectedElement && (
                <ProperiesFormSidebar  />
            )}
        </aside>
     );
}
 
export default DesignerSidebar;