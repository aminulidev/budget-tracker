"use client";
import React, {ReactNode, useCallback, useState} from 'react';
import {TransactionType} from "@/lib/types";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {useForm} from "react-hook-form";
import {CreateTransactionSchema, CreateTransactionSchemaType} from "@/schema/transactions";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import CategoryPicker from "@/app/(dashboard)/_components/category-picker";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {format} from "date-fns/format";
import { Calendar } from "@/components/ui/calendar"
import {CalendarIcon, Loader2} from "lucide-react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CreateTransaction} from "@/app/(dashboard)/_actions/transaction";
import {toast} from "sonner";
import {DateToUTCDate} from "@/lib/helpers";

interface Props {
    trigger: ReactNode;
    type: TransactionType;
}

const CreateTransactionDialog = ({trigger, type}: Props) => {
    const [open, setOpen] = useState(false);
    const form = useForm<CreateTransactionSchemaType>({
        resolver: zodResolver(CreateTransactionSchema),
        defaultValues: {
            amount: 0,
            description: "",
            date: new Date(),
            category: "",
            type,
        }
    });

    const handleCategoryChange = useCallback((value: string) => {
        form.setValue("category", value);
    }, [form]);

    const queryClient = useQueryClient();

    const {mutate, isPending} = useMutation({
        mutationFn: CreateTransaction,
        onSuccess: async () => {
            toast.success("Transaction created successfully 🎉", {
                id: "create-transaction"
            });

            form.reset({
                type,
                description: "",
                amount: 0,
                date: new Date(),
                category: undefined
            });

            // invalidate overview query data
             await queryClient.invalidateQueries({
                queryKey: ["overview"]
            });

             setOpen(prevState => !prevState);
        }
    });

    // submit
    const onSubmit = useCallback((values: CreateTransactionSchemaType) => {
        toast.loading("Creating transaction...", {
            id: "create-transaction"
        });

        mutate({
            ...values,
            date: DateToUTCDate(values.date)
        })
    }, [mutate]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create a new
                        <span
                            className={cn("m-1",
                                type === "income" ? "text-green-500" : "text-rose-500"
                            )}>
                            {type}
                        </span>
                        transaction
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="description" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Transaction description (optional)
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="amount" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Transaction amount (required)
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-between gap-2">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1.5 w-full">
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <CategoryPicker type={type} onChange={handleCategoryChange} />
                                        </FormControl>
                                        <FormDescription>
                                            Select transaction category
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1.5 w-full">
                                        <FormLabel>Transaction date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ?
                                                        format(field.value, "PPP") :
                                                        <span>Pick a date</span>
                                                    }
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={(value) => {
                                                        if (!value) return;
                                                        field.onChange(value);
                                                    }}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Select transaction date
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                        </div>
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
                        className={cn(
                            "bg-green-700 text-white hover:bg-green-600",
                            type === "expense" && "bg-rose-700 hover:bg-rose-600"
                        )}
                    >
                        {isPending ? <Loader2 className="animate-spin" /> : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTransactionDialog;