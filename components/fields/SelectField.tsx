"use client";

import { RxDropdownMenu } from "react-icons/rx";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { toast } from "../ui/use-toast";

const type: ElementsType = "SelectField";

const extraAttributes =  {
    label: "Select Field",
    helperText : "helper text",
    require: false,
    placeholder : "value here",
    options: []
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    placeholder: z.string().max(200),
    require: z.boolean().default(false),
    options: z.array(z.string()).default([])
})


export const SelectFieldFormElement : FormElement = {
    type,
    consstruct :(id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement : {
        icon : RxDropdownMenu,
        label : "Select Field"
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
    const {updateElement,setSelectedElement} = useDesigner();
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onSubmit",
        defaultValues : {
            label: element.extraAttributes.label,
            placeholder: element.extraAttributes.placeholder,
            require: element.extraAttributes.require,
            helperText: element.extraAttributes.helperText,
            options: element.extraAttributes.options,
        }
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    },[element,form]);

    function applyChanges(values: propertiesFormSchemaType){
        const {label,helperText,placeholder,require,options} = values;
        updateElement(element.id,{
            ...element,
            extraAttributes: {
                label,helperText,placeholder,require,options
            }
        });
        toast({
            title: "success",
            description : "properties saved successfully"
        })
        setSelectedElement(null);
    }

    return (
        <Form {...form}>
            <form
            onSubmit={form.handleSubmit(applyChanges)}
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
                <Separator/>
                <FormField
                control={form.control}
                name="options"
                render={({field}) => (
                    <FormItem>
                        <div className="flex justify-between items-center">
                            <FormLabel>Options</FormLabel>
                            <Button
                                variant={"outline"}
                                className="gap-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    form.setValue("options",field.value.concat("new option"))
                                }}
                            >
                                <AiOutlinePlus />
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            {form.watch("options").map((option,index) => (
                                <div key={index} className="flex items-center justify-between gap-1">
                                    <Input
                                        placeholder=""
                                        value={option}
                                        onChange={(e) => {
                                            field.value[index] = e.target.value;
                                            field.onChange(field.value);
                                        }}
                                    />
                                    <Button 
                                    variant={"ghost"}
                                    size={"icon"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const newOptions = [...field.value];
                                        newOptions.splice(index,1)
                                        field.onChange(newOptions);
                                    }}
                                    >
                                    <AiOutlineClose className="h-4 w-3" />
                                    </Button>
                                </div>
                            ))}
                        </div>
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
                <Separator />
                <Button className="w-full" type="submit">
                    Submit
                </Button>
            </form>
        </Form>
    )
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
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
            </Select>
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

    const {label,require,placeholder,helperText,options} = element.extraAttributes;

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
            <Select
            defaultValue={value}
            onValueChange={(value) => {
                setvalue(value);
                if(!submitValue) return;
                const valid  =SelectFieldFormElement.validate(element,value);
                setError(!valid);
                submitValue(element.id,value);
            }}
            >
                <SelectTrigger 
                className={cn("w-full",
                error && "border-red-500"
                )}>
                    <SelectValue placeholder={placeholder} />
                    <SelectContent>
                        {options.map((option) => (
                        <SelectItem key={option} value={option}>
                              {option}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </SelectTrigger>
            </Select>
            {helperText && (
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            )}
        </div>
    )
}