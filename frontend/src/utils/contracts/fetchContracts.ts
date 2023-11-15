
import { readContracts } from "@wagmi/core";
import { marketContract } from "@/utils/contracts/setupContracts";

export async function fetchItemsIndex() {
    const data = await readContracts({
        contracts: [
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