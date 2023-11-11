"use client";

import { IoMdCheckbox } from "react-icons/io";
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
import { Checkbox } from "../ui/checkbox";

const type: ElementsType = "CheckboxField";

const extraAttributes =  {
    label: "Checkbox Field",
    helperText : "helper text",
    require: false
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    require: z.boolean().default(false)
})


export const CheckboxFieldFormElement : FormElement = {
    type,
    consstruct :(id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement : {
        icon : IoMdCheckbox,
        label : "Checkbox Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate : Validate
}

function Validate (formElement:FromElementInstance,currentValue : string):boolean {
    const element = formElement as CustomInstance;
    if(element.extraAttributes.require){
        return currentValue === "true";
    }

    return true;
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
            label: element.extraAttributes.label,
            require: element.extraAttributes.require,
            helperText: element.extraAttributes.helperText,
        }
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    },[element,form]);

    function applyChanges(values: propertiesFormSchemaType){
        const {label,helperText,require} = values;
        updateElement(element.id,{
            ...element,
            extraAttributes: {
                label,helperText,require
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
                name="label"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Label</FormLabel>
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
                        <FormDescription>
                                The label of the field <br/> it will be displyed above the field
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
                />
                
                <FormField
                control={form.control}
                name="helperText"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Helper Text</FormLabel>
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
                        <FormDescription>
                           enter helper text for the field <br />
                           it will be displyed below the field
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="require"
                render={({field}) => (
                    <FormItem className="flex items-center justify-between rounded-md border p-2 shadow-sm">
                        <div className=" space-y-0.5">
                        <FormLabel>Required</FormLabel>
                        <FormDescription>
                           you can set the field is require or not
                        </FormDescription>
                        </div>
                        <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
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

    const {label,require,helperText} = element.extraAttributes;
    const id = `checkbox-${element.id}`

    return (
        <div className="flex items-top space-x-2">
            <Checkbox id={id}/>

            <div className="grid gap-1.5 leading-none">
                <Label htmlFor={id}>
                    {label}
                    {require &&(
                        <span className="ml-2 text-destructive">*</span>
                    )}
                </Label>
                {helperText && (
                    <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
                )}
            </div>
        </div>
    )
}
function FormComponent ({
    elementInstance,
    submitValue,
    isValid,
    defaultValue
} :{
    elementInstance : FromElementInstance,
    submitValue?: SubmitFunction,
    isValid?: boolean,
    defaultValue?: string
}){
    const element = elementInstance as CustomInstance;
    const [value,setvalue] = useState<boolean>(defaultValue !== "true" ? true : false);
    const [error,setError] = useState(false);

    const {label,require,placeholder,helperText} = element.extraAttributes;

    useEffect(() => {
        setError(isValid === true);
    },[isValid])


    const id = `checkbox-${element.id}`

    return (
        <div className="flex items-top space-x-2">
            <Checkbox
             id={id} 
             checked={value}
             className={cn(error && "border-red-500")}
            onCheckedChange={(checked) => {
                let value = false;
                if(checked === true) {
                    value= true;
                }
                setvalue(value);
                if(!submitValue) return;

                const stringValue = value ? "true" : "false";
                const valid = CheckboxFieldFormElement.validate(element,stringValue);
                setError(!valid);
                submitValue(element.id,stringValue);
            }}
             />

            <div className="grid gap-1.5 leading-none">
                <Label htmlFor={id} className={cn(error && "border-red-500")}>
                    {label}
                    {require && (
                        <span className="ml-2 text-destructive">*</span>
                    )}
                </Label>
                {helperText && (
                    <p className={cn("text-muted-foreground text-[0.8rem]",
                    error && "border-red-500"
                    )}>{helperText}</p>
                )}
            </div>
        </div>
    )
}