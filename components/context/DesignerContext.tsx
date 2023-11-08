"use client"

import React, { useContext ,createContext, useState,Dispatch} from "react";
import { FromElementInstance } from "../FormElements";

type DesignerContextType = {
    elements : FromElementInstance[];
    setElements: Dispatch<React.SetStateAction<FromElementInstance[]>>;
    addElement : (index: number, element: FromElementInstance) => void;
    removeElement : (id: string) => void;
    selectedElement : FromElementInstance | null;
    setSelectedElement: Dispatch<React.SetStateAction<FromElementInstance | null>>
    updateElement : (id: string, element: FromElementInstance) => void;
}

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
    children
}:{
    children : React.ReactNode
}){

    const [elements, setElements] = useState<FromElementInstance[]>([]);
    const [selectedElement,setSelectedElement] = useState<FromElementInstance | null>(null);

    const addElement = (index : number , element: FromElementInstance) => {
        setElements((prev) => {
            const newELements = [...prev];
            newELements.splice(index,0,element);

            return newELements;
        })
    }

    const removeElement = (id:string) => {
        setElements((prev) => prev.filter((element) => element.id !== id));
    }

    const updateElement = (id: string, element : FromElementInstance) => {
        setElements( (prev) => {
            const newELements = [...prev];
            const index = newELements.findIndex((el) => el.id === id);
            newELements[index] = element;
            return newELements;
        })
    }

    return (
        <DesignerContext.Provider value={{
            elements,
            addElement,
            removeElement,
            selectedElement,
            setSelectedElement,
            updateElement,
            setElements
        }}>
            {children}
        </DesignerContext.Provider>
    )

}