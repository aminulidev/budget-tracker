"use server"


import {CreateCategorySchema, CreateCategorySchemaType} from "@/schema/category";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import prisma from "@/lib/prisma";

export const CreateCategory = async (form: CreateCategorySchemaType) => {
    const parsedBody = CreateCategorySchema.safeParse(form);
    if (!parsedBody.success) {
        throw new Error("Bad request!");
    }

    const user = await currentUser();
    if (!user) {
        redirect("/sign-in");
    }

    const {name, icon, type} = parsedBody.data;
    return prisma.category.create({
        data: {
            userId: user.id,
            name, icon, type
        }
    });

}