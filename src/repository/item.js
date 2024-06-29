const { Item } = require('../../models');

class ItemRepository {
    getAll = async () => {
        const allItems = await Item.findAll();
        return allItems;
    }

    add = async (item) => {
        const newItem = await Item.create({
            name: item.name,
            price: item.price,
            stock: item.stock
        });
        return newItem;
    }

    getById = async (id) => {
        const foundItem = await Item.findByPk(id);
        return foundItem;
    }

    delete = async (id) => {
        const deleted = await Item.destroy({ 
            where: { item_id: id }
        });
        return deleted ? true : false
    }
}

module.exports = ItemRepository;