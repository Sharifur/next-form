import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import SidebarButtonElement, { SidebarButtonElementOverlay } from "./SidebarButtonElement";
import { ElementsType, FormElements } from "./FormElements";
import useDesigner from "./hooks/useDesigner";

const DragOverlayWrapper = () => {
    const {elements} = useDesigner();
    const [draggedItem,setDraggedItem] = useState<Active | null>(null)

    useDndMonitor({
        onDragStart : (event) => {
            setDraggedItem(event.active);
            console.log("drag item ", event)
        },
        onDragCancel : () =>{
            setDraggedItem(null);
        },
        onDragEnd : () =>{
            setDraggedItem(null);
        }
    })
    if(!draggedItem) return null;

    let node = <div>no drag overlay</div>
   const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;
    if(isSidebarBtnElement){
        const type = draggedItem.data?.current?.type as ElementsType;
        node = <SidebarButtonElementOverlay formElement={FormElements[type]} />
    }

    const isDesignerElement = draggedItem.data?.current?.isDesignerElement;

    if(isDesignerElement){
        const elementId = draggedItem.data?.current?.elementId;
        const element = elements.find((el) => el.id === elementId);
        if(!element){
            node = <div>Element not found</div>
        }else{
            const DesignerElementComponent = FormElements[element.type].designerComponent;
            node = <div className="h-[120px] flex w-full border rounded-md bg-accent py-2 px-4 opacity-80 pointer-events-none pointer"><DesignerElementComponent elementInstance={element} /></div>
        }
    }

    return <DragOverlay> {node} </DragOverlay>
     
}
 
export default DragOverlayWrapper;