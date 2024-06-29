class ItemService {
    constructor(itemRepository, common) {
        this.itemRepository = itemRepository
        this.common = common
    }

    getAll = async () => {
        try {
            const allItems = await this.itemRepository.getAll()
            var items = []
            allItems.forEach(element => {
                const item = this.#filterToFE(element)
                items.push(item)
            });
            return this.common.responseToFE(true, 200, items, null);
        } catch (error) {
            return this.common.responseToFE(false, 502, null, `${error}`);
        }
    }

    add = async (item) => {
        try {
            const newItem = await this.itemRepository.add(item)
            return this.common.responseToFE(true, 200, newItem, null);
        } catch (error) {
            return this.common.responseToFE(false, 502, null, `${error}`);
        }
    }

    getById = async (id) => {
        try {
            const foundItem = await this.itemRepository.getById(id)
            const filterToFE = this.#filterToFE(foundItem)
            return this.common.responseToFE(true, 200, filterToFE, null);
        } catch (error) {
            return this.common.responseToFE(false, 502, null, `${error}`)
        }
    }

    delete = async (id) => {
        try {
            const deleted = await this.itemRepository.delete(id)
            if (deleted) {
                return this.common.responseToFE(true, 204, { deleted: "success" }, null);
            } else {
                return this.common.responseToFE(false, 403, null, "No ID matched")
            }
        } catch (error) {
            return this.common.responseToFE(false, 502, null, `${error}`)
        }
    }

    #filterToFE = (item) => {
        return {
            id: item.item_id,
            name: item.name,
            price: item.price,
            stock: item.stock
        }
    }
}

module.exports = ItemService;