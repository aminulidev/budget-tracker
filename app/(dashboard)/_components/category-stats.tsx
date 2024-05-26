"use client";
import React, {useMemo} from 'react';
import {UserSettings} from "@prisma/client";
import {useQuery} from "@tanstack/react-query";
import {DateToUTCDate, GetFormatterForCurrency} from "@/lib/helpers";
import SkeletonWrapper from "@/components/skeleton-wrapper";
import {GetCategoriesStatsResponseType} from "@/app/api/stats/categories/route";
import {Car} from "lucide-react";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";

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
            <SkeletonWrapper isLoading={statsQuery.isFetching}>
                <CategoryCard
                    formatter={formatter}
                    type="income"
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
        <Card className="h-80 w-full">
            <CardHeader>
                <CardTitle></CardTitle>
            </CardHeader>
        </Card>
    )
}