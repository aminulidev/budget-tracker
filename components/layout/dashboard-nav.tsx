import React from 'react';
import Logo from "@/components/logo";
import NavItem from "@/components/layout/nav-item";

interface DashboardNavProps {
    navLinks: {
        label: string,
        link: string
    }[]
}

const navLinks = [
    {label: "Dashboard", link: "/"},
    {label: "Transactions", link: "/transactions"},
    {label: "Manage", link: "/manage"},
];

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
            </nav>
        </div>
    );
};

export default DashboardNav;