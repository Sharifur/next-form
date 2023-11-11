"use client";

import { MdTextFields } from "react-icons/md";
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
import { LuHeading1 } from "react-icons/lu";

const type: ElementsType = "TitleField";

const extraAttributes =  {
    title: "Title Field"
}

const propertiesSchema = z.object({
    title: z.string().min(2).max(50)
})


export const TitleFieldFormElement : FormElement = {
    type,
    consstruct :(id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement : {
        icon : LuHeading1,
        label : "Title Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate : () => true
}


type CustomInstance = FromElementInstance & {
    extraAttributes: typeof extraAttributes;
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>

function PropertiesComponent({
    elementInstance
} :{elementInstance : FromElementInstance}) {
    const element = elementInstance as CustomInstance;
    const {updateElement} = useDesigner();
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues : {
            title: element.extraAttributes.title
        }
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    },[element,form]);

    function applyChanges(values: propertiesFormSchemaType){
        const {title} = values;
        updateElement(element.id,{
            ...element,
            extraAttributes: {
                title
            }
        })
    }

    return (
        <Form {...form}>
            <form
            onSubmit={form.handleSubmit(applyChanges)}
            onBlur={form.handleSubmit(applyChanges)}
            className="space-y-3"
            >
                <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input
                            onKeyDown={(e) => {
                                if(e.key === 'Enter') {
                                    e.currentTarget.blur();
                                }
                            }}
                            {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
            </form>
        </Form>
    )
}


function DesignerComponent ({
    elementInstance
} :{elementInstance : FromElementInstance}){
    const element = elementInstance as CustomInstance;

    const {title} = element.extraAttributes;

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                Title FIeld
            </Label> 
            <p className="text-xl">{title}</p>
        </div>
    )
}
function FormComponent ({
    elementInstance
} :{
    elementInstance : FromElementInstance
}){
    const element = elementInstance as CustomInstance;
    const {title} = element.extraAttributes;
    return (
        <p className="text-xl">{title}</p>
    )
}