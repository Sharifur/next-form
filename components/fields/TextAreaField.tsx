"use client";

import { BsTextareaResize } from "react-icons/bs";
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
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";


const type: ElementsType = "TextAreaField";

const extraAttributes =  {
    label: "Textarea Field",
    helperText : "helper text",
    require: false,
    placeholder : "value here",
    rows: 3
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    placeholder: z.string().max(200),
    require: z.boolean().default(false),
    rows: z.number().min(2).max(10)
})


export const TextAreaFieldFormElement : FormElement = {
    type,
    consstruct :(id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement : {
        icon : BsTextareaResize,
        label :  "Textarea Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate : Validate
}

function Validate (formElement:FromElementInstance,currentValue : string):boolean {
    const element = formElement as CustomInstance;
    if(element.extraAttributes.require){
        return currentValue.length > 0;
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
            placeholder: element.extraAttributes.placeholder,
            require: element.extraAttributes.require,
            helperText: element.extraAttributes.helperText,
            rows: element.extraAttributes.rows,
        }
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    },[element,form]);

    function applyChanges(values: propertiesFormSchemaType){
        const {label,helperText,placeholder,require,rows} = values;
        updateElement(element.id,{
            ...element,
            extraAttributes: {
                label,helperText,placeholder,require,rows
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
                name="placeholder"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Placeholer</FormLabel>
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
                            placeholder of the field
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
                <FormField
                control={form.control}
                name="rows"
                render={({field}) => (
                    <FormItem className="flex items-center justify-between rounded-md border p-2 shadow-sm">
                        <div className=" space-y-0.5">
                        <FormLabel>Rows</FormLabel>
                        </div>
                        <FormControl>
                            <Slider
                            defaultValue={[field.value]}
                            min={1}
                            max={10}
                            step={1}
                            onValueChange={(value) => {
                                field.onChange(value[0])
                            }}
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

    const {label,require,placeholder,helperText,rows} = element.extraAttributes;

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {label}
                {require &&(
                    <span className="ml-2 text-destructive">*</span>
                )}
            </Label>
            <Textarea
                rows={rows}
                readOnly
                disabled
                placeholder={placeholder}
            />
            {helperText && (
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            )}
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
    const [value,setvalue] = useState(defaultValue || "");
    const [error,setError] = useState(false);

    const {label,require,placeholder,helperText,rows} = element.extraAttributes;

    useEffect(() => {
        setError(isValid === true);
    },[isValid])


    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className={cn(error && "text-red-500")}>
                {label}
                {require &&(
                    <span className="ml-2 text-destructive">*</span>
                )}
            </Label>
            <Textarea
                rows={rows}
                className={cn(error && "border-red-500")}
                placeholder={placeholder}
                onChange={(e) => setvalue(e.target.value)}
                onBlur={(e) => {
                    if(!submitValue){return};
                    const valid = TextAreaFieldFormElement.validate(element,e.target.value);
                    setError(!valid);
                    if(!valid){ return; }
                    submitValue(element.id,e.target.value);
                }}
                value={value}
            />
            {helperText && (
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            )}
        </div>
    )
}