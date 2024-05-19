import React from 'react';
import Logo from "@/components/logo";

const AuthLayout = ({children} : {children: React.ReactNode}) => {
    return (
        <div className="relative flex flex-col items-center justify-center h-screen w-full">
            {/*<Logo/>*/}
            <div className="mt-12">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;