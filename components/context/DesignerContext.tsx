"use client"

import React, { useContext ,createContext, useState} from "react";
import { FromElementInstance } from "../FormElements";

type DesignerContextType = {
    elements : FromElementInstance[];
    addElement : (index: number, element: FromElementInstance) => void;
}

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
    children
}:{
    children : React.ReactNode
}){

    const [elements, setElements] = useState<FromElementInstance[]>([])

    const addElement = (index : number , element: FromElementInstance) => {
        setElements((prev) => {
            const newELements = [...prev];
            newELements.splice(index,0,element);

            return newELements;
        })
    }

    return (
        <DesignerContext.Provider value={{
            elements,
            addElement
        }}>
            {children}
        </DesignerContext.Provider>
    )

}