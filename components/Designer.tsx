"use client";
import { cn } from "@/lib/utils";
import DesignerSidebar from "./DesignerSidebar";
import {useDndMonitor, useDroppable} from "@dnd-kit/core";
import useDesigner from "./hooks/useDesigner";
import { ElementsType, FormElements, FromElementInstance } from "./FormElements";
import { idGenerator } from "@/lib/idGenerator";

const Designer = () => {

    const {elements, addElement} = useDesigner()

    const droppable = useDroppable({
        id: "designer-drag-area",
        data : {
            isDesignerDropArea : true
        }
    });

    useDndMonitor({
        onDragEnd : (event) => {
            const {active, over} = event;

            if(!active || !over) return;
            const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement;
            console.log(isDesignerBtnElement);
            if(isDesignerBtnElement){
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].consstruct(
                    idGenerator()
                );
                addElement(0,newElement);
                console.log("new element",newElement);
            }

            console.log("drag end", event);
        }
    })

    return ( 
        <div className="flex w-full h-full">
            <div className="p-4 w-full">
                <div
                ref={droppable.setNodeRef}
                className={cn("bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
                droppable.isOver && "ring-2 ring-primary/20"
                )}>
                   {!droppable.isOver && (
                    <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
                        Drop here
                    </p>
                   )}
                    {
                        droppable.isOver && (
                            <div className="p-4 w-full">
                                <div className="h-[120px] rounded-md bg-primary/20"></div>
                            </div>
                        )
                    }
                    {elements.length > 0 && (
                        <div className="flex flex-col text-background w-full gap-2 p-4">
                            {elements.map((element) => (
                                <DesignerElementWrapper key={element.id} element={element} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <DesignerSidebar />
        </div>
     );
}
 

function DesignerElementWrapper({element} : {element : FromElementInstance}) {
    
}


export default Designer;