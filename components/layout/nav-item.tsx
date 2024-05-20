"use client";
import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";

const NavItem = ({label, link}: {label: string, link: string}) => {
    const pathName = usePathname();
    const isActive = pathName === link;

    return (
        <div className="relative flex items-center">
            <Link
                href={link}
                className={cn(
                    buttonVariants({variant: "ghost"}),
                    "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
                    isActive && "text-foreground"
                    )}
            >
                {label}
            </Link>
            {isActive && (
                <div className="absolute -bottom-0.5 left-1/2 hidden h-0.5 w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block" />
            )}
        </div>
    );
};

export default NavItem;