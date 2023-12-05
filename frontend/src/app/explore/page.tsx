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
  Spinner,
  Tooltip,
  Input,
} from '@nextui-org/react'
import {
  fetchAllowanceERC20,
  fetchItems,
  fetchSymbolERC20,
} from '@/utils/contracts/fetchContracts'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useContractWrite, useNetwork } from 'wagmi'
import { marketContract, myERC20ABI } from '@/utils/contracts/setupContracts'
import { formatEther } from 'viem'
import { addressNul, marketplaceAddress } from '@/utils/contracts/constants'

// Component definition
export default function Page() {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const [itemsListing, setItemsListing] = useState<any[]>([])
  const [itemsListingByUser, setItemsListingByUser] = useState<any[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [itemModal, setItemModal] = useState<any>()
  const [allowanceOfERC20, setAllowanceOfERC20] = useState<any>()
  const [symboleOfERC20, setSymboleOfERC20] = useState<string>('')
  const [approvalAmount, setApprovalAmount] = useState<any>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsFetch = await fetchItems()
        setItemModal(itemsFetch[0])
        fetchListing(itemsFetch)
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    }

    async function fetchListing(items: any[]) {
      let itemsList = []
      for (var val of items) {
        if (val.owner == addressNul) {
          itemsList.push(val)
        }
      }
      console.log(itemsList)
      const filteredArray = itemsList.filter((item) => item.seller === address)
      setItemsListingByUser(filteredArray)
      setItemsListing(itemsList)
    }

    if (chain && chain.id == 123456) {
      fetchData()
    } else {
      setItemsListing([])
    }
  }, [isConnected, chain])

  const handleOpen = async (item: any) => {
    setItemModal(item)

    const allowance = await fetchAllowanceERC20(
      address,
      marketplaceAddress,
      item.erc20Address
    )
    const symbol: string = await fetchSymbolERC20(item.erc20Address)
    setAllowanceOfERC20(allowance)
    setSymboleOfERC20(symbol)
    onOpen()
  }

  const { data, isLoading, isSuccess, write } = useContractWrite(
    // @ts-ignore
    {
      functionName: 'buyListing',
      ...marketContract,
    }
  )

  const {
    data: data2,
    isLoading: isLoading2,
    isSuccess: isSuccess2,
    write: write2,
  } = useContractWrite(
    // @ts-ignore
    {
      functionName: 'buyListingERC20',
      ...marketContract,
    }
  )

  const { write: writeApprove } = useContractWrite(
    // @ts-ignore
    {
      abi: myERC20ABI,
      functionName: 'approve',
    }
  )

  const handleBuyButtonClick = async (itemModal: any) => {
    console.log(itemModal)
    try {
      // Convert marketplaceId to a number if needed
      const id = Number(itemModal.marketplaceId)
      const price = itemModal.listPrice

      if (itemModal.erc20Address == addressNul) {
        console.log('buy with ether')
        await write({
          args: [id],
          value: price,
        })
      } else {
        console.log('buy with erc20')
        await write2({
          args: [id],
        })
      }
    } catch (error) {
      console.error('Error performing buy action:', error)
    }
  }

  const handleApproveButtonClick = async (
    itemModal: any,
    approvalAmount: any
  ) => {
    console.log(approvalAmount)
    console.log(itemModal)
    try {
      console.log('Increase allowance')
      await writeApprove({
        // @ts-ignore
        address: itemModal.erc20Address,
        args: [marketplaceAddress, itemModal.listPrice],
      })
      onClose()
      onOpen()
    } catch (error) {
      console.error('Error performing buy action:', error)
    }
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
        <div className="h-11/12 w-11/12">
          <h1 className="text-4xl font-bold">NFT Collection</h1>
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <Tooltip content="address 1">
              <Button radius="lg">Collection 1</Button>
            </Tooltip>
            <Tooltip content="address 2">
              <Button radius="lg">Collection 2</Button>
            </Tooltip>
            <Tooltip content="address 3">
              <Button radius="lg">Collection 3</Button>
            </Tooltip>
            <Tooltip content="address 4">
              <Button radius="lg">Collection 4</Button>
            </Tooltip>
            <Tooltip content="address 5">
              <Button radius="lg">Collection 5</Button>
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-col h-11/12 w-11/12">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
            NFTs
          </h1>
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {itemsListing.length === 0 ? (
              <Spinner size="lg" />
            ) : (
              itemsListing.map((item, index) => (
                <div
                  key={index}
                  className="w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                >
                  {/* Card content */}
                  <Card
                    isFooterBlurred
                    radius="lg"
                    className="border-none"
                    key={index}
                  >
                    <div className="h-48">
                      <Image
                        alt="nft image"
                        height={200}
                        width={200}
                        src={`https://ipfs.io/ipfs/${item.uri.substring(
                          7
                        )}.png`}
                      />
                    </div>
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {item.erc20Address == addressNul ? (
                            <>
                              <p className="text-tiny">
                                {formatEther(item.listPrice)}
                              </p>
                              <p className="text-tiny">PG</p>
                            </>
                          ) : (
                            <>
                              <p className="text-tiny">
                                {formatEther(item.listPrice)}
                              </p>
                              <p className="text-tiny">ERC20</p>
                            </>
                          )}
                        </div>
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
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              ))
            )}
          </div>

          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
            Your NFTs on sale
          </h1>
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {itemsListingByUser.length === 0 ? (
              <Spinner size="lg" />
            ) : (
              itemsListingByUser.map((item, index) => (
                <div
                  key={index}
                  className="w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                >
                  {/* Card content */}
                  <Card
                    isFooterBlurred
                    radius="lg"
                    className="border-none"
                    key={index}
                  >
                    <div className="h-48">
                      <Image
                        alt="nft image"
                        height={200}
                        width={200}
                        src={`https://ipfs.io/ipfs/${item.uri.substring(
                          7
                        )}.png`}
                      />
                    </div>
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {item.erc20Address == addressNul ? (
                            <>
                              <p className="text-tiny">
                                {formatEther(item.listPrice)}
                              </p>
                              <p className="text-tiny">PG</p>
                            </>
                          ) : (
                            <>
                              <p className="text-tiny">
                                {formatEther(item.listPrice)}
                              </p>
                              <p className="text-tiny">ERC20</p>
                            </>
                          )}
                        </div>
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
                      </div>
                    </CardFooter>
                  </Card>
                </div>
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
                  width={200}
                  src={`https://ipfs.io/ipfs/${itemModal.uri.substring(7)}.png`}
                />

                {itemModal.erc20Address == addressNul ? (
                  <>
                    <p className="text-tiny">
                      {formatEther(itemModal.listPrice)}
                    </p>
                    <p className="text-tiny">PG</p>
                  </>
                ) : (
                  <>
                    <p className="text-tiny">your allowance for this ERC20 :</p>
                    <p className="text-tiny">
                      {formatEther(allowanceOfERC20)} {symboleOfERC20}
                    </p>
                    <div className="flex flex-row">
                      <Input
                        type="number"
                        id="approvalAmount"
                        size="sm"
                        value={approvalAmount}
                        onChange={(e) => setApprovalAmount(e.target.value)}
                      />
                      <Button
                        color="primary"
                        onClick={() =>
                          handleApproveButtonClick(itemModal, approvalAmount)
                        }
                      >
                        Increase
                      </Button>
                    </div>
                    <p className="text-tiny">price for this ERC20 :</p>
                    <p className="text-tiny">
                      {formatEther(itemModal.listPrice)} {symboleOfERC20}
                    </p>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => handleBuyButtonClick(itemModal)}
                >
                  Buy
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
