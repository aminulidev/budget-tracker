"use client";
import React, {useMemo} from 'react';
import {UserSettings} from "@prisma/client";
import {useQuery} from "@tanstack/react-query";
import {DateToUTCDate, GetFormatterForCurrency} from "@/lib/helpers";
import SkeletonWrapper from "@/components/skeleton-wrapper";
import {GetCategoriesStatsResponseType} from "@/app/api/stats/categories/route";
import {Car} from "lucide-react";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Progress} from "@/components/ui/progress";

interface Props {
    userSettings: UserSettings;
    from: Date;
    to: Date;
}

const CategoryStats = ({userSettings, from, to}: Props) => {
    const statsQuery = useQuery<GetCategoriesStatsResponseType>({
        queryKey: ["overview", "stats", "category", from, to],
        queryFn: () => fetch(
            `/api/stats/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`
        ).then(res => res.json())
    });

    const formatter = useMemo(() => {
        return GetFormatterForCurrency(userSettings.currency);
    }, [userSettings.currency]);

    return (
        <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
            <SkeletonWrapper fullwidth={true} isLoading={statsQuery.isFetching}>
                <CategoryCard
                    formatter={formatter}
                    type="income"
                    data={statsQuery.data || []}
                />
            </SkeletonWrapper>
            <SkeletonWrapper fullwidth={true} isLoading={statsQuery.isFetching}>
                <CategoryCard
                    formatter={formatter}
                    type="expense"
                    data={statsQuery.data || []}
                />
            </SkeletonWrapper>
        </div>
    );
};

export default CategoryStats;

const CategoryCard = ({data, type, formatter}: {
    data: GetCategoriesStatsResponseType;
    type: String;
    formatter: Intl.NumberFormat;
}) => {
    const filteredData = data.filter((el) => el.type === type);
    const total = filteredData.reduce((acc, el) => acc + (el._sum?.amount || 0), 0);

    return (
        <Card className="h-80 w-full col-span-6">
            <CardHeader>
                <CardTitle
                    className="grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col">
                    {type === "income" ? "Incomes" : "Expenses"} by category
                </CardTitle>
            </CardHeader>

            <div className="flex items-center justify-between gap-2">
                {filteredData.length === 0 &&
                    <div className="flex h-60 w-full flex-col items-center justify-center">
                        No data for the selected period
                        <p className="text-sm text-muted-foreground">
                            Try selecting a different period or try adding new {type === "income" ? "income" : "expense"}
                        </p>
                    </div>
                }

                {filteredData.length > 0 &&
                    <ScrollArea className="h-60 w-full px-4">
                        <div className="flex w-full flex-col gap-4 p-4">
                            {filteredData.map((item) => {
                                const amount = item._sum.amount || 0;
                                const percentage = (amount * 100) / (total || amount);

                                return (
                                    <div key={item.category} className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center text-gray-400">
                                                {item.categoryIcon} {item.category}
                                                <span className="ml-2 text-xs text-muted-foreground">
                                                    ({percentage.toFixed(0)}%)
                                                </span>
                                            </span>
                                            <span className="text-sm text-muted-foreground ">{formatter.format(amount)}</span>
                                        </div>

                                        <Progress
                                            value={percentage}
                                            indicator={
                                            type === "income" ? "bg-green-500" : "bg-rose-500"
                                            }
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </ScrollArea>
                }
            </div>
        </Card>
    )
}