const { Order, Item, User } = require('../../models')

class OrderRepository {
    getAll = async () => {
        return await Order.findAll()
    }

    getByUser = async (user) => {
        const foundOrder = await Order.findAll({
            where: { user_id: user.user_id }
        })
        return foundOrder
    }

    add = async (order) => {
        const newOrder = await Order.create({
            item_id: order.item_id,
            user_id: order.user_id,
            status: order.status
        })
        return newOrder
    }

    getById = async (id) => {
        const foundOrder = await Order.findOne({
            where: { order_id: id },
            include: [
                {
                    model: Item,
                    required: true,
                    as: 'item',
                    attributes: ['name', 'price']
                },
                {
                    model: User,
                    required: true,
                    as: 'user',
                    attributes: ['name', 'email']
                }
            ],
            attributes: ['order_id', 'status']
        })
        return foundOrder
    }

    getByUserId = async (id) => {
        const foundOrder = await Order.findAll({
            where: { user_id: id },
            include: [
                {
                    model: Item,
                    required: true,
                    as: 'item',
                    attributes: ['name', 'price']
                },
                {
                    model: User,
                    required: true,
                    as: 'user',
                    attributes: ['name', 'email']
                }
            ],
            attributes: ['order_id', 'status']
        })
        return foundOrder
    }

    delete = async (id) => {
        const deleted = await Order.destroy({ 
            where: { order_id: id }
        });
        return deleted ? true : false
    }

    updateStatus = async (order, status) => {
        order.status = status
        await order.save()
    }
}

module.exports = OrderRepository;