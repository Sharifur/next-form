"use client";

import { RiSeparator } from "react-icons/ri";
import { ElementsType, FormElement, FromElementInstance, SubmitFunction } from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement : FormElement = {
    type,
    consstruct :(id: string) => ({
        id,
        type
    }),
    designerBtnElement : {
        icon : RiSeparator,
        label : "Separator Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate : () => true
}


function PropertiesComponent({
    elementInstance
} :{elementInstance : FromElementInstance}) {

    return (
       <p>no properties for this element.</p>
    )
}


function DesignerComponent ({
    elementInstance
} :{elementInstance : FromElementInstance}){

  
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                Separator FIeld
            </Label> 
            <Separator />
        </div>
    )
}
function FormComponent ({
    elementInstance
} :{
    elementInstance : FromElementInstance
}){

    return (
       <Separator/>
    )
}