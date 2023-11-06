"use client";
import { cn } from "@/lib/utils";
import DesignerSidebar from "./DesignerSidebar";
import {useDndMonitor, useDroppable} from "@dnd-kit/core";
import useDesigner from "./hooks/useDesigner";
import { ElementsType, FormElements, FromElementInstance } from "./FormElements";
import { idGenerator } from "@/lib/idGenerator";
import { useState } from "react";
import { Button } from "./ui/button";
import { BiSolidTrash } from "react-icons/bi";


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
            if(isDesignerBtnElement){
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].consstruct(
                    idGenerator()
                );
                addElement(0,newElement);
            }
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
                   {!droppable.isOver && elements.length === 0 && (
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
                        <div className="flex flex-col w-full gap-2 p-4">
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
    const [mouseIsOver,setMouseIsOver] = useState(false);
    const {removeElement} = useDesigner();
    const DesignerElement = FormElements[element.type].designerComponent;
    const topHalf = useDroppable({
        id: element.id + '-top',
        data : {
            elementId: element.id,
            type: element.type,
            isTopHalfDesignerElement:true
        }
    });
    const bottomHalf = useDroppable({
        id: element.id + '-bottom',
        data : {
            elementId: element.id,
            type: element.type,
            isBottomHalfDesignerElement:true
        }
    });




    return (
       <div
       className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
       onMouseOver={() => {
        setMouseIsOver(true);
       }}
       onMouseLeave={() => {
        setMouseIsOver(false);
       }}
       >
        <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md">
        </div>
        <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 w-full h-1/2 rounded-b-md">
        </div>
        {mouseIsOver && (
            <>
            <div className="absolute right-0 h-full">
                <Button
                onClick={() => {
                    removeElement(element.id)
                }}
                className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500" variant={"outline"}>
                    <BiSolidTrash  className="h-6 w-6" />
                </Button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
                <p className="text-muted-foreground text-sm">Click for property or drag to move</p>
            </div>
            </>
        )}
         <div className={cn("flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
         mouseIsOver && "opacity-30")}>
            <DesignerElement elementInstance={element}/>
        </div>
       </div>
    )
}


export default Designer;