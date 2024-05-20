import React from 'react';
import DashboardNav from "@/components/layout/dashboard-nav";
import MobileNav from "@/components/layout/mobile-nav";

const Navbar = () => {

    return (
        <>
            <DashboardNav />
            <MobileNav />
        </>
    );
};

export default Navbar;