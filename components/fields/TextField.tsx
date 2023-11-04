"use client";

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement } from "../FormElements";

const type: ElementsType = "TextField";

export const TextFieldFormElement : FormElement = {
    type,
    consstruct :(id: string) => ({
        id,
        type,
        extraAttributes : {
            label: "Text Field",
            helperText : "helper text",
            require: false,
            placeholder : "value here"
        }
    }),
    designerBtnElement : {
        icon : MdTextFields,
        label : "Text Field"
    },
    designerComponent: () => (
        <div>designer component</div>
    ),
    formComponent: () => (
        <div>form component</div>
    ),
    propertiesComponent: () => (
        <div>property component</div>
    )
}