import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import prisma from "@/lib/prisma";

export const GET = async (request: Request) => {
    const user = await currentUser();
    if (!user) {
        redirect("/sign-in");
    }

    const periods = await getHistoryPeriods(user.id);
    return Response.json(periods);
}

export type GetHistoryPeriodsResponseType = Awaited<ReturnType<typeof getHistoryPeriods>>

const getHistoryPeriods = async (userId: string) => {
    const results = await prisma.monthHistory.findMany({
        where: {userId},
        select: {year: true},
        distinct: ["year"],
        orderBy: [{year: "asc"}]
    });

    const years = results.map(el => el.year);
    if (years.length === 0) {
        return [new Date().getFullYear()];
    }

    return years;
}