"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Home() {

  return (
    <main className="flex flex-col py-6">
      <div className="flex flex-col h-full w-full gap-6 justify-center items-center">
        <ConnectButton />
      </div>
    </main>
  )
}
