import { readContracts } from '@wagmi/core'
import { marketContract, myERC20ABI } from '@/utils/contracts/setupContracts'

export async function fetchItemsIndex() {
  const data = await readContracts({
    contracts: [
      // @ts-ignore
      {
        ...marketContract,
        functionName: 'getMarketplaceItemIds',
      },
    ],
  })
  return data
}

export async function fetchItem(index: number) {
  const data = await readContracts({
    contracts: [
      // @ts-ignore
      {
        ...marketContract,
        functionName: 'getMarketItem',
        args: [index],
      },
    ],
  })
  return data
}

export async function fetchItems() {
  const itemsIndex = await fetchItemsIndex()
  const indexes: any = itemsIndex[0].result
  let items = []
  for (var val of indexes) {
    let index = Number(val)
    let result = await fetchItem(index)
    items.push(result[0].result)
  }
  return items
}

export async function fetchAllowanceERC20(
  address: any,
  marketplaceAddress: any,
  erc20Address: any
) {
  const data = await readContracts({
    contracts: [
      {
        // @ts-ignore
        abi: myERC20ABI,
        address: erc20Address,
        functionName: 'allowance',
        args: [address, marketplaceAddress],
      },
    ],
  })
  return data[0].result
}

export async function fetchSymbolERC20(erc20Address: any): Promise<string> {
  try {
    const data = await readContracts({
      contracts: [
        {
          // @ts-ignore
          abi: myERC20ABI,
          address: erc20Address,
          functionName: 'symbol',
        },
      ],
    })
    return (data[0]?.result as string) || ''
  } catch (error) {
    console.error('Error fetching ERC20 symbol:', error)
    return ''
  }
}
