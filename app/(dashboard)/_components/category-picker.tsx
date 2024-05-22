import React from 'react';
import {CreateTransactionSchemaType} from "@/schema/transactions";
import {TransactionType} from "@/lib/types";
import {useQuery} from "@tanstack/react-query";

interface Props {
    type: TransactionType;
}
const CategoryPicker = ({type}: Props) => {
    const categoriesQuery = useQuery({
        queryKey: ["categories", type],
        queryFn: () => fetch(`/api/categories?type=${type}`).then((res) => res.json())
    })
    return (
        <div>
            CategoryPicker
        </div>
    );
};

export default CategoryPicker;