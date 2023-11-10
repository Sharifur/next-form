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
import { LuHeading1, LuSeparatorHorizontal } from "react-icons/lu";
import { Slider } from "../ui/slider";

const type: ElementsType = "SpacerFIeld";

const extraAttributes =  {
    height: 20 //'px
}
const propertiesSchema = z.object({
    height: z.number().min(5).max(100)
})


export const SpacerFieldFormElement : FormElement = {
    type,
    consstruct :(id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement : {
        icon : LuSeparatorHorizontal,
        label : "Spacer Field"
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
            height: element.extraAttributes.height
        }
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    },[element,form]);

    function applyChanges(values: propertiesFormSchemaType){
        const {height} = values;
        updateElement(element.id,{
            ...element,
            extraAttributes: {
                height
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
                name="height"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Height (px): {form.watch('height')}</FormLabel>
                        <FormControl>
                            <Slider
                                defaultValue={[field.value]}
                                min={5}
                                max={200}
                                onValueChange={(value) => {
                                    field.onChange(value[0])
                                }}
                            />
                            {/* <Input
                            onKeyDown={(e) => {
                                if(e.key === 'Enter') {
                                    e.currentTarget.blur();
                                }
                            }}
                            {...field}
                            /> */}
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

    const {height} = element.extraAttributes;

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>Spacer Field: {height}px</Label> 
            <LuSeparatorHorizontal className="h-8 w-8" />
        </div>
    )
}
function FormComponent ({
    elementInstance
} :{
    elementInstance : FromElementInstance
}){
    const element = elementInstance as CustomInstance;
    const {height} = element.extraAttributes;
    return (
        <div style={{height,width: "100%"}}></div>
    )
}