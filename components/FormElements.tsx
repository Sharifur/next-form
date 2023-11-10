import React from "react";
import { TextFieldFormElement } from "./fields/TextField";
import { TitleFieldFormElement } from "./fields/TitleField";
import { SubTitleFieldFormElement } from "./fields/SubTitleField";
import { ParagraphFieldFormElement } from "./fields/ParagraphFIeld";
import { SeparatorFieldFormElement } from "./fields/Separator";
import { SpacerFieldFormElement } from "./fields/SpacerField";

export type ElementsType =
'TextField'
| "TitleField"
| "SubTitleField"
| "ParagraphField"
| "SeparatorField"
| "SpacerFIeld"
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
    TextField : TextFieldFormElement,
    TitleField : TitleFieldFormElement,
    SubTitleField : SubTitleFieldFormElement,
    ParagraphField : ParagraphFieldFormElement,
    SeparatorField : SeparatorFieldFormElement,
    SpacerFIeld : SpacerFieldFormElement
}