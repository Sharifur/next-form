import React from "react";
import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = 'TextField';
export type SubmitFunction = (key: string, value: string) => void;

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
    formComponent: React.FC<{
        elementInstance : FromElementInstance;
        submitValue?: SubmitFunction;
        isValid?: boolean;
        defaultValue?: string;
    }>;
    propertiesComponent: React.FC<{
        elementInstance : FromElementInstance
    }>;

    validate: (formElement : FromElementInstance, currentValue : string) => boolean;
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