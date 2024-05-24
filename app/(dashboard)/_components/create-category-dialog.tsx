import React, {useCallback, useState} from 'react';
import {TransactionType} from "@/lib/types";
import {useForm} from "react-hook-form";
import {CreateCategorySchema, CreateCategorySchemaType} from "@/schema/category";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {CircleOff, Loader2, PlusSquare} from "lucide-react";
import {cn} from "@/lib/utils";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import CategoryPicker from "@/app/(dashboard)/_components/category-picker";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import EmojiPicker from "@emoji-mart/react";
import data  from "@emoji-mart/data";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CreateCategory} from "@/app/(dashboard)/_actions/categories";
import {Category} from "@prisma/client";
import {toast} from "sonner";
import {useTheme} from "next-themes";

interface Props {
    type: TransactionType;
    successCallback: (category: Category) => void;
}
const CreateCategoryDialog = ({type, successCallback}: Props) => {
    const [open, setOpen] = useState(false);
    const form =  useForm<CreateCategorySchemaType>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
            type,
            name: "",
            icon: ""
        }
    });

    const queryClient = useQueryClient();
    const theme = useTheme();

    const {mutate, isPending} = useMutation({
        mutationFn: CreateCategory,
        onSuccess: async (data: Category) => {
            form.reset({
                name: "",
                icon: "",
                type
            });

            toast.success(`Category ${data.name} created successfully 🎉`, {
                id: "create-category"
            });

            successCallback(data);

            await queryClient.invalidateQueries({
                queryKey: ["categories"]
            });

            setOpen(prevState => !prevState);
        },
        onError: () => {
            toast.error("Something went wrong", {
                id: "create-category"
            });
        }
    });

    const onSubmit = useCallback((values: CreateCategorySchemaType) => {
        toast.loading("Creating category...", {
            id: "create-category"
        });
        mutate(values);
    }, [mutate]);

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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                                        <div className="flex flex-col items-center gap-2">
                                                            <span className="text-5xl" role="img">{field.value}</span>
                                                            <p className="text-xs text-muted-foreground">
                                                                Click to change
                                                            </p>
                                                        </div> :
                                                        <div className="flex flex-col items-center gap-2">
                                                            <CircleOff className="h-10 w-10"/>
                                                            <p className="text-xs text-muted-foreground">Click to
                                                                select</p>
                                                        </div>
                                                    }
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <EmojiPicker
                                                    data={data}
                                                    theme={theme.resolvedTheme}
                                                    onEmojiSelect={(emoji: {native: string}) => {
                                                        field.onChange(emoji.native);
                                                    }}
                                                />
                                            </PopoverContent>
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
                <DialogFooter>
                    <DialogClose>
                        <Button
                            onClick={() => {form.reset();}}
                            type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={isPending}
                    >
                        {isPending ? <Loader2 className="animate-spin" /> : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCategoryDialog;