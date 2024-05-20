
import React from 'react';
import Logo from "@/components/logo";
import NavItem from "@/components/layout/nav-item";
import {UserButton} from "@clerk/nextjs";
import {ThemeToggler} from "@/components/theme-toggler";
import {navLinks} from "@/constants/routes";

interface DashboardNavProps {
    navLinks: {
        label: string,
        link: string
    }[]
}

const DashboardNav = () => {
    return (
        <div className="hidden border-separate border-b bg-background md:block">
            <nav className="container flex items-center justify-between px-8">
                <div className="flex h-20 min-h-16 items-center gap-x-4">
                    <Logo/>
                    <div className="flex h-full">
                        {navLinks.map(link => <NavItem key={link.label} label={link.label} link={link.link} />)}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggler />
                    <UserButton afterSignOutUrl="/sign-in" />
                </div>
            </nav>
        </div>
    );
};

export default DashboardNav;