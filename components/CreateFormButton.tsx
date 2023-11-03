"use client";

import {ImSpinner2} from "react-icons/im";
import {BsFileEarmarkPlus} from "react-icons/bs";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
    } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {Label} from "@/components/ui/label";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import {zodResolver} from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Span } from "next/dist/trace";
import { toast } from "./ui/use-toast";
import { formSchema, formSchemaType } from "@/schema/form";
import { CreateForm } from "@/actions/form";


export const CreateFormButton = () => {

    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = async (values : formSchemaType) => {
       try{
            const formId = await CreateForm(values);
            toast({
                title: "Success",
                description : "Form created successfully"
            });

            console.log(formId);
       }catch(error){
        toast({
            title: "Error",
            description : "Something went wrong, please try again later",
            variant: "destructive"
        })
       }
    }

    return(
        <Dialog>
            <DialogTrigger>
                <Button
                variant={"outline"}
                className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
                >
                    <BsFileEarmarkPlus
                    className={"h-8 w-8 text-muted-foreground group-hover:text-primary"}
                    />
                    <p
                    className="font-bold text-md text-muted-foreground group-hover:text-primary"
                    >Create new Form</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Form</DialogTitle>
                    <DialogDescription>
                        create a new form to start collection response
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2"
                    >
                        <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea rows={5} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={form.formState.isSubmitting}
                    className="w-full mt-4">
                        {!form.formState.isSubmitting && (
                            <span>Save</span>
                        )}
                         {form.formState.isSubmitting && (
                           <ImSpinner2 className={"animate-spin"}/>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}