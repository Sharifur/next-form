import React from "react";
import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = 'TextField';

export type FormElement = {

    consstruct: (id: string) => FromElementInstance;
    designerBtnElement :{
        icon: React.ElementType;
        label : string
    }
    type: ElementsType;
    designerComponent: React.FC<{
        elementInstance : FromElementInstance
    }>;
    formComponent: React.FC;
    propertiesComponent: React.FC<{
        elementInstance : FromElementInstance
    }>;
}


type FromElementsType = {
    [key in ElementsType] : FormElement
}

export type FromElementInstance = {
    id: string,
    type: ElementsType,
    extraAttributes?: Record<string, any>;
}

export const FormElements : FromElementsType = {
    TextField : TextFieldFormElement
}