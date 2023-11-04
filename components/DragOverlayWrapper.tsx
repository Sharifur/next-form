import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import SidebarButtonElement, { SidebarButtonElementOverlay } from "./SidebarButtonElement";
import { ElementsType, FormElements } from "./FormElements";

const DragOverlayWrapper = () => {

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
    return <DragOverlay> {node} </DragOverlay>
     
}
 
export default DragOverlayWrapper;