'use client'

import React, { useState, useEffect } from 'react'
import {
  Card,
  CardFooter,
  Image,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Spinner,
} from '@nextui-org/react'
import { fetchItems } from '@/utils/contracts/fetchContracts'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

// Component definition
export default function Page() {
  const { isConnected } = useAccount()
  const [items, setItems] = useState<any[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [itemModal, setItemModal] = useState<any>()

  useEffect(() => {
    async function fetchData() {
      try {
        const itemsFetch = await fetchItems()
        setItems(itemsFetch)
        setItemModal(itemsFetch[0])
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    }

    fetchData()
  }, [isConnected])

  const handleOpen = (item: any) => {
    setItemModal(item)
    onOpen()
  }

  const renderMainContent = () => {
    if (!isConnected) {
      return (
        <div className="flex flex-col h-full w-full gap-6 justify-center items-center">
          <ConnectButton />
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center space-y-6">
        <div className="h-11/12 w-11/12 border-solid border-2">
          <h1>NFT Collection</h1>
          <div className="flex justify-center space-x-6">
            <ScrollShadow className="space-x-2">
              <Button radius="lg">Collection 1</Button>
              <Button radius="lg">Collection 2</Button>
              <Button radius="lg">Collection 3</Button>
              <Button radius="lg">Collection 4</Button>
              <Button radius="lg">Collection 5</Button>
            </ScrollShadow>
          </div>
        </div>
        <div className="flex flex-col gap-6 h-11/12 w-11/12 border-solid border-2">
          <h1>NFTs</h1>
          <div className="flex gap-4 justify-center items-center">
            {items.length === 0 ? (
              <Spinner size="lg" />
            ) : (
              items.map((item, index) => (
                <Card
                  isFooterBlurred
                  radius="lg"
                  className="border-none"
                  key={index}
                >
                  {/* Card content */}
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
                      {item.erc20Address ===
                        '0x0000000000000000000000000000000000000000' && (
                        <p className="text-tiny">PG</p>
                      )}
                      <Button
                        className="text-tiny text-white bg-black/20"
                        variant="flat"
                        color="default"
                        radius="lg"
                        size="sm"
                        onPress={() => handleOpen(item)}
                      >
                        View
                      </Button>
                    </CardFooter>
                  </Card>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <main className="flex flex-col py-6 h-full w-full">
        {renderMainContent()}
      </main>
      {/* Modal */}
      <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">NFT</ModalHeader>
              <ModalBody>
                {/* Modal content */}
                <Image
                  alt="Woman listing to music"
                  className="object-cover"
                  height={200}
                  src={`https://ipfs.io/ipfs/${itemModal.uri.substring(7)}.png`}
                  width={200}
                />
                <p className="text-tiny">{Number(itemModal.listPrice)}</p>
                {itemModal.erc20Address ===
                  '0x0000000000000000000000000000000000000000' && (
                  <p className="text-tiny">PG</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary">Buy</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
