"use client";
import React, {ReactNode} from 'react';
import {TransactionType} from "@/lib/types";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {useForm} from "react-hook-form";
import {CreateTransactionSchema, CreateTransactionSchemaType} from "@/schema/transactions";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import CategoryPicker from "@/app/(dashboard)/_components/category-picker";

interface Props {
    trigger: ReactNode;
    type: TransactionType;
}

const CreateTransactionDialog = ({trigger, type}: Props) => {
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
    return (
        <Dialog>
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
                    <form className="space-y-4">
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
                                        <Input placeholder="amount" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Transaction amount (required)
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <CategoryPicker type={type} />
                                    </FormControl>
                                    <FormDescription>
                                        Select a category for this transaction
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

export default CreateTransactionDialog;