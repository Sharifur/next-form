"use client";

import { Form } from "@prisma/client";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveFormBtn from "./SaveFormBtn";
import PublishFormBtn from "./PublishFormBtn";
import Designer from "./Designer";
import { DndContext, MouseSensor, useSensors,useSensor, TouchSensor } from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import useDesigner from "./hooks/useDesigner";
import { useEffect } from "react";

const FormBuilder = ({form} : {form : Form}) => {
    const {setElements} = useDesigner();
    const mouseSensor = useSensor(MouseSensor,{
        activationConstraint: {
            distance : 10 //10px
        }
    })
    const touchSensor = useSensor(TouchSensor,{
        activationConstraint: {
            delay : 300,
            tolerance: 5
        }
    })

    const sensors = useSensors(mouseSensor,touchSensor);


    useEffect(() => {
        const elements = JSON.parse(form.content);
        setElements(elements);
    },[form,setElements])

    return ( 
        <DndContext sensors={sensors}>
        <main className="flex flex-col w-full">
            <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
                <h2 className="turncate font-medium">
                    <span className="text-muted-foreground mr-2">Form:</span>
                    {form.name}
                </h2>
                <div className="flex items-center gap-2">
                <PreviewDialogBtn/>
                {!form.published && (
                    <>
                    <SaveFormBtn id={form.id}/>
                    <PublishFormBtn />
                    </>
                )}
            </div>
            </nav>

            <div 
            className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dak:bg-[url(/paper-dark.svg)]">
                <Designer />
            </div>
        </main>
        <DragOverlayWrapper />
        </DndContext>
     );
}
 
export default FormBuilder;