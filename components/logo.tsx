import React from 'react';
import Link from "next/link";
import {PiggyBank} from "lucide-react";

const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2">
            <PiggyBank className="stroke h-11 w-11 stroke-green-500 strok-[1.5]" />
            <p className="bg-gradient-to-r from-green-400 to-rose-400 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">BudgetTracker</p>
        </Link>
    );
};

export const LogoMobile = () => {
    return (
        <Link href="/" className="flex items-center gap-2">
            <p className="bg-gradient-to-r from-green-400 to-rose-400 bg-clip-text text-2xl font-bold leading-tight tracking-tighter text-transparent">BudgetTracker</p>
        </Link>
    );
};

export default Logo;