'use client'

import { addressNul } from '@/utils/contracts/constants'
import { fetchItems } from '@/utils/contracts/fetchContracts'
import {
  Card,
  CardFooter,
  Spinner,
  Image,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Skeleton,
} from '@nextui-org/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { useEffect, useState } from 'react'
import { formatEther } from 'viem'
import { useAccount, useNetwork } from 'wagmi'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Home() {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const [itemsSoldListing, setItemsSoldListing] = useState<any[]>([])
  const [itemModal, setItemModal] = useState<any>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const images = [
    { src: '/slides/2.jpg', alt: 'Second' },
    { src: '/slides/3.png', alt: 'Third' },
    { src: '/slides/1.png', alt: 'First' },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsFetch = await fetchItems()
        fetchSoldListing(itemsFetch)
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    }

    async function fetchSoldListing(items: any[]) {
      let itemsList = []
      for (var val of items) {
        if (val.owner != addressNul) {
          setItemModal(val[-1])
          itemsList.push(val)
        } else {
        }
      }
      console.log(itemsList)
      let lastItems = itemsList.slice(-4)
      setItemsSoldListing(lastItems)
    }

    if (chain && chain.id == 123456) {
      fetchData()
    } else {
      setItemsSoldListing([])
    }
  }, [isConnected, chain])

  const handleOpen = (item: any) => {
    console.log(item)
    setItemModal(item)
    onOpen()
  }

  return (
    <>
      <main className="pt-6 flex flex-col items-center h-screen space-y-6">
        <div className="flex flex-col h-11/12 w-11/12">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="h-96 w-full rounded-lg"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="flex h-96 w-full items-center justify-center">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    className="block h-full w-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex flex-col gap-6 h-11/12 w-11/12">
          <h1 className="text-4xl font-bold text-center">
            sold through our marketplace
          </h1>
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {itemsSoldListing.length === 0 ? (
              <Spinner size="lg" />
            ) : (
              <>
                {itemsSoldListing.map((item, index) => (
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
                ))}
                <Card className="w-[250px] space-y-5 p-4" radius="lg">
                  <Skeleton className="rounded-lg">
                    <div className="h-20 rounded-lg bg-default-300"></div>
                  </Skeleton>
                  <div className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                      <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                      <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                      <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
      {/* Modal */}
      <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>NFT</ModalHeader>
              <ModalBody className="flex flex-col">
                {/* Modal content */}
                <div>
                  <Image
                    alt="Woman listing to music"
                    className="object-cover"
                    height={200}
                    width={200}
                    src={`https://ipfs.io/ipfs/${itemModal.uri.substring(
                      7
                    )}.png`}
                  />
                </div>

                <div>
                  {itemModal.erc20Address == addressNul ? (
                    <>
                      <p className="text-tiny">
                        {formatEther(itemModal.listPrice)}
                      </p>
                      <p className="text-tiny">PG</p>
                    </>
                  ) : (
                    <>
                      <p className="text-tiny">
                        {formatEther(itemModal.listPrice)}
                      </p>
                      <p className="text-tiny">ERC20</p>
                    </>
                  )}
                  <p>smart contract address : {itemModal.nftAddress}</p>
                  <p>seller : {itemModal.seller}</p>
                  <p>buyer : {itemModal.owner}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
