"use client";
import React, {useMemo, useState} from 'react';
import {UserSettings} from "@prisma/client";
import {Period, Timeframe} from "@/lib/types";
import {GetFormatterForCurrency} from "@/lib/helpers";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "lucide-react";

const TransactionHistory = ({userSettings} : {userSettings: UserSettings}) => {
    const [timeframe, setTimeframe] = useState<Timeframe>("month");
    const [period, setPeriod] = useState<Period>({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    });
    
    const formatter = useMemo(() => {
        return GetFormatterForCurrency(userSettings.currency);
    }, [userSettings.currency]);
    
    return (
        <div className="container">
            <h2 className="mt-12 text-3xl font-bold">History</h2>
            <Card className="col-span-12 mt-2 w-full">
                <CardHeader>
                    {/*<CardTitle className="grid grid-flow-row justify-between gap-2 md:grid-flow-col">*/}
                    {/*    <HistoryPeriodSelector*/}
                    {/*        period={period}*/}
                    {/*        setPeriod={setPeriod}*/}
                    {/*        timeframe={timeframe}*/}
                    {/*        setTimeframe={setTimeframe}*/}
                    {/*    />*/}
                    {/*    <div className="flex h-10 gap-2">*/}
                    {/*        <Badge >*/}

                    {/*        </Badge>*/}
                    {/*    </div>*/}
                    {/*</CardTitle>*/}
                </CardHeader>
            </Card>
        </div>
    );
};

export default TransactionHistory;