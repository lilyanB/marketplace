"use client";

import * as React from "react";
import {
    RainbowKitProvider,
    getDefaultWallets,
    connectorsForWallets,
    Chain,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const PEGOMainnet: Chain = {
    id: 20201022,
    name: "PEGOMainnet",
    network: "PEGOMainnet",
    nativeCurrency: {
        decimals: 18,
        name: "PEGO",
        symbol: "PG",
    },
    rpcUrls: {
        public: {
            http: ["http://pegorpc.com/"],
        },
        default: {
            http: ["http://node1.pegorpc.com/"],
        },
    },
    testnet: false,
};

const PEGOTestnet: Chain = {
    id: 123456,
    name: "PEGOTestnet",
    network: "PEGOTestnet",
    nativeCurrency: {
        decimals: 18,
        name: "PEGO",
        symbol: "PG",
    },
    rpcUrls: {
        public: {
            http: ["https://rpc.pegotest.net/"],
        },
        default: {
            http: ["https://rpc.pegotest.net/"],
        },
    },
    blockExplorers: {
        default: {
            name: "SnowTrace",
            url: "https://scan.pegotest.net/",
        },
        etherscan: {
            name: "SnowTrace",
            url: "https://scan.pegotest.net/",
        },
    },
    testnet: true,
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        PEGOMainnet,
        PEGOTestnet,
    ],
    [publicProvider()]
);

const projectId = "4553aed4455ed3718b9271d2c9519377";
console.log(projectId);

const { wallets } = getDefaultWallets({
    appName: "market",
    projectId,
    chains,
});

const demoAppInfo = {
    appName: "market",
};

const connectors = connectorsForWallets([
    ...wallets,
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

export function RainbowProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
                {mounted && children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
}