"use client";

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FromElementInstance } from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type: ElementsType = "TextField";

const extraAttributes =  {
    label: "Text Field",
    helperText : "helper text",
    require: false,
    placeholder : "value here"
}

export const TextFieldFormElement : FormElement = {
    type,
    consstruct :(id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement : {
        icon : MdTextFields,
        label : "Text Field"
    },
    designerComponent: DesignerComponent,
    formComponent: () => (
        <div>form component</div>
    ),
    propertiesComponent: () => (
        <div>property component</div>
    )
}

type CustomInstance = FromElementInstance & {
    extraAttributes: typeof extraAttributes;
}

function DesignerComponent ({
    elementInstance
} :{elementInstance : FromElementInstance}){
    const element = elementInstance as CustomInstance;

    const {label,require,placeholder,helperText} = element.extraAttributes;

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {label}
                {require &&(
                    <span className="ml-2 text-destructive">*</span>
                )}
            </Label>
            <Input
                readOnly
                disabled
                placeholder={placeholder}
            />
            {helperText && (
                <p className="text-muted-foreground text-[0.8rem]"></p>
            )}
        </div>
    )
}