import React, {ReactNode} from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/lib/utils";

interface SkeletonWrapperProps {
    children: ReactNode;
    isLoading: boolean;
    fullwidth?: boolean;
}
const SkeletonWrapper = ({children, isLoading, fullwidth}: SkeletonWrapperProps) => {
    if (!isLoading) return children;

    return (
        <Skeleton className={cn(fullwidth && "w-full")}>
            <div className="opacity-0">{children}</div>
        </Skeleton>
    );
};

export default SkeletonWrapper;