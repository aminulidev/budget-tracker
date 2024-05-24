import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {OverviewQuerySchema} from "@/schema/overview";
import prisma from "@/lib/prisma";

export const GET = async (request: Request) => {
    const user = await currentUser();
    if (!user) {
        redirect("/sign-in");
    }

    const {searchParams} = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const queryParams = OverviewQuerySchema.safeParse({from, to});

    if (!queryParams.success) {
        return Response.json(queryParams.error.message, {
            status: 400
        });
    }

    const stats = await getBalanceStats(
        user.id,
        queryParams.data.from,
        queryParams.data.to
    );

    return Response.json(stats);
}

export type GetBalanceStatsResponseType = Awaited<ReturnType<typeof getBalanceStats>>

const getBalanceStats = async (userId: string, from: Date, to: Date) => {
    const total = await prisma.transaction.groupBy({
        by: ["type"],
        where: {
            userId,
            date: {
                gte: from,
                lte: to
            }
        },
        _sum: {
            amount: true
        }
    });

    return {
        expense: total.find(t => t.type === "expense")?._sum.amount || 0,
        income: total.find(t => t.type === "income")?._sum.amount || 0,
    }
}