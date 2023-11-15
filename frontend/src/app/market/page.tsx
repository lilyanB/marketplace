"use client"

import React, { useState } from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { fetchItems } from "@/utils/contracts/fetchContracts";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount } from "wagmi";


export default function Page() {
    const { isConnected } = useAccount()
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            console.log("run")
            const itemsFetch: any = await fetchItems()
            setItems(itemsFetch)
            console.log(itemsFetch)
            console.log(`https://ipfs.io/ipfs/${itemsFetch[0].uri.substring(7)}.png`)
        }

        fetchData()
    }, [isConnected]);

    if (!isConnected) {
        return (
            <main className="flex flex-col py-6">
                <div className="flex flex-col h-full w-full gap-6 justify-center items-center">
                    <ConnectButton />
                </div>
            </main>
        )
    }

    return (
        <main className="flex flex-col py-6">
            <div className="flex flex-col h-full w-full gap-6 justify-center items-center">
                <ConnectButton />
                <div className="flex gap-4 justify-center items-center">
                    {items.map((item, index) => (
                        <Card
                            isFooterBlurred
                            radius="lg"
                            className="border-none"
                            key={index}
                        >
                            <Image
                                alt="Woman listing to music"
                                className="object-cover"
                                height={200}
                                src={`https://ipfs.io/ipfs/${item.uri.substring(7)}.png`}
                                width={200}
                            />
                            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                <p className="text-tiny">{Number(item.listPrice)}</p>
                                {item.erc20Address === "0x0000000000000000000000000000000000000000" && (
                                    <p className="text-tiny">PG</p>
                                )}
                                <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                                    Buy
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
}
