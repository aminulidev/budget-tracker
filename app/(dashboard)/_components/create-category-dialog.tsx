import React, {useState} from 'react';
import {TransactionType} from "@/lib/types";
import {useForm} from "react-hook-form";
import {CreateCategoriesSchema, CreateCategoriesSchemaType} from "@/schema/categories";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {CircleOff, PlusSquare} from "lucide-react";
import {cn} from "@/lib/utils";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import CategoryPicker from "@/app/(dashboard)/_components/category-picker";
import {Popover, PopoverTrigger} from "@/components/ui/popover";

interface Props {
    type: TransactionType;
}
const CreateCategoryDialog = ({type}: Props) => {
    const [open, setOpen] = useState(false);
    const form =  useForm<CreateCategoriesSchemaType>({
        resolver: zodResolver(CreateCategoriesSchema),
        defaultValues: {
            type,
            name: "",
            icon: ""
        }
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusSquare className="mr-2 h-4 w-4" />
                    Create new
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create
                        <span
                            className={cn(
                                "m-1",
                                type === "income" ? "text-green-500" : "text-rose-500"
                            )}
                        >{type}</span>
                        category
                    </DialogTitle>
                    <DialogDescription>
                        Category are use to group your transactions
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Transaction category name
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="icon"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Icon</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline" className="h-24 w-full"
                                                >
                                                    {form.watch("icon") ?
                                                        <div>Selected icon</div> :
                                                        <div className="flex flex-col items-center gap-2">
                                                            <CircleOff className="h-10 w-10" />
                                                            <p className="text-xs text-muted-foreground">Click to select</p>
                                                        </div>
                                                    }
                                                </Button>
                                            </PopoverTrigger>
                                        </Popover>
                                    </FormControl>
                                    <FormDescription>
                                        This is how your category will appear in app
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCategoryDialog;