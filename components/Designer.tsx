"use client";
import { cn } from "@/lib/utils";
import DesignerSidebar from "./DesignerSidebar";
import {useDndMonitor, useDraggable, useDroppable} from "@dnd-kit/core";
import useDesigner from "./hooks/useDesigner";
import { ElementsType, FormElements, FromElementInstance } from "./FormElements";
import { idGenerator } from "@/lib/idGenerator";
import { useState } from "react";
import { Button } from "./ui/button";
import { BiSolidTrash } from "react-icons/bi";


const Designer = () => {

    const {elements, addElement,selectedElement,setSelectedElement,removeElement} = useDesigner()

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
            const isDroppingOverisDesignerDropArea = over.data?.current?.isDesignerDropArea;

            //dropping in sidebar elemnet in designer area
            if(isDesignerBtnElement && isDroppingOverisDesignerDropArea){
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].consstruct(
                    idGenerator()
                );
                addElement(elements.length,newElement);
                return
            }
           const  isDroppingOverDesignerElementTopHalf = over.data?.current?.isTopHalfDesignerElement;
           const  isDroppingOverDesignerElementBottomHalp = over.data?.current?.isBottomHalfDesignerElement;

            const isDroppingOverDesignerElement = isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalp;

            const droppingSidebarBtnOverDesignerElement = isDesignerBtnElement && isDroppingOverDesignerElement;
            //it item over the top or bottom part
            if(droppingSidebarBtnOverDesignerElement) {
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].consstruct(
                    idGenerator()
                );

                const overElementIndex = elements.findIndex((el) => el.id === over.data?.current?.elementId);
                if(overElementIndex === -1){
                    throw new Error("element not found");
                }

                let indexForNewElement = overElementIndex;
                if(isDroppingOverDesignerElementBottomHalp){
                    indexForNewElement = overElementIndex + 1;
                }

                addElement(indexForNewElement,newElement);
                return
            }

            //dragging to reorder item
            const isDraggingDesignerElement = active.data?.current?.isDesignerElement;
            const draggingOverDesignerElementOverAnotherDesignerElement = isDroppingOverDesignerElement && isDraggingDesignerElement;

            if(draggingOverDesignerElementOverAnotherDesignerElement){
                const activeId = active.data?.current?.elementId;
                const overId = over.data?.current?.elementId;

                const activeElementIndex = elements.findIndex( (el) => el.id === activeId);

                const overElementIndex = elements.findIndex((el) => el.id === overId);

                if(activeElementIndex === -1 || overElementIndex === -1){
                    throw new Error("element not found");
                }

                const activeELement = {...elements[activeElementIndex]};
                removeElement(activeId);

                let indexForNewElement = overElementIndex;
                if(isDroppingOverDesignerElementBottomHalp){
                    indexForNewElement = overElementIndex + 1;
                }

                addElement(indexForNewElement, activeELement);
            }
        }
    })

    return ( 
        <div className="flex w-full h-full">
            <div className="p-4 w-full"
            onClick={() => {
                if(selectedElement){
                    setSelectedElement(null);
                }
            }}
            >
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
                        droppable.isOver && elements.length === 0 && (
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
    const {removeElement,selectedElement,setSelectedElement} = useDesigner();
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

    const draggable = useDraggable({
        id: element.id + '-dragabble',
        data: {
            elementId : element.id,
            type: element.type,
            isDesignerElement : true
        }
    });

    if(draggable.isDragging){ return null}


    return (
       <div
       ref={draggable.setNodeRef}
       {...draggable.listeners}
       {...draggable.attributes}
       className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
       onMouseOver={() => {
        setMouseIsOver(true);
       }}
       onMouseLeave={() => {
        setMouseIsOver(false);
       }}
       onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
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
                onClick={(e) => {
                    e.stopPropagation();
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
        {topHalf.isOver && (
            <div className=" absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
        )}
         <div className={
            cn("flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
            mouseIsOver && "opacity-30"
            )}>
            <DesignerElement elementInstance={element}/>
        </div>
        {bottomHalf.isOver && (
            <div className=" absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />
        )}
       </div>
    )
}


export default Designer;