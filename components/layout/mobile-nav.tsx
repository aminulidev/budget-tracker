"use client";
import React, {useState} from 'react';
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import Logo, {LogoMobile} from "@/components/logo";
import {navLinks} from "@/constants/routes";
import NavItem from "@/components/layout/nav-item";
import {ThemeToggler} from "@/components/theme-toggler";
import {UserButton} from "@clerk/nextjs";

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="block border-separate bg-background md:hidden">
            <nav className="container flex items-center justify-between gap-4 px-5 sm:px-8">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="bg-accent"><Menu/></Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="mt-5"><Logo/></div>
                        <div className="flex flex-col gap-1 pt-4">
                            {navLinks.map(link =>
                                <NavItem
                                    clickCallBack={() => setIsOpen(prevState => !prevState)}
                                    key={link.label} label={link.label} link={link.link}
                                />
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="flex h-20 min-h-16 items-center gap-x-4">
                    <LogoMobile/>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggler/>
                    <UserButton afterSignOutUrl="/sign-in"/>
                </div>
            </nav>
        </div>
    );
};

export default MobileNav;