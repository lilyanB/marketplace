"use client"

import { fetchItems } from "@/utils/contracts/fetchContracts";
import { useEffect } from "react";


export default function Page() {

    useEffect(() => {
        async function fetchData() {
            const items = await fetchItems()
            console.log(items)
        }

        fetchData()
    }, []);

    return (
        <main className="flex flex-col py-6">
            <div className="flex flex-col h-full w-full gap-6 justify-center items-center">
                market
            </div>
        </main>
    );
}
